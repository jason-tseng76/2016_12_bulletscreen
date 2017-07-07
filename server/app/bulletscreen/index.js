var express = require("express");
var formidable = require("formidable");
var slidemodel = require("./model_slide");
var mongoose = require("mongoose");
var fs = require("fs-extra");
var path = require("path");
var crypto = require('crypto');
var https = require("https");
var multer = require('multer');

var routeName = "/bulletscreen";

module.exports = function(app) {
  var router = express.Router();
  app.use(routeName, router);
  /*app.all("/bulletscreen", function(req, res) {
    res.render("./bulletscreen/index.pug");
  });*/

  //建立新的slide
  router.post("/api/newslide", function(req, res) {
    var email = req.cookies.email;
    var savedata = {
      owner: email
    }
    var newslide = new slidemodel(savedata);
    newslide.save(function(err, data) {
      res.json({status:"OK", data:{_id:newslide._id} });
    });
  });
  router.get('/api/slides', function(req, res) {
    slidemodel
      .find()
      .slice('pages', 1)
      .sort({cdate:-1}).exec(function(err, data) {
        if (err)
          return res.json({ status:"ERROR", message: err });
        res.json({ status:"OK", data:data });
      });
  });
  //取得某個slide
  router.get("/api/slide", function(req, res) {
    var _id = req.query.id;
    if (! _id)
      return res.json({ status:'ERROR', message:'No project' });
    slidemodel.find({_id:_id}).limit(1).exec(function(err, data) {
      if (err)
        return res.json({ status:"ERROR", message: err });
      res.json({ status:"OK", data:data });
    });
    var d = {
      $inc: { pview: 1},
      ldate: Date.now(),
    }
    slidemodel.update({_id}, d).exec();
  });
  //修改slide
  router.post("/api/slide", function(req, res) {
    var _id = req.body.id;
    if (! _id)
      return res.json({ status:'ERROR', message:'No project' });
    slidemodel.find({_id:_id}).exec(function(err, fdata) {
      if (fdata.length == 0)
        return res.json({ status:'ERROR', message:'No project'});
      if (fdata[0].owner !== '' && fdata[0].owner !== undefined && fdata[0].owner != req.cookies.email)
        return res.json({ status:'ERROR', message:'Not allow'});
      var d = {
        _id : _id,
        slidename : req.body.slidename.trim().substr(0, 50),
        pages : JSON.parse(req.body.pages),
        cdate: Date.now(),
      };
      slidemodel.update({_id:_id}, d).exec(function(err, data) {
        if (err)
          return res.json({ status:"ERROR", message: err });
        res.json({ status:"OK", data:data });
      });
    });
  });
  //刪除slide
  router.delete("/api/slide", function(req, res) {
    var _id = req.body.id;
    if (! _id)
      return res.json({ status:'OK' });
    slidemodel.find({_id:_id}).exec(function(err, fdata) {
      if (fdata.length == 0)
        return res.json({ status:'ERROR', message:'No project'});
      if (fdata[0].owner && fdata[0].owner != req.cookies.email)
        return res.json({ status:'ERROR', message:'Not allow'});

      slidemodel.find({_id:_id}).remove().exec(function(err, d) {
        res.json({status:"OK"});
      });
      var dir = path.join('./public/bulletscreen/uploads', _id);
      fs.remove(dir, function(err) {
        if (err) return console.log(err);
        console.log('已刪除: ' + _id);
      });
    });
  });

  // gm convert -density 200 2017_03_21.pdf -resize 1440x1080 -quality 100 +adjoin f-%02d.jpg
  router.get('/api/gm', function(req, res) {
    /*require('gm')('2017_03_21.pdf')
      .density(300, 300)
      .resize(1440, 1080)
      .quality(100)
      .out('+adjoin')
      .write('f%02d.jpg', function(err) {
        if (err) console.log(err);
        res.send("done");
      });*/
    var rcwd = "public/bulletscreen/uploads";
    var cmd = "gm convert -density 200 2017_03_28.pdf -resize 1440x1080 -quality 100 +adjoin f-%03d.jpg";
    var cmds = cmd.split(" ");
    var cmd0 = cmds[0];
    cmds.splice(0,1);
    var spawn = require("child_process").spawn;
    var exec = spawn(cmd0, cmds, {cwd:rcwd, shell:true});
    exec.stdout.on('data', function(data) {
      console.log('stdout:' + data);
    });
    exec.stdout.on('stderr', function(data) {
      console.log('stderr:' + data);
    });
    exec.stdout.on('close', function(code) {
      console.log('close:' + code);
      res.send(code);
    });
    return;
    var exec = require("child_process").exec;
    var exc = exec(cmd, {cwd:"public/bulletscreen/uploads", shell:true,timeout: 1000*60}, function(error, stdout, stderr) {
      var out = stdout;
      console.log("executing : " + cmd);
      if (stderr)
        out += stderr;
      console.log(out);
      res.send(out);
    });
      /*.adjoin('f%02d.jpg', function(err) {
        if (err) console.log(err);
        res.send("done");
      });*/
  });

  //登入認證
  router.get("/api/auth", function(req, res) {
    var token = req.query.t;
    getWhoFromGoogle(token, function(d) {
      if (d.status != 'OK')
        return re.json(d);
      var _data = d.data;
      var au = crypto.createHash('md5').update(_data.email+"_bscreen").digest('hex');
      res.cookie("au", au, {signed: true});
      res.cookie("token", token, {signed: true});
      res.cookie("email", _data.email);
      res.cookie("nname", _data.email.split("@")[0]);
      //_obj = {'status':'OK', 'name':_data.email.split("@")[0]};
      res.json(d);
    });
  });
  //登出
  router.all("/api/signout", function(req, res) {
    res.cookie("token", "", {signed: true});
    res.cookie("au", "", {signed: true});
    res.cookie("email", "");

    res.json({status:"OK"});
  });

  //從Google透過token確定使用者資訊
  router.get("/api/who", function(req, res) {
    //req.cookies.token
    var token = req.signedCookies.token;
    getWhoFromGoogle(token, function(d) {
      res.json(d);
    });
  });
  //取得自己的slide列表
  router.get("/api/my", function(req, res) {
    if ( !checkSignIn(req) ) {
      res.cookie("token", "", {signed: true});
      res.cookie("au", "", {signed: true});
      res.cookie("email", "");
      res.json({status:"ERROR", message:"Not login"});
      return;
    }
    var email = req.cookies.email;
    slidemodel.find({owner: email}).exec(function(err, d) {
      if (err) res.json({status:'ERROR', message:err});
      res.json({status:'OK', data:d});
    });
  });

  /*
  app.all("/bulletscreen/:id", function(req, res) {
    var _id = req.params.id;
    if (! isObjectId(_id) ) {
      res.redirect("/bulletscreen");
      return;
    }
    slidemodel.findOne({_id, _id}, "_id", function(err, data) {
      if (data.length > 0)
        res.render("./bulletscreen/index.pug");
      else
        res.redirect("/bulletscreen");
    });
  });
  */

  router.get("/client/:id", function(req, res) {
    var _id = req.params.id;
    if (! isObjectId(_id) ) {
      res.send("Error");
      return;
    }
    slidemodel.find({_id, _id}, "_id, slidename", function(err, data) {
      if (data.length > 0)
        res.render("./bulletscreen/client.pug", {title: data[0].slidename});
      else
        res.send("Error");
    });
  });

  var uploadErrorHandler = function(err, req, res, next) {
    if(err) {
      console.log(err.stack);
      var errMessage = '';
      if (err.stack.indexOf('File too large') > 0) errMessage = 'File too large';
      if (err.stack.indexOf('Wrong file type') > 0) errMessage = 'Wrong file type';
      console.log('errMessage=');
      console.log(errMessage);
      return res.json({ status:'ERROR', message:errMessage});
    }
    next();
  };
  var uploadSinglePhoto = multer({
    dest:'./public/bulletscreen/uploads',
    limits: { fileSize: 30*1024*1024 },
    fileFilter: function(req, file, cb) {
      var filetypes = /jpeg|jpg|png|pdf/;
      var mimetype = filetypes.test(file.mimetype);
      if (mimetype) return cb(null, true);
      cb(new Error('Wrong file type'));
    },
    rename: function(fieldname, filename) {
      return (Date.now()%100000)+'-'+Math.round(Math.random()*100000)
    },
  });
  router.post('/api/upload', uploadSinglePhoto.single('file'), function(req, res, next) {
    var file = req.file;
    var ext = '';
    var _id = req.body.id;
    if (file.mimetype === 'image/png')
      ext = 'png';
    if (file.mimetype === 'image/jpeg')
      ext = 'jpg';
    if (file.mimetype.indexOf('pdf') > 0)
      ext = 'pdf';
    var hash = (Date.now()%100000)+'-'+Math.round(Math.random()*100000);
    var iddir = path.join(file.destination,_id);
    fs.ensureDirSync(iddir);
    if (ext === 'pdf') {
      var tempDir = path.join(iddir,hash);
      fs.ensureDirSync(tempDir);
      require('gm')(file.path)
        .density(200, 200)
        .resize(1440, 1080)
        .quality(100)
        .out('+adjoin')
        .write(tempDir+'/'+hash+'_%03d.jpg', function(err) {
          if (err) return next(err);
          fs.remove(file.path);
          fs.readdir(tempDir, function(err, dfs) {
            var ofs = [];
            dfs.forEach(function(itm) {
              ofs.push({
                name:itm,
                size:0,
                new_name:itm,
                path:'/bulletscreen/uploads/'+_id
              });
            });
            fs.move(tempDir, iddir, function(err) {
              if (err) return next(err);
              res.json(ofs);
            });
          });
        });
    }
    if (ext === 'png' || ext === 'jpg') {
      var dest = path.join(iddir,hash+'.'+ext);
      fs.move(file.path, dest, function(err) {
        if (err) return next(err);
        res.json([{
          name:file.originalname,
          size:file.size,
          new_name:hash+'.'+ext,
          path:'/bulletscreen/uploads/'+_id
        }]);
      });
    }
  });
  router.use('/api/upload', uploadErrorHandler);
  
  /*router.post("/api/upload", function(req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    var uploadDir = './public/bulletscreen/uploads';
    fs.ensureDirSync(uploadDir);
    form.uploadDir = uploadDir;
    var sid = "";
    var ufiles = [];
    form.on("field", function(name, value) {
      if (name === "id")
        sid = value;
    });
    form.on("end", function() {
      var data = [];
      for (var i =0;i < ufiles.length; i++) {
        data.push({
          'name':ufiles[i].name,
          'size':ufiles[i].size,
          'new_name':ufiles[i].new_name,
          'path':ufiles[i].path
        });
      }
      res.send(JSON.stringify(data));
    });
    form.parse(req, function(err, fields, files) {
    });
    form.on('file', function(name, file) {
      console.log(file.type);
      //rename the incoming file to the file's name
      var _extArry = file.name.split(".");
      var _extName = _extArry[_extArry.length-1];
      if (file.type === 'image/png')
        _extName = 'png';
      if (file.type === 'image/jpeg')
        _extName = 'jpg';
      var _newhash = (Date.now()%100000)+'-'+Math.round(Math.random()*100000);
      var _newname = _newhash+'.'+_extName;
      file._newname = _newname;
      if (file.type.indexOf('pdf') > 0) {
        require('gm')(file.path)
          .density(300, 300)
          .resize(1440, 1080)
          .quality(100)
          .out('+adjoin')
          .write(form.uploadDir + "/" + sid + "/" + _newhash+'_%02d.jpg', function(err) {
            if (err) console.log(err);
            res.send("done");
          });
      } else {
        var _path = (form.uploadDir + "/" + sid).replace("./public/","/");
        file._path = _path;
        ufiles.push({
          'name':file.name,
          'size':file.size,
          'new_name':_newname,
          'path':_path
        });
        fs.move(file.path, form.uploadDir + "/" + sid + "/" + _newname, function(err) {
          if (err) console.log(err);
        });
      }
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
      //console.log(bytesReceived, bytesExpected);
    });
    form.on('error', function(err) {
      console.log('ERROR uploading the file:');
      console.log(err);
    });
  });*/

  router.post("/api/uploa64", function(req, res) {
      var base64data = req.body.file.replace(/^data:image\/png;base64,/, "");
      var id = req.body.id;
      var uploadDir = './public/bulletscreen/uploads/'+id;
      var newname = (Date.now()%100000)+'-'+Math.round(Math.random()*100000)+'.png';
      var npath = path.join(uploadDir, newname);
      fs.writeFile(npath, base64data, 'base64', function(err) {
        var d = {
          name: 'base64',
          size: 0,
          new_name: newname,
          path: uploadDir.replace('./public/','/')
        }
        res.send(JSON.stringify(data));
      });
  });

  router.all("/*", function(req, res) {
    //req.signedCookies.token
    //res.sendFile( path.join(global.appRoot, "public/bulletscreen/main.html") );
    res.render("./bulletscreen/main.pug");
  });
}

function getWhoFromGoogle(token, callback) {
  var options = {
    host: 'www.googleapis.com',
    path: '/oauth2/v3/tokeninfo?id_token='+token,
    method: 'GET'
  };
  https.request(options, function(response) {
    var str = '';
    response.on('data', function (chunk) {
      console.log(str);
      str += chunk;
    });
    response.on('end', function () {
      var _obj = {'status':'ERROR', 'message':'Invalid token'};
      var _data = {};
      try {
        _data = JSON.parse(str);
      } catch(e) {
        console.log(e);
        callback(_obj);
      }
      if (_data.email) {
        callback({ status:'OK', data: {
          email: _data.email
        } });
      }
    });
  }).end();
}
function isSignInMiddle(req, res, next) {
  if (checkSignIn(req))
    return next();
  res.cookie("f", req.url);
  res.redirect(routeName);
}
function isObjectId(n) {
  return mongoose.Types.ObjectId.isValid(n);
}
function checkSignIn(req) {
  var email = req.cookies.email;
  var au = req.signedCookies.au;
  var au2 = crypto.createHash('md5').update(email+"_bscreen").digest('hex');
  if (au == au2) return true;
  return false;
}
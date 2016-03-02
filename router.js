'use strict';

const Router = require('koa-router');
const controllers = require('./controllers');
const proxy = require('./middlewares/proxy');
const qiniu = require('qiniu');
const config = require('./config');

let router = new Router();
router.get('/', function* () {
  //var user = this.session.user;
  //if (user && user.username) {
    yield this.render('index');
  //} else {
  //  this.redirect('/login');
  //}
});

router.get('/login', function* () {
  yield this.render('login');
});

//router.post('/login/auth', function* () {
//  let result = yield controllers.useContoller.auth;
//  if (result.result === 'success') {
//    this.session.user = {
//      username: 'helloWorld'
//    };
//    this.redirect('/');
//  } else {
//    yield this.render('login');
//  }
//});

let authRouter = new Router({prefix: '/api'});

//// session控制
//authRouter.use(function* (next) {
//  var user = this.session.user;
//  if (user && user.username) {
//    yield next;
//  } else {
//    let err = new Error('no login!');
//    err.status = 403;
//    throw err;
//  }
//});

authRouter.post('/users', proxy);

// 七牛上传资源获取token
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;
let uptoken = new qiniu.rs.PutPolicy(config.qiniu.Bucket_Name);
authRouter.get('/qiniu/uptoken', function* () {
  var token = uptoken.token();
  this.body = {uptoken: token};
});

exports.router = router;
exports.authRouter = authRouter;
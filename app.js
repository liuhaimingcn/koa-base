'use strict';

const path = require('path');
const app = require('koa')();
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const staticServer = require('koa-static');
const views = require('koa-views');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const config = require('./config');
const logger = require('./middlewares/logger');
const routers = require('./router');
const errorhandler = require('./middlewares/errorhandler');

app.use(errorhandler());
app.use(logger);
app.use(bodyParser());
app.use(mount('/public', staticServer(path.join(__dirname, 'public'), {maxage: config.staticServerMaxAge})));
app.use(views('views', {default: 'ejs'}));

//app.keys = ['keys', config.sessionSecret];
//app.use(session({
//  store: redisStore({})
//}));

app.use(routers.router.routes());
app.use(routers.authRouter.routes());

app.listen(config.port);
console.log("listening on port %d in %s mode", config.port, config.isProduction ? 'production' : 'debug');

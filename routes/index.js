var express = require('express');
var router = express.Router();
// import member from './member'
import users from './users'

/* GET home page. */

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
module.exports = app =>{
  app.use('/', router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  }));
  // app.use('/user', router.get('/', function(req, res, next) {
  //   res.render('index', { title: 'Express' });
  // }));
  // app.use('/member', member)
  app.use('/users', users)
}

'use strict';

// import BaseComponent from '../../prototype/baseComponent'
import { Decrypt } from '../config/aes'
import Users from '../models/users'

import jwt from 'jsonwebtoken';
import formidable from 'formidable'

const secretTokenKey = 'nmm'

export const getUsers = async (req, res) => {
  const form = new formidable.IncomingForm()
  await form.parse(req, async (err, fileds) => {
    if (!fileds.name || !fileds.pwd) {
      res.json({success: false, message: '请输入您的账号密码.'})
    } else {
      const name = Decrypt(fileds.name)
      const pwd = Decrypt(fileds.pwd)
      await Users.findOne({name, pwd}, (err, result) => {
        if (!result) {
          return res.json({success: false, message: '用户名或密码错误'})
        } else {
          // 加密id、name生成token并存入cookie
          const expires = 60 * 60 * 24 * 7
          const token = jwt.sign({_id: result._id, name}, secretTokenKey, { expiresIn: expires })
          res.cookie('token', token, { maxAge: expires })
          return res.json({
            code: '200',
            message: '登陆成功',
            token
          })
        }
      })
    }
  })

}

export const addUsers = (req, res, next) => {
  // const user_id = req.params.user_id;
  const form = new formidable.IncomingForm()
  form.parse(req,async (err, fields, files) => {
    const name = Decrypt(fields.name)
    const pwd = Decrypt(fields.pwd)
    if(!name || !pwd || name.length < 4 || pwd.length < 7){
      res.status(400)
      res.json({
        success: false,
        message: '用户名或者密码长度不足'
      })
      return 
    } else {
      Users.findOne({name}, (err, result) => {
        if (result) {
          res.json({success: false, message: '该用户已存在！'})
        } else {
          const newUser = new Users({name, pwd})
          newUser.save()
          newUser.findOne({name}, (err, result) => {
            if (err) {
              res.json({succcess: false, message: '储存失败'})
            } else {
              const expires = 60 * 60 * 24 * 7
              const token = jwt.sign({_id: result._id, name}, secretTokenKey, { expiresIn: expires })
              res.cookie('token', token, { maxAge: expires })
              res.json({success: true,message: '注册成功!'})
            }
          })
        }
      })
    }
  })
}
export const  updateUsers = ( req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req,async (err, fields, files) => {
      const {type,name,pwd} = fields
      console.log(name,7,pwd,9,req.body)
      if (!name||!pwd||!type) {
        res.status(400)
        res.send({
          type: 'ERROR_USER',
          message: '参数错误'
        })
        return 
      }
      if(name.length<3||pwd.length<6){
        res.status(400)
        res.send({
          type: 'ERROR_USER',
          message: '错误'
        })
        return 
      }
    })
}

// class UsersContro {
// 	constructor(){
// 		// super()
// 		// this.users = this.users.bind(this);

// 	}
// 	async getUsers(req, res, next){
// 		try{
// 			const userList = await Users.find( {},{_id:0} );
// 			res.send(userList)
// 		}catch(err){
//       // console.log('获取收获地址失败', err);
//       res.status(400)
// 			res.send({
// 				type: 'ERROR_GET_ADDRESS',
// 				message: '获取列表失败'
// 			})
// 		}
//   }

// }

// export default new UsersContro()
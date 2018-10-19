'use strict';

// import BaseComponent from '../../prototype/baseComponent'
import Users from '../models/users'
import formidable from 'formidable'

class UsersContro {
	constructor(){
		// super()
		// this.users = this.users.bind(this);

	}
	async getUsers(req, res, next){
		// const user_id = req.params.user_id;
		// if (!user_id || !Number(user_id)) {
		// 	res.send({
		// 		type: 'ERROR_USER_ID',
		// 		message: 'user_id参数错误',
		// 	})
		// 	return 
		// }
		try{
			const userList = await Users.find( {},{_id:0} );
			res.send(userList)
		}catch(err){
      // console.log('获取收获地址失败', err);
      res.status(400)
			res.send({
				type: 'ERROR_GET_ADDRESS',
				message: '获取列表失败'
			})
		}
  }
  async addUsers(req, res, next){
    // const user_id = req.params.user_id;
    const form = new formidable.IncomingForm()
    form.parse(req,async (err, fields, files) => {
      const {name,pwd} = fields
      console.log(name,7,pwd,9,req.body)
      if (!name||!pwd) {
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
          message: '用户名或者密码长度不足'
        })
        return 
      }
      try {
        const isname=await Users.find({name:fields.name})
        if(isname.length>0){
          res.status(400)
          res.send({result:-1,message:'该用户已存在'})
          return
        }
        const newUser = new Users(fields)
        await newUser.save()
        res.send({result:1,message:'添加成功'})
      }catch(e){
        res.status(500)
        res.send({result:-1})
      }
    })
  }
  async changeUsers(req, res){
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
        // try {
        //   const isname=await Users.find({name:fields.name})
        //   if(isname.length>0){
        //     if(fields.type==='add'){
        //       const newUser = new Users(fields)
        //       await newUser.save()
        //     }
        //     res.status(400)
        //     res.send({result:-1,message:'该用户已存在'})
        //     return
        //   }

        //   res.send({result:1,message:'添加成功'})
        // }catch(e){
        //   res.status(500)
        //   res.send({result:-1})
        // }
      })
  }
	// async getAddAddressById(req, res, next){
	// 	const address_id = req.params.address_id;
	// 	if (!address_id || !Number(address_id)) {
	// 		res.send({
	// 			type: 'ERROR_PARAMS',
	// 			message: '参数错误',
	// 		})
	// 		return 
	// 	}
	// 	try{
	// 		const address = await AddressModel.findOne({id: address_id});
	// 		res.send(address)
	// 	}catch(err){
	// 		console.log('获取地址信息失败', err);
	// 		res.send({
	// 			type: 'ERROR_GET_ADDRESS',
	// 			message: '获取地址信息失败'
	// 		})
	// 	}
	// }
}

export default new UsersContro()
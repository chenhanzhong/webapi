'use strict';

// import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'
import jwt from 'jsonwebtoken';
import Auth from '../models/auth'
import { Decrypt } from '../config/aes'

const secretTokenKey = 'nmm'

export const getAuth = async (req, res) => {
  const form = new formidable.IncomingForm()
  await form.parse(req, async (err, fileds) => {
    const token = fileds.token || req.headers['x-access-token']
    if (!token) {
      res.json({success: false, message: '没有提供token'})
    } else {
      jwt.verify(token, secretTokenKey, (err, decoded) => {
        if (err) {
          res.json({success: false, message: 'token信息错误'})
        } else {
          const _id = decoded._id
          Auth.findOne({_id}).exec((err, data) => {
            if (err) {
              res.json({success: false, message: '用户未找到'})
            } else {
              // console.log(data, 999)
              res.json({success: true, data: data || {}})
            }
          })
        }
      })
    }
  })

}
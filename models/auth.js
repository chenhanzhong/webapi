'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;
// 在mongoose里一切都由schema开始。每一个schema对应一个mongoDB collection 并且在那个collection里面定义了documents的模型。


const auth = new Schema({
  name: String,
  adress: String,
  avatar: String,
  birthday: String,
  position: String,
  hobby: String,
  description: String,
  hobby: String,
})

auth.index({id: 2})

const Auth = mongoose.model('auth', auth);

export default Auth
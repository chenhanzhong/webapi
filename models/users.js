'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;
// 在mongoose里一切都由schema开始。每一个schema对应一个mongoDB collection 并且在那个collection里面定义了documents的模型。

const users = new Schema({
  id: Number,
  name: String,
  pwd: String
})

users.index({id: 1});   //创建索引

const Users = mongoose.model('users', users);

export default Users
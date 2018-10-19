'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const usersSChema = new Schema({
	id: Number,
  name: String,
  pwd: String
})

usersSChema.index({id: 1});

const Users = mongoose.model('users', usersSChema);

export default Users
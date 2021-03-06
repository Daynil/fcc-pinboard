import mongoose = require('mongoose');
import { User as UserModel } from '../../src/app/shared/user.model';

export interface IUserDoc extends mongoose.Document, UserModel {}

let userSchema = new mongoose.Schema({
  twitterID: String,
  username: String
});

export let User = mongoose.model<IUserDoc>('User', userSchema);
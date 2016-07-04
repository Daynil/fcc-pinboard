import mongoose = require('mongoose');
import { User as UserModel } from '../../src/app/shared/user.model';

export interface IUserModel extends mongoose.Document, UserModel {}

let userSchema = new mongoose.Schema({
  twitterID: String
});

export let User = mongoose.model<IUserModel>('User', userSchema);
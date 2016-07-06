import mongoose = require('mongoose');
import { Pin as PinModel } from '../../src/app/shared/pin.model';

export interface IPinDoc extends mongoose.Document, PinModel {}

let pinSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  likes: [String],
  owner: String
});

export let Pin = mongoose.model<IPinDoc>('Pin', pinSchema);
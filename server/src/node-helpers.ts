import express = require('express');
import mongoose = require('mongoose');
import _ = require('lodash');

/** Send an error status with a message and the error details */
export function logError(res: express.Response, message: string, err: any) {
  res.status(500).json({
    message: message,
    stringyErr: err.toString(),
    fullErr: err
  });
}

/** Format mongo document to a regular object */
export function mongoToObj(dbDoc: mongoose.Document) {
  let formattedObj = _.omit(dbDoc.toObject(), ['_id', '__v']);
  return formattedObj;
}
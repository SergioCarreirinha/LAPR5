import mongoose = require('mongoose');
import data from '../config/';

export default async (): Promise<any> => {
  const connection = await mongoose.connect(data.databaseURL, {useNewUrlParser: true });
  return connection.connection.db;
}
import * as mongoose from 'mongoose'
import data from '../config/index.js';

export default async (): Promise<any> => {
  const connection = await mongoose.connect(data.databaseURL, {useNewUrlParser: true });
  return connection.connection.db;
}
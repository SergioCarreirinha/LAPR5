import * as mongoose from 'mongoose'
import databaseURL from '../config/index.js';


  export default async (): Promise<any> => {
    console.log(databaseURL);
    const connection = await mongoose.connect('mongodb+srv://testUser:test123@cgroup25.ngqyx.mongodb.net/My_database?retryWrites=true&w=majority', {useNewUrlParser: true });
    return connection.connection.db;
  }
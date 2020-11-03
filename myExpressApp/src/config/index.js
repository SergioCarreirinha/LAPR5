import * as dotenv from 'dotenv';
  
/*const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
*/


  export default{
     port: process.env.PORT,

     databaseURL: process.env.DATABASE_URL,
  }
  console.log(process.env.DATABASE_URL);
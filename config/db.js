import { connect } from "mongoose";

export async function connectDB() {
  try {
    await connect('mongodb://127.0.0.1:27017/nodejs')
    console.log('Connect successfully!');
  }
  catch(err) {
    console.log('Connection failed!!!!');
  }
}
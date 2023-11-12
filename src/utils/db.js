import { connect } from "mongoose";

export async function connectDB() {
  try {
    await connect(
      "mongodb+srv://longdvph29867:longlong@cluster0.8rgprch.mongodb.net/nodejs"
    );
    console.log("Connect successfully!");
  } catch (err) {
    console.log("Connection failed!!!!");
  }
}

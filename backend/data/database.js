import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect(process.env.DB).then(() => {
        console.log("mongodb connected");
    }).catch((e) => console.log("not connected"))
}

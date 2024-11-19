import { default as credentails } from "./dbCredentails.mjs"
import { default as mongoose } from "mongoose"
mongoose.connect(credentails.connection_string);


const LogInSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})


const collection = new mongoose.model("LogInCollection", LogInSchema)


export default collection;

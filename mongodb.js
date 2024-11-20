import { default as credentails } from "./dbCredentails.mjs"
import { default as mongoose } from "mongoose"
mongoose.connect(credentails.connection_string);


const account = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})


const collection = new mongoose.model("LogInCollection", account)


export default collection;

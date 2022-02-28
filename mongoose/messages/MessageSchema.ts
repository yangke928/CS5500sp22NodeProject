import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";
import User from "../../models/users/User";

const MessageSchema = new mongoose.Schema<Message> ({
    message: String,
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: Date,
}, {collection: "messages"});
export default  MessageSchema;

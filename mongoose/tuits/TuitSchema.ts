/**
 * @file Implements mongoose schema for tuits
 */

import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents the tuit object
 * @property {string} tuit The content of the tuit
 * @property {ObjectId} postedBy The user that posted the tuit
 * @property {date} postedOn The date the tuit is posted
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: "tuits"});
export default TuitSchema;

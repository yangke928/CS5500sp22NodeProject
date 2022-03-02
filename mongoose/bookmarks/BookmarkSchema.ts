/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark A user bookmarks a tuit
 * @property {ObjectId} bookmarkedTuit The tuit bookmarked by user
 * @property {ObjectId} bookmarkedBy The user
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"} );
export default  BookmarkSchema

/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents likes relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {bookmarkedTuit} bookmarkedTuit Tuit being bookmarked
 * @property {bookmarkedBy} bookmarkedBy User bookmarking the tuit
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};

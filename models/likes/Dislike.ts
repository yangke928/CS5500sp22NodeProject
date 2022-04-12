/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef DisLike Represents dislikes relationship between a user and a tuit,
 * as in a user Dislikes a tuit
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} dislikedBy User disliking the tuit
 */

export default interface Dislike {
    tuit: Tuit,
    dislikedBy: User
};

/**
 * @file Declares follows data type representing relationship between
 * users, as in user follows anther user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and another user,
 * as in a user likes a tuit
 * @property {userFollowed} userFollowed User being followed
 * @property {userFollowing} userFollowing User following the other user
 */

export default interface Follow {
    userFollowed: User
    userFollowing: User
};

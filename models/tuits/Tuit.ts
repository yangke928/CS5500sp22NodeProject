/**
 * @file Declares Message data type representing relationship a tuit
 */

/**
 * @typedef Message Represents a tuit that posted by a user
 * @property {string} tuit the context of the tuit
 * @property {User} to User post the tuit
 * @property {Date} postedOn The date user post the tuit
 */

import User from "../users/User";
export default interface Tuit {
    tuit: string,
    postedBy: User
    postedOn?: Date,
};

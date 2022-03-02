/**
 * @file Declares Message data type representing relationship between
 * users and messages, as an user send message to another user
 */

import User from "../users/User";

/**
 * @typedef Message Represents messages relationship between a user and another user,
 * as in a user send message to another user
 * @property {string} message the context of the message
 * @property {User} to User sending the message
 * @property {User} from User receiving the message
 * @property {Date} sentOn The date user sending the message
 */

export default  interface Message {
    message: string;
    to: User;
    from: User;
    sentOn?: Date
};

/**
 * @file Implements DAO managing data storage of messages.
 * Uses mongoose BookmarkModel to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage of Messages
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao
    }
    private constructor() {}
    /**
     * Removes all the messages with same to user instance from the database
     * @param {string} uid User's ID, primary key
     * @returns Promise To be notified when these messages are removed from the database
     */
    deleteAllMessageReceived = async (uid: string): Promise<any> =>
       MessageModel
           .deleteMany({to: uid});
    /**
     * Removes all the messages with same from user instance from the database
     * @param {string} uid User's ID, primary key
     * @returns Promise To be notified when these messages are removed from the database
     */
    deleteAllMessageSend = async (uid: string): Promise<any> =>
        MessageModel
            .deleteMany({from:uid});
    /**
     * Removes one messages instance from the database
     * @param {string} mid Messages's ID, primary key
     * @returns Promise To be notified when that message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel
            .deleteOne({_id:mid});
    /**
     * Uses BookmarkModel to retrieve all messages with the same to user from messages collection
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when the messages are retrieved from database
     */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to:uid})
            .populate("from")
            .exec();
    /**
     * Uses BookmarkModel to retrieve all messages with the same from user from messages collection
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when the messages are retrieved from database
     */
    findAllMessagesSend = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from:uid})
            .populate("to")
            .exec();
    /**
     * Inserts message instance into the database
     * @param {string} uidSend The ID of the user who send the message,primary key
     * @param {string} uidReceived The ID of the user who receive the message,primary key
     * @param {Message} message The message that one user send to another user
     * @returns Promise To be notified when the new message is inserted into the database
     */
    userSendMessageToAnotherUser =  async (uidSend: string, uidReceived: string, message: Message): Promise<Message> =>
        MessageModel
            .create({...message, to:uidReceived, from:uidSend});

}

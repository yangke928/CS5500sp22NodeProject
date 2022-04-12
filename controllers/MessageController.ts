/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:send_uid/messages/:received_uid to record that a user send message to anther user
 *     </li>
 *     <li>GET /api/users/:uid/messages_received to retrieve all the messages received by a user
 *     </li>
 *     <li>GET /api/users/:uid/messages_send to retrieve all messages that a user send
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that a user remove a message
 *     </li>
 *     <li>DELETE /api/users/:uid/messages_received to record that a user remove all messages received
 *     </li>
 *     <li>DELETE /api/users/:uid/messages_send to record that a user remove all messages send
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:send_uid/messages/:received_uid",MessageController.messageController.userSendMessageToAnotherUser);
            app.get("/api/users/:uid/messages_received",MessageController.messageController.findAllMessagesReceived);
            app.get("/api/users/:uid/messages_send",MessageController.messageController.findAllMessagesSend);
            app.delete("/api/messages/:mid",MessageController.messageController.deleteMessage);
            app.delete("/api/users/:uid/messages_received", MessageController.messageController.deleteAllMessageReceived);
            app.delete("/api/users/:uid/messages_send",MessageController.messageController.deleteAllMessageSend)
        }
        return MessageController.messageController
    }

    private constructor() {}
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user removes
     * all the messages the user used to receive
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the messages received by a user was successful or not
     */
    deleteAllMessageReceived = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessageReceived(req.params.uid)
            .then(status => res.send(status));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user removes
     * all the messages the user used to send
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the messages send by a user was successful or not
     */
    deleteAllMessageSend = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessageSend(req.params.uid)
            .then(status => res.send(status));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the user removes a message
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Retrieves all messages that a user received from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who received all messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages that a user send from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who send all messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSend = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSend(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters send_uid, received_uid and message, representing
     * the user who sent the message, the user who received the message and the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userSendMessageToAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userSendMessageToAnotherUser(req.params.send_uid, req.params.received_uid, req.body)
            .then(messages => res.json(messages));
};

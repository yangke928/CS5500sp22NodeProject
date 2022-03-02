/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import messageModel from "../mongoose/messages/MessageModel";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:send_uid/messages/:received_uid",MessageController.messageController.userSendMessageToAnotherUser);
            app.get("/api/users/:uid/messages_received",MessageController.messageController.findAllMessagesReceived);
            app.get("/api/users/:uid/messages_send",MessageController.messageController.findAllMessagesSend);
            app.delete("/api/messages/mid",MessageController.messageController.deleteMessage);
            app.delete("/api/users/:uid/messages_received", MessageController.messageController.deleteAllMessageReceived);
            app.delete("/api/users/:uid/messages_send",MessageController.messageController.deleteAllMessageSend)
        }
        return MessageController.messageController
    }

    private constructor() {}

    deleteAllMessageReceived = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessageReceived(req.params.uid)
            .then(status => res.send(status));

    deleteAllMessageSend = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessageSend(req.params.uid)
            .then(status => res.send(status));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));

    findAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSend = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessageSend(req.params.uid)
            .then(messages => res.json(messages));

    userSendMessageToAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userSendMessageToAnotherUser(req.params.send_uid, req.params.received_uid, req.body)
            .then(messages => res.json(messages));
};

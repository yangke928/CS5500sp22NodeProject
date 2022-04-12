/**
 * @file Declares controller RESTful API for Messages resource
 */

import {Request, Response} from "express";

export default interface MessageControllerI{
    userSendMessageToAnotherUser  (req: Request, res: Response): void;
    findAllMessagesSend (req: Request, res: Response): void;
    findAllMessagesReceived  (req: Request, res: Response): void;
    deleteMessage  (req: Request, res: Response): void;
    deleteAllMessageSend (req: Request, res: Response): void;
    deleteAllMessageReceived  (req: Request, res: Response): void;
}

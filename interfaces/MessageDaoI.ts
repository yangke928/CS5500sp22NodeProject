import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default  interface MessageDaoI {
    userSendMessageToAnotherUser (uidSend: string, uidReceived: string, message: Message): Promise <Message>;
    findAllMessagesSend(uid:string): Promise <Message[]>;
    findAllMessagesReceived (uid:string): Promise <Message[]>;
    deleteMessage (mid:string): Promise <any>;
    deleteAllMessageSend(uid:string): Promise<any>;
    deleteAllMessageReceived(uid:string): Promise<any>;
}

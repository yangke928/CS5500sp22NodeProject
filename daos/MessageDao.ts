import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao
    }
    private constructor() {}

    deleteAllMessageReceived = async (uid: string): Promise<any> =>
       MessageModel
           .deleteMany({to: uid});

    deleteAllMessageSend = async (uid: string): Promise<any> =>
        MessageModel
            .deleteMany({from:uid});

    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel
            .deleteOne({_id:mid});

    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to:uid})
            .populate("from")
            .exec();

    findAllMessagesSend = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from:uid})
            .populate("to")
            .exec();

    userSendMessageToAnotherUser =  async (uidSend: string, uidReceived: string, message: Message): Promise<Message> =>
        MessageModel
            .create({...message, to:uidReceived, from:uidSend});

}

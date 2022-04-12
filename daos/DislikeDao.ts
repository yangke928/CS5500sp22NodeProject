/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/likes/Dislike";
import DislikeDaoI from "../interfaces/DislikeDaoI";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @implements {DislikeDaoI} DislikeDaoI
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}
    /**
     * Retrieve all users disliked the tuit from dislikes collection
     * @param {string} tid Tuit's ID, primary key
     * @returns Promise to be notified when the dislikes are retrieved from database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Retrieve all tuits disliked by a user from dislikes collection
     * @param {string} tid User's ID, primary key
     * @returns Promise to be notified when the dislikes are retrieved from database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts dislike instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Remove dislike instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUnDislikeTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Check if the user has already disliked the tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Count how many dislikes this tuit has
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    countHowManyDisikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}

/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage of tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Retrieve all tuits from tuits collection
     * @returns Promise to be notified when all the tuits are retrieved from database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();

    /**
     * Retrieve all tuits posted by a user from tuits collection
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when all the tuits posted by a user are retrieved from database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();
    /**
     * Retrieve one specific tuit from tuits collection
     * @param {string} uid Tuit's ID, primary key
     * @returns Promise to be notified when that tuit is retrieved from database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();
    /**
     * Inserts tuit instance into the database
     * @param {string} uid User's ID, primary key
     * @param {Tuit} tuit the tuit that posted
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});
    /**
     * Updates tuit instance into the database
     * @param {string} uid User's ID, primary key
     * @param {Tuit} tuit the tuit that to be updated
     * @returns Promise To be notified when tuit is updated into the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    /**
     * Removes tuit instance from the database
     * @param {string} uid Tuit's ID, primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}

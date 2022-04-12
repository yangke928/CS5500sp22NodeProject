/**
 * @file Implements DAO managing data storage of bookmarks.
 * Uses mongoose BookmarkModel to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage of Follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} FollowDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private  static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;

    }
    private constructor() {}
    /**
     * Inserts follow instance into the database
     * @param {string} uidfollowing The id of the user who following another user, primary key
     * @param {string} uidfollowing The id of the user who is followed by another user, primary key
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowAnotherUser = async (uidfollowing: string, uidfollowed: string): Promise<Follow> =>
        FollowModel
            .create({userFollowing:uidfollowing, userFollowed: uidfollowed});
    /**
     * Removes follow relationship instance into the database
     * @param {string} uidfollowing The id of the user who unfollowing another user, primary key
     * @param {string} uidfollowing The id of the user who is unfollowed by another user, primary key
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowAnotherUser = async (uidfollowing: string, uidfollowed: string): Promise<any>  =>
        FollowModel
            .deleteOne({userFollowing:uidfollowing, userFollowed: uidfollowed});
    /**
     * Retrieve all users a user following from follows collection
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when all the users followed by the user are retrieved from database
     */
    findAllUsersThatUserFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    /**
     * Retrieve all users a user is followed from follows collection
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when all the users following the user are retrieved from database
     */
    findAllUsersThatUserFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

}

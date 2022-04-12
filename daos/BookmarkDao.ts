/**
 * @file Implements DAO managing data storage of bookmarks.
 * Uses mongoose BookmarkModel to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage of Bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default  class  BookmarkDao implements  BookmarkDaoI {
    private  static  bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static  getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all tuits from bookmarks collection bookmarked by the user
     * @param {string} uid User's ID, primary key
     * @returns Promise to be notified when the bookmarks are retrieved from database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy:uid})
            .populate("bookmarkedBy")
            .exec();
    /**
     * Uses BookmarkModel to retrieve all users from bookmarks collection bookmarked the tuit
     * @param {string} tid Tuit's ID, primary key
     * @returns Promise to be notified when the bookmarks are retrieved from database
     */
    findAllUsersThatBookmarkdTuit = async(tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedTuit")
            .exec();
    /**
     * Inserts bookmark instance into the database
     * @param {string} uid User's ID, primary key
     * @param {string} tid Tuit's ID, primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async(uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel
            .create({bookmarkedTuit: tid, bookmarkedBy:uid});

    /**
     * Removes bookmark instance from the database
     * @param {string} uid User's ID, primary key
     * @param {string} tid Tuit's ID, primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel
            .deleteOne({bookmarkedTuit: tid, bookmarkedBy:uid})
    /**
     * Removes many bookmarks with same bookmarkedBy instance from the database
     * @param {string} uid User's ID, primary key
     * @returns Promise To be notified when these bookmarks are removed from the database
     */
    userUnbookmarksAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel
            .deleteMany({bookmarkedBy: uid})

}

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";


export default  class  BookmarkDao implements  BookmarkDaoI {
    private  static  bookmarkDao: BookmarkDao | null = null;
    public static  getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy:uid})
            .populate("bookmarkedBy")
            .exec();

    findAllUsersThatBookmarkdTuit = async(tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedTuit")
            .exec();

    userBookmarksTuit = async(uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel
            .create({bookmarkedTuit: tid, bookmarkedBy:uid});

    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel
            .deleteOne({bookmarkedTuit: tid, bookmarkedBy:uid})

    userUnbookmarksAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel
            .deleteMany({bookmarkedBy: uid})

}

/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all users that bookmarked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user no longer bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks to record that a user no longer bookmarks all tuits bookmarked before
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static  getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/users/:uid/bookmarks",BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks",BookmarkController.bookmarkController.findAllUsersThatBookmarkdTuit);
            app.post("/api/users/:uid/bookmarks/:tid",BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid",BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userUnbookmarksAllTuits);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all users that Bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatBookmarkdTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkdTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is not bookmarking
     * the tuit and the tuit being not bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is not bookmarking
     * all the tuit the user used to bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the bookmarks by a user was successful or not
     */
    userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then(status => res.send(status));

};

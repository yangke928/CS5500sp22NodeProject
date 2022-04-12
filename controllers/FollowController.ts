/**
 * @file Controller RESTful Web service API for follows resource
 */

import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followed to retrieve all the users that user is followed by
 *     </li>
 *     <li>GET /api/users/:uid/followings to retrieve all users that a user is following
 *     </li>
 *     <li>POST /api/users/:uidfollowing/follows/:uidfollowed to record that a user follows an other user
 *     </li>
 *     <li>DELETE /api/users/:uidfollowing/follows/:uidfollowed to record that a user
 *     no londer follows another user/li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uidfollowing/follows/:uidfollowed",FollowController.followController.userFollowAnotherUser);
            app.delete("/api/users/:uidfollowing/follows/:uidfollowed",FollowController.followController.userUnfollowAnotherUser);
            app.get("/api/users/:uid/followed",FollowController.followController.findAllUsersThatUserFollowed);
            app.get("/api/users/:uid/following",FollowController.followController.findAllUsersThatUserFollowing)
        }
        return FollowController.followController;
    }

    private constructor() {}
    /**
     * Retrieves all users that user is followed by
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatUserFollowed = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowed(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that user is following
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatUserFollowing = (req:Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidfollowing and uidfollowed representing the user that is following another user
     * and the other user who are followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowAnotherUser(req.params.uidfollowing, req.params.uidfollowed)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidfollowing and uidfollowed representing the user that is not following another user
     * and the other user who are not followed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAnotherUser(req.params.uidfollowing, req.params.uidfollowed)
            .then(status => res.send(status));
};

/**
 * @file Controller RESTful Web service API for follows resource
 */

import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uidfollowing/follows/:uidfollowed",FollowController.followController.userFollowAnotherUser);
            app.delete("api/users/:uidfollowing/follows/:uidfollowed",FollowController.followController.userUnfollowAnotherUser);
            app.get("api/users/:uid/followed",FollowController.followController.findAllUsersThatUserFollowed);
            app.get("api/users/:uid/following",FollowController.followController.findAllUsersThatUserFollowing)
        }
        return FollowController.followController;
    }

    private constructor() {}

    findAllUsersThatUserFollowed = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowed(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersThatUserFollowing = (req:Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowing(req.params.uid)
            .then(follows => res.json(follows));

    userFollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowAnotherUser(req.params.uidfollowing, req.params.uidfollowed)
            .then(follows => res.json(follows));

    userUnfollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAnotherUser(req.params.uidfollowing, req.params.uidfollowed)
            .then(status => res.send(status));
};

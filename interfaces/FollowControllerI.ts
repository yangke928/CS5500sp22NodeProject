/**
 * @file Declares controller RESTful API for Follows resource
 */

import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowAnotherUser(req: Request, res: Response): void;
    userUnfollowAnotherUser(req: Request, res: Response): void;
    findAllUsersThatUserFollowing(req: Request, res: Response): void;
    findAllUsersThatUserFollowed(req: Request, res: Response): void;
}

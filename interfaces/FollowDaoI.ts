/**
 * @file Declares API for Follows related data access object methods
 */

import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    userFollowAnotherUser(uidfollowing: string, uidfollowed: string): Promise <Follow>;
    userUnfollowAnotherUser(uidfollowing: string, uidfollowed: string): Promise <any>;
    findAllUsersThatUserFollowing(uid: string): Promise <Follow[]>;
    findAllUsersThatUserFollowed(uid: string): Promise <Follow[]>;
};

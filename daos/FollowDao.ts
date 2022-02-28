import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private  static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;

    }
    private constructor() {}

    userFollowAnotherUser = async (uidfollowing: string, uidfollowed: string): Promise<Follow> =>
        FollowModel
            .create({userFollowing:uidfollowing, userFollowed: uidfollowed});

    userUnfollowAnotherUser = async (uidfollowing: string, uidfollowed: string): Promise<any>  =>
        FollowModel
            .deleteOne({userFollowing:uidfollowing, userFollowed: uidfollowed});

    findAllUsersThatUserFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    findAllUsersThatUserFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

}

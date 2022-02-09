import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('users/:uid/tuits', this.findTuitById)
        this.app.post('/tuits', this.createTuit)
        this.app.delete('/tuits/:tid', this.deleteTuit)
        this.app.put('/tuits/:tid', this.updateTuit)
    }

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then((tuit: Tuit) => res.json(tuit));
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
}
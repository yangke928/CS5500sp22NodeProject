import express, {Request, Response} from 'express'；
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tuiter');

const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World2!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = new UserController(app, new UserDao);
const tuitController = new TuitController(app, new TuitDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
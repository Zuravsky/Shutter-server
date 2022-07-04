import cors from "cors";
import express from "express";
import {dbConnect} from "./utils/db";
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

const app = express();

app.use(cors({
    origin: 'http://localhost:5000'
}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 100,
}));

app.use(handleError)

dbConnect()
    .then(() => {
        app.listen(5000, 'localhost',() => {
            console.log('Listening on http://localhost:5000');
        })
    })
    .catch((err) => console.log(err));



import cors from "cors";
import express, {json} from "express";

const app = express();

app.use(cors({
    origin: 'http://localhost:5000'
}))
app.use(json());

app.listen(5000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:5000');
})
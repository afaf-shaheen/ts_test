import express, { Express } from "express";
import cors from "cors";
import router from "./routes/router";


const app: Express = express();

app.use(cors({
    origin : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
}));

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log('Server is running on port 3000'));
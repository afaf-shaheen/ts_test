import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error.handler";

const app: Express = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));
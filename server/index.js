import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
import { createComunity } from "./controllers/comunity.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import comunityRoutes from "./routes/comunity.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import Comunity from "./models/comunity.js";
import { userIds, posts, users, comunitys } from "./data/index.js";

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const multipleUploads = upload.fields([{ name: "picture" }, { name: "cover" }]);

//mongoose setup
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`connected on port ${PORT}`));
    //add dummy data
    // User.insertMany(users) ;
    // Post.insertMany(posts);
    //Comunity.insertMany(comunitys);
  })
  .catch((err) => console.log(`${err} could'nt connect to server`));

//routes w files
app.post("/auth/register", upload.single("picture"), register);
app.get("/auth/register", (req, res) => {
  res.status(200).json({ msg: "success" });
});
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.post("/comunity/create", verifyToken, multipleUploads, createComunity);

//routes setup
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comunity", comunityRoutes);
app.use("/chats", chatRoutes);
app.use("/message", messageRoutes);

// pass : u515gzSnqqEshAwZ

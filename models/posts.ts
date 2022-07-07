import mongoose from "mongoose";
import {PostsEntity} from "../types/postsEntity";

const postsSchema = new mongoose.Schema<PostsEntity>({
    author: {type: String, required: true},
    title: {type: String, required: true},
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {type: [String], default: []},
    createdAt: {type: Date, default: new Date()},
})

export const Posts = mongoose.model('Posts', postsSchema);



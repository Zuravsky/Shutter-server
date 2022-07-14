import mongoose from "mongoose";
import {PostEntity} from "../types/posts/postsEntity";

const postsSchema = new mongoose.Schema<PostEntity>({
    // author: {type: String, required: true},
    title: {type: String, required: true, maxlength: 50},
    message: {type: String, maxlength: 1000},
    tags: [String],
    selectedFile: String,
    likes: {type: [String], default: []},
    createdAt: {type: Date, default: new Date()},
})

export const Posts = mongoose.model<PostEntity>('Posts', postsSchema);



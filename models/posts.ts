import mongoose from "mongoose";
import {PostEntity} from "../types";

const postsSchema = new mongoose.Schema<PostEntity>({
    title: {type: String, maxlength: 50},
    message: {type: String, maxlength: 500},
    tags: [String],
    selectedFile: String,
    likes: {type: [String], default: []},
    createdAt: {type: Date, default: new Date()},
})

export const Posts = mongoose.model<PostEntity>('Posts', postsSchema);



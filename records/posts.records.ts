import {CreatePostEntity, PostEntity, PostsEntity} from "../types";
import {Posts} from "../models/posts";

export class PostsRecords {

    static async getPosts(): Promise<PostsEntity | null> {
        return (await Posts.find());
    }

    static async getOnePost(id: string): Promise<PostEntity> {
        return (await Posts.findById(id));
    }

    static async createPost(post: PostEntity): Promise<PostEntity> {
        const newPost = new Posts(post);

        await newPost.save();

        return newPost;
    }

    static async updatePost(id: string, post: CreatePostEntity): Promise<void> {
        return (await Posts.findByIdAndUpdate(id, {...post}, {new: true}))
    }

    static async deletePost(id: string): Promise<void> {
        await Posts.findByIdAndDelete(id);
    }

}
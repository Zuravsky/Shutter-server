import {CreatePostEntity, PostEntity, PostsEntity} from "../types/posts/postsEntity";
import {Posts} from "../models/posts";

export class PostsRecords {

    static async getPosts(): Promise<PostsEntity | null> {
        return (await Posts.find());
    }

    static async getOnePost(id: string): Promise<PostEntity> {
        return (await Posts.findById(id));
    }

    static async createPost(post: PostsEntity): Promise<string> {
        const newPost = new Posts(post);

        await newPost.save();

        return newPost._id.toString();
    }

    static async updatePost(id: string, post: CreatePostEntity): Promise<void> {
        await Posts.findByIdAndUpdate(id, {...post}, {new: true})
    }

    static async deletePost(id: string): Promise<void> {
        await Posts.findByIdAndDelete(id);
    }

}
import {PostsEntity} from "../types/postsEntity";
import {ValidationError} from "../utils/errors";
import {Posts} from "../models/posts";

export class PostsRecords implements PostsEntity {
    public _id: string;
    public title: string;
    public message: string;
    public author: string;
    public tags: string[];
    public selectedFile: string;
    public likes: string[];
    public createdAt: Date;

    constructor(obj: PostsEntity) {
        if(!obj.title || obj.title.length > 50) {
            throw new ValidationError("Title cannot be empty and it has to contain maximum 50 signs.")
        }
        if(obj.message.length > 1000) {
            throw new ValidationError("Message cannot contain more than 1000 signs.")
        }
        if(!obj.author) {
            throw new ValidationError("Author cannot be empty")
        }
        if(obj.tags.some(tag => tag.length > 30)) {
            throw new ValidationError("Tag has to contain maximum 30 signs.")
        }

        this._id = obj._id
        this.title = obj.title;
        this.message = obj.message;
        this.author = obj.author;
        this.tags = obj.tags;
        this.selectedFile = obj.selectedFile;
        this.likes = obj.likes;
        this.createdAt = obj.createdAt;
    }

    static async getPosts(): Promise<PostsEntity[] | null> {
        return (await Posts.find());
    }

    static async getOnePost(id: string): Promise<PostsEntity> {
        return (await Posts.findById(id));
    }

    static async createPost(post: PostsEntity): Promise<string> {
        const newPost = new Posts(post);

        await newPost.save();

        return newPost._id.toString();
    }

    static async updatePost(id: string, post: PostsEntity): Promise<void> {
        await Posts.findByIdAndUpdate(id, {...post}, {new: true})
    }

    static async deletePost(id: string): Promise<void> {
        await Posts.findByIdAndDelete(id);
    }
}
export interface PostsEntity {
    _id?: string,
    title: string;
    message: string;
    author: string;
    tags?: string[];
    selectedFile?: string;
    likes?: string[];
    createdAt?: Date;
}
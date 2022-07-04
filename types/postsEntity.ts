export interface PostsEntity {
    title: string;
    message: string;
    author: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    createdAt: Date;
}
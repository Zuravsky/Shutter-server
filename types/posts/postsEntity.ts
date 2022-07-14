export interface CreatePostEntity {
    title: string;
    message: string;
    // author: string;
    tags: string[] | string;
    selectedFile: string;
}

export interface PostEntity extends CreatePostEntity {
    _id: string,
    likes: string[];
    createdAt: Date;
}

export type PostsEntity = PostEntity[];
import {PostEntity} from "../types";
import {PostsRecords} from "../records/posts.records";
import {dbConnect} from "../utils/db";

const defaultObj: PostEntity = {
    title: 'test',
    message: 'test',
    tags: ['test'],
    selectedFile: 'test',
    likes: ['test'],
    createdAt: new Date(),
}

beforeAll(async () => await dbConnect());

test('PostsRecord.createPost can create post and return id', async () => {
    const newPost = await PostsRecords.createPost(defaultObj);

    const newPostId = newPost._id.toString()

    const getPost = await PostsRecords.getOnePost(newPostId);

    expect(newPostId).toBeDefined();
    expect(typeof newPostId).toBe('string')
    expect(getPost.title).toBe('test')
    expect(newPostId).toBe(getPost._id.toString());
});

test('PostsRecord.getAll returns array of posts', async () => {
    const posts = await PostsRecords.getPosts()

    expect(posts).toBeDefined()
    expect(posts[0]._id).toBeDefined()
});

test('PostsRecord.getOnePost returns data from database for one entry', async () => {
    const newPost = await PostsRecords.createPost(defaultObj)

    const newPostId = newPost._id.toString()

    const post = await PostsRecords.getOnePost(newPostId)

    expect(post).toBeDefined()
    expect(post.message).toBe('test')
})

test('PostsRecord.deletePost removes post from database', async () => {
    const newPost = await PostsRecords.createPost(defaultObj)

    const newPostId = newPost._id.toString()

    const deletedPost = await PostsRecords.deletePost(newPostId)

    expect(deletedPost).not.toBeDefined();
});

test('PostsRecord.updatePost updates post in database', async () => {
    const newPost = await PostsRecords.createPost(defaultObj)
    const newPostId = newPost._id.toString()

    await PostsRecords.updatePost(newPostId, {...defaultObj, message: 'abcd'});
    const post = await PostsRecords.getOnePost(newPostId);

    expect(post.message).toBe('abcd')
    expect(post.title).toBe('test')
})
import {PostsEntity} from "../types/posts/postsEntity";
import {PostsRecords} from "../records/posts.records";
import {dbConnect} from "../utils/db";

const defaultObj: PostsEntity = {
    _id: '',
    title: 'test',
    message: 'test',
    author: 'test',
    tags: ['test'],
    selectedFile: 'test',
    likes: ['test'],
    createdAt: new Date(),
}

beforeAll(async () => await dbConnect());

test('PostsRecord.createPost can create post and return id', async () => {
    const newPostId = await PostsRecords.createPost(defaultObj);

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
    const newPostId = await PostsRecords.createPost(defaultObj)
    const post = await PostsRecords.getOnePost(newPostId)

    expect(post).toBeDefined()
    expect(post.message).toBe('test')
})

test('PostsRecord.deletePost removes post from database', async () => {
    const newPostId = await PostsRecords.createPost(defaultObj)
    const deletedPost = await PostsRecords.deletePost(newPostId)

    expect(deletedPost).not.toBeDefined();
});

test('PostsRecord.updatePost updates post in database', async () => {
    const newPostId = await PostsRecords.createPost(defaultObj)
    await PostsRecords.updatePost(newPostId, {...defaultObj, message: 'abcd'});
    const post = await PostsRecords.getOnePost(newPostId);

    expect(post.message).toBe('abcd')
    expect(post.title).toBe('test')
})
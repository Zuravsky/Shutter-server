import {PostsRecords} from "../records/posts.records";
import {PostsEntity} from "../types/postsEntity";

const defaultObj: PostsEntity = {
    title: 'test',
    message: 'test',
    author: 'test',
    tags: ['test'],
    selectedFile: 'test',
    likes: ['test'],
}

test('Can build PostsRecord.', async () => {
    const post = new PostsRecords(defaultObj);

    expect(post.author).toBeDefined()
    expect(post.author).toBe('test')
    expect(post.title).toBe('test')
})
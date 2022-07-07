import {Router} from "express";
import {PostsRecords} from "../records/posts.records";
import mongoose from "mongoose";

export const postsRouter = Router()
    .get('/', async (req, res) => {
        const posts = await PostsRecords.getPosts();

        res.status(200).json(posts)
    })
    .post('/', async (req, res) => {
        await PostsRecords.createPost(req.body);

        res.status(201).json({message: 'New post created successfully.'})
    })
    .patch('/:id', async (req, res) => {
        const {id} = req.params;
        const post = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        const updatedPost = await PostsRecords.updatePost(id, post);

        console.log(updatedPost)
        res.status(200).json({message: 'Post updated successfully.'})
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        await PostsRecords.deletePost(id);

        res.json({message: 'Post deleted successfully.'});
    })
    .get('/:id', async (req, res) => {
        const {id} = req.params;

        const post = await PostsRecords.getOnePost(id);

        res.json(post)
    })


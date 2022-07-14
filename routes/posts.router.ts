import {Router} from "express";
import {PostsRecords} from "../records/posts.records";
import mongoose from "mongoose";
import {PostsEntity} from "../types";

const requestIp = require('request-ip');


export const postsRouter = Router()
    .get('/', async (req, res) => {
        const posts: PostsEntity = await PostsRecords.getPosts();

        res.status(200).json(posts)
    })
    .post('/', async (req, res) => {
        const post = req.body

        const newPost = await PostsRecords.createPost(post);

        res.status(201).json({message: 'New post created successfully.', post: newPost})
    })
    .patch('/:id', async (req, res) => {
        const {id} = req.params;
        const post = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        const updatedPost = await PostsRecords.updatePost(id, post);

        console.log(updatedPost)
        res.status(200).json({message: 'Post updated successfully.', post: updatedPost})
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        await PostsRecords.deletePost(id);

        res.json({message: 'Post deleted successfully.', id});
    })
    .get('/:id', async (req, res) => {
        const {id} = req.params;

        const post = await PostsRecords.getOnePost(id);

        res.json(post)
    })
    .patch('/:id/likePost', async (req, res) => {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        const post = await PostsRecords.getOnePost(id);

        const ip = requestIp.getClientIp(req)
        console.log(ip)

        const index = post.likes.findIndex((index: string) => index === ip)

        if (index === -1) {
            typeof ip === 'string' ? post.likes.push(ip) : null;
        } else {
            post.likes = post.likes.filter((postIp: string) =>  postIp !== ip)
        }

        console.log(index);
        console.log(post.likes);

        const likePost = await PostsRecords.updatePost(id, post);

        res.status(200).json({message: 'Post updated successfully.', likePost})
    })


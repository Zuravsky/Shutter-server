import {Router} from "express";
import {PostsRecords} from "../records/posts.records";
import mongoose from "mongoose";
import {PostsEntity} from "../types";
import {ValidationError} from "../utils/errors";

const requestIp = require('request-ip');


export const postsRouter = Router()
    .get('/', async (req, res) => {
        const posts: PostsEntity = await PostsRecords.getPosts();

        res.status(200).json(posts)
    })
    .post('/', async (req, res) => {
        const post = req.body

        if (!post.title || post.title.length > 50) {
            throw new ValidationError('Title cannot be empty and it must contain maximum 50 signs.')
        }

        if (post.message.length > 500) {
            throw new ValidationError('Message must contain maximum 500 signs.')
        }

        const newPost = await PostsRecords.createPost(post);

        res.status(201).json(newPost)
    })
    .patch('/:id', async (req, res) => {
        const {id} = req.params;
        const post = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        const updatedPost = await PostsRecords.updatePost(id, post);

        res.status(200).json(updatedPost)
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        await PostsRecords.deletePost(id);

        res.json(id);
    })
    .get('/:id', async (req, res) => {
        const {id} = req.params;

        const post = await PostsRecords.getOnePost(id);

        res.json(post)
    })
    .patch('/likePost/:id', async (req, res) => {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(204).send('No post with that id.')
        }

        const post = await PostsRecords.getOnePost(id);

        const ip = requestIp.getClientIp(req)

        const index = post.likes.findIndex((index: string) => index === ip)

        if (index === -1) {
            typeof ip === 'string' ? post.likes.push(ip) : null;
        } else {
            post.likes = post.likes.filter((postIp: string) =>  postIp !== ip)
        }

        const likePost = await PostsRecords.updatePost(id, post);

        res.status(200).json(likePost)
    })
    .get('/search/:tag', async (req, res) => {
        const {tag} = req.params

        const posts: PostsEntity = await PostsRecords.getPosts()

        const postsFiltered = posts.filter(post => post.tags.includes(tag))

        res.json(postsFiltered)
    })


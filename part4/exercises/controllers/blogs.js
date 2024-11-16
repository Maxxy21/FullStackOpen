const blogsRouter = require('express').Router()
const Blogs = require('../models/blogs')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blogs.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blogs({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    if (!blog.title || !blog.url) {
        return response.status(400).json({error: 'title or author missing'})
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blogs.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
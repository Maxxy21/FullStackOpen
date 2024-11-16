const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    assert(ids)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'John Doe',
        url: 'https://example.com',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    assert(titles.includes('async/await simplifies making async calls'))
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'John Doe',
        url: 'https://example.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)
    assert(likes.includes(0))
})

test('if the title and url properties are missing from the request data, the backend responds to the request with status code 400 Bad Request', async () => {
        const newBlog = {
            author: 'John Doe',
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    }
)


test("update the amount of likes for a blog post", async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 10
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const updatedResponse = await api.get('/api/blogs')
    const updatedLikes = updatedResponse.body.map(r => r.likes)
    assert(updatedLikes.includes(10))
})


after(async () => {
    await mongoose.connection.close()
})


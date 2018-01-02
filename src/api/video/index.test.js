import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Video } from '.'

const app = () => express(apiRoot, routes)

let video

beforeEach(async () => {
  video = await Video.create({})
})

test('POST /videos 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', description: 'test', url: 'test', imageUrl: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.imageUrl).toEqual('test')
})

test('POST /videos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /videos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /videos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${video.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(video.id)
})

test('GET /videos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /videos/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${video.id}`)
    .send({ access_token: masterKey, title: 'test', description: 'test', url: 'test', imageUrl: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(video.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.imageUrl).toEqual('test')
})

test('PUT /videos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${video.id}`)
  expect(status).toBe(401)
})

test('PUT /videos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', description: 'test', url: 'test', imageUrl: 'test' })
  expect(status).toBe(404)
})

test('DELETE /videos/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${video.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /videos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${video.id}`)
  expect(status).toBe(401)
})

test('DELETE /videos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

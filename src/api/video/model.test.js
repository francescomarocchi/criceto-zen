import { Video } from '.'

let video

beforeEach(async () => {
  video = await Video.create({ title: 'test', description: 'test', url: 'test', imageUrl: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = video.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(video.id)
    expect(view.title).toBe(video.title)
    expect(view.description).toBe(video.description)
    expect(view.url).toBe(video.url)
    expect(view.imageUrl).toBe(video.imageUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = video.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(video.id)
    expect(view.title).toBe(video.title)
    expect(view.description).toBe(video.description)
    expect(view.url).toBe(video.url)
    expect(view.imageUrl).toBe(video.imageUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

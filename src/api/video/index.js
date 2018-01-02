import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Video, { schema } from './model'

const router = new Router()
const { title, description, url, imageUrl } = schema.tree

/**
 * @api {post} /videos Create video
 * @apiName CreateVideo
 * @apiGroup Video
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Video's title.
 * @apiParam description Video's description.
 * @apiParam url Video's url.
 * @apiParam imageUrl Video's imageUrl.
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ title, description, url, imageUrl }),
  create)

/**
 * @api {get} /videos Retrieve videos
 * @apiName RetrieveVideos
 * @apiGroup Video
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of videos.
 * @apiSuccess {Object[]} rows List of videos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /videos/:id Retrieve video
 * @apiName RetrieveVideo
 * @apiGroup Video
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /videos/:id Update video
 * @apiName UpdateVideo
 * @apiGroup Video
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Video's title.
 * @apiParam description Video's description.
 * @apiParam url Video's url.
 * @apiParam imageUrl Video's imageUrl.
 * @apiSuccess {Object} video Video's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Video not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ title, description, url, imageUrl }),
  update)

/**
 * @api {delete} /videos/:id Delete video
 * @apiName DeleteVideo
 * @apiGroup Video
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Video not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router

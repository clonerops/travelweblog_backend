import express from 'express'
import ArticleController from '../../controllers/article'
import uploadFile from '../middlewares/uploadImage'

const router = express.Router()

router.post('/create', uploadFile.single('image'), ArticleController.create)
router.delete('/:id/delete', ArticleController.delete)
router.put('/:id/update', uploadFile.single('image'), ArticleController.update)
router.get('/get', ArticleController.get)
router.get('/:id/get', ArticleController.getById)

export default router
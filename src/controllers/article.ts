import { Request, Response, NextFunction } from 'express'
import Article from '../models/article'

const ArticleController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description } = req.body

            if(req.file == undefined){
                return res.status(400).json({
                    message: 'خطا در آپلود فایل!'
                })
            }

            const newArticle = new Article({
                title: title,
                description: description,
                image: req.file.path
            })

            await newArticle.save()

            return res.status(201).json({
                message: true,
                data: {
                    title: title, 
                    description: description, 
                    image: req.file.path
                }
            })

        } catch (error) {
            console.log(error)
        }
    },

    delete: async(req: Request, res: Response, next: NextFunction) => {
        const article = await Article.findOne({_id: req.params.id})

        if(!article) {
            return res.status(400).json({
                message: 'مقاله موردنظر یافت نشد!'
            })
        }

        await article.delete()
        return res.status(200).json({
            message: 'مقاله با موفقیت حذف گردید.'
        })
    },

    update: async(req: Request, res: Response, next: NextFunction) => {
        const { title , description } = req.body
        const article = await Article.findOne({_id: req.params.id})

        if(!article){
            return res.status(400).json({
                message: 'مقاله موردنظر یافت نشد!'
            })
        }

        if(req.file == undefined){
            return res.status(400).json({
                message: 'خطا در آپلود فایل!'
            })
        }

        const updatedArticle = await Article.updateOne({_id: req.params.id}, {
            title: title,
            description: description,
            image: req.file?.path
        })
        return res.status(200).json(updatedArticle)

    },

    get: async(req: Request, res: Response, next: NextFunction) => {
        const article = await Article.find()
        return res.status(200).json(article)
    },
    getById: async(req: Request, res: Response, next: NextFunction) => {
        const article = await Article.findOne({_id: req.params.id})
        return res.status(200).json({
            id: article?._id,
            title: article?.title,
            description: article?.description,
            image: article?.image
        })
    }
}

export default ArticleController
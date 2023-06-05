import {readdirSync} from "fs";
import {Router} from 'express';
import userRouter from './user'
import articleRouter from './article'
const router = Router()

router.use('/user', userRouter)
router.use('/article', articleRouter)


readdirSync('src/api/routes').map(async (route) => {
    const {default: handler} = await import(`./${route}`)
    router.use(`/${route.slice(0, -3)}`, handler)

});


export default router

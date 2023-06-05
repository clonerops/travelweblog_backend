import User from '../models/user'
import { Response, Request, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt, {Secret} from 'jsonwebtoken'

const secretkey: Secret = 'SSDKFJSDFDERGRIEVMWEF324MSDLFSK'

const UserController = {
    signUp: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, firstName, lastName, password } = req.body
            const existedUser = await User.findOne({ email: email })

            if (existedUser) {
                return res.status(400).json({ message: "کاربر با این اطلاعات قبلا ثبت نام کرده است." })
            }

            const salt = await bcrypt.genSalt(12)
            const hash = await bcrypt.hash(password, salt)

            let newUser = new User({
                email: email,
                firstName: firstName,
                lastName: lastName,
                Password: hash
            })

            await newUser.save()
            return res.status(201).json({
                message: 'ثبت نام با موفقیت انجام گردید!',
                data: {
                    firstName,
                    lastName,
                    email
                }
            })

        } catch (error) {
            console.log(error)
        }

    },

    signIn: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body

            const user: any = await User.findOne({ email: email })

            if (!user) {
                return res.status(400).json({
                    message: 'اطلاعات وارد شده در سامانه موجود نمی باشد!'
                })
            }

            const isMatch = await bcrypt.compare(password, user?.Password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'رمز عبور صحیح نمی باشد!'
                })
            }

            const payload = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }

            return jwt.sign(payload, secretkey, {expiresIn: 3600}, (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            })
            

        } catch (error) {
            console.log(error)
        }
    }
}
export default UserController
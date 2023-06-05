import express from "express";
import bodyParser from "body-parser"
import api from './routes/index'
import cors from 'cors'
import helmet from 'helmet'
// import swaggerUi from 'swagger-ui-express'
// import * as swaggerDocument from './swagger.ts'
// import { SWAGGER_CONFIG } from "../../config";

const app = express()

export function runServer() {
    app.use('/resources',express.static('resources'))
    // Body Parser 
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Cors
    app.use(cors())

    // Helmet
    app.use(helmet())

    // Route
    app.use('/api', api)
    // app.use('/api-docs', swaggerUi.serveWithOptions(SWAGGER_CONFIG), swaggerUi.setup(swaggerDocument));

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is Up PORT: ${process.env.PORT} and PID: ${process.pid}`)
    })

}
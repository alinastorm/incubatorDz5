import express from 'express';
import { blogsRoutes } from '../routes/blogs-router';
import { postsRoutes } from '../routes/posts-router';
import { testingRoutes } from '../routes/testing-router';
import * as core from 'express-serve-static-core';
import * as http from 'http';
import { usersRoutes } from '../routes/users-router';
import { authRoutes } from '../routes/auth-router';



class HttpService {
    app: core.Express = express()
    server!: http.Server
    port: number | string = process.env.PORT || 9000
    run() {
        //body Parser
        this.app.use(express.json())
        //routes
        this.app.use([
            testingRoutes,
            blogsRoutes,
            postsRoutes,
            usersRoutes,
            authRoutes
        ])
        //starting server
        this.server = this.app.listen(this.port, () => console.log(`http://localhost:${this.port}`))
    }
    stop() {
        this.server.close()
    }
}

export default new HttpService()
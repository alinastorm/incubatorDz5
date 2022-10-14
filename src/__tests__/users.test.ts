// const request = require("supertest")
import request from "supertest"
import httpServerService from "../services/httpServer-service"
import DbMongo from "../adapters/mongoDb-adapter"
import Ajv from "ajv"
import { BlogViewModel, HTTP_STATUSES, Paginator, PostViewModel, UserViewModel } from "../types/types"
import { Response } from 'express';


const ajv = new Ajv({ strict: false })
function checkSchema(schema: any, body: any) {
    const validate = ajv.compile(schema)
    const validBody = validate(body)
    if (!validBody) console.error('checkSchema:', validate.errors)
    return validBody
}
describe("/users", () => {
    beforeAll(() => {
        httpServerService.run()
    })
    afterAll(async () => {
        await DbMongo.disconnect()
        httpServerService.stop()
    })

    test('All delete', async () => {
        const { status } = await request(httpServerService.server).delete("/testing/all-data")
        expect(status).toBe(204)
    })
    test('Return All users = []', async () => {

        const { status, body } = await request(httpServerService.server)
            .get("/users")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')


        expect(status).toBe(200)

        expect(body).toStrictEqual({
            "pagesCount": 0,
            "page": 1,
            "pageSize": 10,
            "totalCount": 0,
            "items": []
        })

    })
    test('Add new user to the system', async () => {
        const { status, body } = await request(httpServerService.server)
            .post("/users")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
                "login": "User1",
                "password": "Password1",
                "email": "user1@gmail.com"
            })
        const schema = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "login": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "login",
                "email",
                "createdAt"
            ]
        }
        expect(status).toBe(201)
        expect(checkSchema(schema, body)).toBe(true)
    })
    test('Try login user to the system', async () => {
        const { status } = await request(httpServerService.server)
            .post("/auth/login")
            .send({
                "login": "User1",
                "password": "Password1",
            })
        expect(status).toBe(204)
    })
    let user: UserViewModel
    test('Return All users after added', async () => {

        const { status, body }: { status: any, body: Paginator<UserViewModel> } = await request(httpServerService.server)
            .get("/users")
        const schema = {
            "type": "object",
            "properties": {
                "pagesCount": {
                    "type": "integer"
                },
                "page": {
                    "type": "integer"
                },
                "pageSize": {
                    "type": "integer"
                },
                "totalCount": {
                    "type": "integer"
                },
                "items": {
                    "type": "array",
                    "items": [
                        {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "login": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                "createdAt": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "id",
                                "login",
                                "email",
                                "createdAt"
                            ]
                        }
                    ]
                }
            },
            "required": [
                "pagesCount",
                "page",
                "pageSize",
                "totalCount",
                "items"
            ]
        }
        expect(status).toBe(200)
        expect(checkSchema(schema, body)).toBe(true)
        user = body.items[0]
    })
    test('Delete User by ID', async () => {

        const { status } = await request(httpServerService.server)
            .delete(`/users/${user.id}`)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')

        expect(status).toBe(204)
    })
    test('GET User after delete by ID', async () => {
        const { status } = await request(httpServerService.server)
            .get(`/blogs/${user?.id}`)

        expect(status).toBe(404)

    })
})
// const request = require("supertest")
import request from "supertest"
import httpServerService from "../services/httpServer-service"
import DbMongo from "../adapters/mongoDb-adapter"
import Ajv from "ajv"
import { BlogViewModel, HTTP_STATUSES, PostInputModel, PostViewModel } from "../types/types"

const ajv = new Ajv({ strict: false })
function check(schema: any, body: any) {
  const validate = ajv.compile(schema)
  const validBody = validate(body)
  if (!validBody) console.log(validate.errors)
  return validBody
}
describe("/posts", () => {
  beforeAll(() => {
    httpServerService.run()
  })
  afterAll(async () => {
    await DbMongo.disconnect()
    httpServerService.stop()
  })

  test('Wrong route', async () => {
    const { status } = await request(httpServerService.server).get("/wrong")
    expect(status).toBe(HTTP_STATUSES.NOT_FOUND_404)
  })

})
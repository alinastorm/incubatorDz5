
import dbMongoService from "./adapters/mongoDb-adapter";
import httpService from "./services/httpServer-service"



(async function () {
    await dbMongoService.connect()
    httpService.run()
})()
import { Request, Response } from 'express';
import blogsReadRepository from '../repository/blogs-read-repository';
import blogsService from '../repository/blogs-write-repository';
import postsReadRepository from '../repository/posts-read-repository';
import postsWriteRepository from '../repository/posts-write-repository';
import { HTTP_STATUSES, Paginator, PostInputModel, PostViewModel, RequestWithBody, RequestWithParams, RequestWithParamsBody, RequestWithQuery, ResponseWithBodyCode, ResponseWithCode } from '../types/types';


class Controller {

    async readAll(req: Request, res: ResponseWithCode<200>) {
        const result = await postsReadRepository.readAll()
        res.status(HTTP_STATUSES.OK_200).send(JSON.stringify(result))
    }
    async readAllPaginationSort(
        req: RequestWithQuery<{ pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1 }>,
        res: ResponseWithBodyCode<Paginator<PostViewModel[]>, 200>
    ) {
        const { pageNumber, pageSize, sortBy, sortDirection } = req.query
        const result = await postsReadRepository.readAllWithPaginationAndSort(pageNumber, pageSize, sortBy, sortDirection)
        res.status(HTTP_STATUSES.OK_200).json(result)
    }


    async createOne(req: RequestWithBody<PostInputModel>, res: ResponseWithBodyCode<PostViewModel, 201>) {
        const body = req.body
        const { blogId } = req.body
        const { name: blogName } = await blogsReadRepository.readOne(blogId)
        const element = { ...body, blogName }
        const result = await postsWriteRepository.createOne(element)
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async readOne(req: RequestWithParams<{ postId: string }>, res: ResponseWithBodyCode<PostViewModel, 200 | 404>) {
        const id = req.params.postId
        const result = await postsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
    async updateOne(req: RequestWithParamsBody<{ postId: string }, PostInputModel>, res: ResponseWithCode<204 | 404>) {
        const data = req.body
        const id = req.params.postId
        const result = await postsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        await postsWriteRepository.updateOne(id, data)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async replaceOne(req: Request, res: ResponseWithCode<204 | 404>) {
        const body = req.body
        const id = req.params.id
        const result = await postsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        await postsWriteRepository.replaceOne(id, body)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteOne(req: RequestWithParams<{ postId: string }>, res: ResponseWithCode<204 | 404>) {
        const postId = req.params.postId
        const result = await postsReadRepository.readOne(postId)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        await postsWriteRepository.deleteOne({ postId })
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteAll(req: Request, res: ResponseWithCode<204>) {
        await postsWriteRepository.deleteAll()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
}
export default new Controller()
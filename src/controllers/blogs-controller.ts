import { Request, Response } from 'express';


import blogsWriteService from '../repository/blogs-write-repository';
import blogsReadRepository from '../repository/blogs-read-repository';
import { BlogInputModel, BlogViewModel, HTTP_STATUSES, Paginator, PostViewModel, RequestWithBody, RequestWithParamsQuery, RequestWithParams, RequestWithQuery, RequestWithParamsQueryBody, RequestWithParamsBody, BlogPostInputModel, PostInputModel, ResponseWithBodyCode, ResponseWithCode } from '../types/types';
import postsReadRepository from '../repository/posts-read-repository';
import blogsWriteRepository from '../repository/blogs-write-repository';
import postsWriteRepository from '../repository/posts-write-repository';


class Controller {

    async readAll(
        req: Request,
        res: ResponseWithBodyCode<BlogViewModel[], 200>
    ) {
        const result = await blogsReadRepository.readAll()
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
    async readAllOrByNamePaginationSort(
        req: RequestWithQuery<{ searchNameTerm: string, pageNumber: number, pageSize: number, sortBy: keyof BlogViewModel, sortDirection: 1 | -1 }>,
        res: ResponseWithBodyCode<Paginator<BlogViewModel[]>, 200>
    ) {
        const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query
        const result = await blogsReadRepository.readAllByNameWithPaginationAndSort(pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
        res.status(HTTP_STATUSES.OK_200).json(result)
    }
    async createOne(
        req: RequestWithBody<BlogInputModel>,
        res: ResponseWithBodyCode<BlogViewModel, 201>
    ) {
        const data = req.body
        const result: BlogViewModel = await blogsWriteRepository.createOne(data)
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async readOne(
        req: RequestWithParams<{ blogId: string }>,
        res: ResponseWithBodyCode<BlogViewModel, 200 | 404>
    ) {
        const id = req.params.blogId
        const result = await blogsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
    async readAllPostsByBlogIdWithPaginationAndSort(
        req: RequestWithParamsQuery<{ blogId: string }, { pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1 }>,
        res: ResponseWithBodyCode<Paginator<PostViewModel[]>, 200 | 404>
    ) {
        const blogId = req.params.blogId
        const { pageNumber, pageSize, sortBy, sortDirection } = req.query

        const result: Paginator<PostViewModel[]> = await postsReadRepository.readAllPostsByBlogIdWithPaginationAndSort(pageNumber, pageSize, sortBy, sortDirection, blogId)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
    async createPostsByBlogId(
        req: RequestWithParamsBody<{ blogId: string }, BlogPostInputModel>,
        res: ResponseWithBodyCode<PostViewModel, 201>
    ) {
        const blogId = req.params.blogId
        const { content, shortDescription, title } = req.body
        const { name: blogName } = await blogsReadRepository.readOne(blogId)

        const element: PostInputModel & { blogName: string } = {
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        const result = await postsWriteRepository.createOne(element)
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async updateOne(
        req: RequestWithParams<{ blogId: string }>,
        res: ResponseWithCode<204|404>
    ) {
        const body = req.body
        const id = req.params.blogId
        const result = await blogsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        await blogsWriteService.updateOne(id, body)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async replaceOne(
        req: RequestWithParams<{ blogId: string }>,
        res: ResponseWithCode<204|404>
    ) {
        const body = req.body
        const id = req.params.blogId
        const result = await blogsReadRepository.readOne(id)
        if (!result) {
            return res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found')
        }
        await blogsWriteService.replaceOne(id, body)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteOne(
        req: RequestWithParams<{ blogId: string }>,
        res: ResponseWithCode<204|404|500>
    ) {
        const id = req.params.blogId
        const result = await blogsReadRepository.readOne(id)
        if (!result) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        if (await blogsWriteService.deleteOne(id)) return res.sendStatus(204)
        return res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
    }
    async deleteAll(
        req: Request,
        res: ResponseWithCode<204>
    ) {
        await blogsWriteService.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(JSON.stringify('All data is deleted'))
    }
}
export default new Controller()
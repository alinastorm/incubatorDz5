import { Request } from 'express';
import blogsRepository from '../repository/blogs-repository';
import postsRepository from '../repository/posts-repository';
import { BlogViewModel, HTTP_STATUSES, Paginator, PostInputModel, PostViewModel, RequestWithBody, RequestWithParams, RequestWithParamsBody, RequestWithQuery, ResponseWithBodyCode, ResponseWithCode, SearchPaginationModel } from '../types/types';


class Controller {

    async readAll(req: Request, res: ResponseWithCode<200>) {
        const result = await postsRepository.readAll()
        res.status(HTTP_STATUSES.OK_200).send(JSON.stringify(result))
    }
    async readAllPaginationSort(
        req: RequestWithQuery<{ pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1 }>,
        res: ResponseWithBodyCode<Paginator<PostViewModel[]>, 200>
    ) {
        const { pageNumber, pageSize, sortBy, sortDirection } = req.query
        const query: SearchPaginationModel = { pageNumber, pageSize, sortBy, sortDirection }
        const posts: Paginator<PostViewModel[]> = await postsRepository.readAllOrByPropPaginationSort(query)

        res.status(HTTP_STATUSES.OK_200).json(posts)
    }


    async createOne(req: RequestWithBody<PostInputModel>, res: ResponseWithBodyCode<PostViewModel, 201>) {

        const { blogId, content, shortDescription, title } = req.body
        const { name: blogName } = await blogsRepository.readOne<BlogViewModel>(blogId)
        const createdAt = new Date().toISOString()

        const query: Omit<PostViewModel, 'id'> = { blogId, blogName, content, createdAt, shortDescription, title }
        const id: string = await postsRepository.createOne(query)
        const post: PostViewModel = await postsRepository.readOne(id)

        res.status(HTTP_STATUSES.CREATED_201).send(post)
    }
    async readOne(req: RequestWithParams<{ postId: string }>, res: ResponseWithBodyCode<PostViewModel, 200 | 404>) {
        const id = req.params.postId
        const post = await postsRepository.readOne<PostViewModel>(id)
        if (!post) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        res.status(HTTP_STATUSES.OK_200).send(post)
    }
    async updateOne(
        req: RequestWithParamsBody<{ postId: string }, PostInputModel>,
        res: ResponseWithCode<204 | 404>) {

        const id = req.params.postId
        const { blogId, content, shortDescription, title } = req.body

        const query: Partial<PostViewModel> = { blogId, content, shortDescription, title }
        const post = await postsRepository.readOne(id)
        if (!post) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        await postsRepository.updateOne(id, query)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    async deleteOne(req: RequestWithParams<{ postId: string }>, res: ResponseWithCode<204 | 404>) {
        const postId = req.params.postId
        const post = await postsRepository.readOne<PostViewModel>(postId)
        if (!post) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        const isDeleted = await postsRepository.deleteOne(post.id)

        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteAll(req: Request, res: ResponseWithCode<204>) {
        await postsRepository.deleteAll()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
}
export default new Controller()
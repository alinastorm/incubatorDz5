import { Response } from 'express';



import { BlogViewModel, HTTP_STATUSES, RequestWithBody, LoginInputModel, RequestWithQuery, UsersSearchPaginationModel, Paginator, UserViewModel, UserInputModel, RequestWithParams } from '../types/types';
import usersReadRepository from '../repository/users-read-repository';


class Controller {


    async readAll(
        req: RequestWithQuery<UsersSearchPaginationModel>,
        res: Response<Paginator<UserViewModel>>
    ) {
        const { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query
        const query: UsersSearchPaginationModel = { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection }
        const result: Paginator<UserViewModel> = await usersReadRepository.readAll(query)
        res.status(HTTP_STATUSES.OK_200).send(result)
    }

    async createOne(
        req: RequestWithBody<UserInputModel>,
        res: Response<UserViewModel>
    ) {
        const { email, login, password } = req.body
        const query: UserInputModel = { email, login, password }
        const result: UserViewModel = await usersReadRepository.createOne(query)
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async deleteOne(
        req: RequestWithParams<{ id: string }>,
        res: Response<BlogViewModel>
    ) {
        const { id } = req.params
        const query: string = id
        const result: boolean = await usersReadRepository.deleteOne(query)

        if (!result) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

}
export default new Controller()
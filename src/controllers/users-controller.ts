import { Response } from 'express';



import { BlogViewModel, HTTP_STATUSES, RequestWithBody, LoginInputModel, RequestWithQuery, UsersSearchPaginationModel, Paginator, UserViewModel, UserInputModel, RequestWithParams, ResponseWithBodyCode } from '../types/types';
import usersReadRepository from '../repository/users-read-repository';
import usersWriteRepository from '../repository/users-write-repository';
import { userDeleteReducer } from '../reducers/user-delete-reducer';
import { userCreateReducer } from '../reducers/user-create-reducer';


class Controller {

    async readAllPagination(
        req: RequestWithQuery<UsersSearchPaginationModel>,
        res: ResponseWithBodyCode<Paginator<UserViewModel>, 200>
    ) {
        const { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query
        const query: UsersSearchPaginationModel = { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection }
        const result: Paginator<UserViewModel> = await usersReadRepository.readAllPagination(query)
        res.status(HTTP_STATUSES.OK_200).send(result)
    }

    async createOne(
        req: RequestWithBody<UserInputModel>,
        res: ResponseWithBodyCode<UserViewModel, 201>
    ) {
        const { email, login, password } = req.body
        const query: UserInputModel = { email, login, password }
        const result: UserViewModel = await userCreateReducer(query)
        // const result: UserViewModel = await usersWriteRepository.createOne(query)
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async deleteOne(
        req: RequestWithParams<{ id: string }>,
        res: ResponseWithBodyCode<BlogViewModel, 204 | 404>
    ) {
        const { id } = req.params
        const userId: string = id
        const result: boolean = await userDeleteReducer({ userId })
        // const result: boolean = await usersWriteRepository.deleteOne(query)

        if (!result) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

}
export default new Controller()
import { Filter } from 'mongodb';
import { PostViewModel } from '../types/types';
import postsRepository from './posts-repository';
import Repository from './repository';


class UserRepository extends Repository {
    constructor() { super('blogs') }
    async deleteOne(id: string): Promise<boolean> {

        const isBlogDeleted = await super.deleteOne(id)
        if (!isBlogDeleted) return false

        const filter: Filter<PostViewModel> = { blogId: id }
        const posts = await postsRepository.readAll<PostViewModel>(filter)
        posts.forEach(async ({ id }) => {
            await postsRepository.deleteOne(id)
        })

        return true

    }
}


export default new UserRepository()








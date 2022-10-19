import Repository from './repository';


class UserRepository extends Repository {
    constructor() { super('posts') }
}

export default new UserRepository()








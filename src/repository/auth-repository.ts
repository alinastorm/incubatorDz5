import Repository from './repository';


class authRepository extends Repository {
    constructor() { super('auth') }
}


export default new authRepository()

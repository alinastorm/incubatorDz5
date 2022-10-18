import usersWriteRepository from '../repository/users-write-repository';
import postsWriteRepository from '../repository/posts-write-repository';
import { AuthViewModel, PostViewModel, searchNameTerm, UserViewModel } from '../types/types';
import usersReadRepository from '../repository/users-read-repository';
import postsReadRepository from '../repository/posts-read-repository';
import authReducer from './auth-reducer';

export const userDeleteReducer = async ({ userId }: { userId: string }) => {

    // delete users
    const usersQuery: searchNameTerm<Partial<UserViewModel>, true> = { search: { id: userId }, strict: true }
    const users = await usersReadRepository.readAll(usersQuery)
    await usersWriteRepository.deleteOne(userId)
    // delete auth
    const authQuery: searchNameTerm<Partial<AuthViewModel>, true> = { search: { userId }, strict: true }
    const auths = await authReducer.readAll(authQuery)
    auths.forEach((auth) => {
        authReducer.deleteOne(auth.id)
    })
    // delete posts
    const postsQuery: searchNameTerm<Partial<PostViewModel>, true> = { search: { blogId: userId }, strict: true }
    const posts = await postsReadRepository.readAll(postsQuery)
    posts.forEach((post) => {
        postsWriteRepository.deleteOne({ postId: post.id })
    })
    return true


    //TODO сделать транзакцию

    // const transaction = Promise.all([
    //     usersWriteRepository.deleteOne(userId),
    //     authWriteRepository.readAll(authQuery),
    //     postsReadRepository.readAll(postsQuery)
    // ]).then(([resultDeleteUser,]) => {

    // })

}
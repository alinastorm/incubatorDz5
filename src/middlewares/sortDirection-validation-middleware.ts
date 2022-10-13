import { param, query } from 'express-validator';
import { SortDirectionType } from '../types/types';

export const sortDirectionQueryValidationMiddleware = query('sortDirection')
    .default("desc")
    .isString()
    .isLength({ max: 4 })
    // .isIn([
    //     SortDirectionType.asc,
    //     SortDirectionType.desc,
    // ])
    .custom((direction: string) => {
        if (direction === "asc") return SortDirectionType.asc
        if (direction === "desc") return SortDirectionType.desc
        return SortDirectionType.desc
    })
    .exists()
// .withMessage({ message: 'wrong id', field: "id", code: 400 })

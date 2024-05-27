import {z} from 'zod'

export const SigninValidator = z.object({
    username : z.string(),
    password : z.string().min(8)
})


export const SignupValidator = z.object({
    username : z.string(),
    password : z.string().min(8),
    email : z.string().email(),
    name : z.string()
})
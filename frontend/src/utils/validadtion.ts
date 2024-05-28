import {z} from 'zod'

export const SignupSchema = z.object({
    username : z.string().nonempty({message : "Username is required!"}),
    password : z.string().nonempty({message : "Password is required!"}).min(8,{message : "Password should have 8 characters!"}),
    email : z.string().email({message : "Invalid email address!"}),
    name  : z.string().nonempty({message : "Name is required!"}),
})

export const SigninSchema = z.object({
    username : z.string().nonempty({message : "Username is required!"}),
    password : z.string().nonempty({message : "Password is required!"}).min(8,{message : "Password should have 8 characters!"}),
})
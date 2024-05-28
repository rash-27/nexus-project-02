import {z} from 'zod'

export const SignUpSchema = z.object({
    username : z.string().nonempty({message : "Username is required!"}),
    password : z.string().nonempty({message : "Password is required!"}).min(8,{message : "Password should have 8 characters!"}),
    email : z.string().email({message : "Invalid email address!"})
})

export const SigninSchema = z.object({
    username : z.string().nonempty({message : "Username is required!"}),
    password : z.string().nonempty({message : "Password is required!"}).min(8,{message : "Password should have 8 characters!"}),
})
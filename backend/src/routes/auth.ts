import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { SigninValidator , SignupValidator } from '../validator';
import bcrypt from 'bcryptjs'
const authRouter = new Hono<{
    Bindings :{
        DATABASE_URL : string,
        JWT_SECRET : string 
    }
}>();

authRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();
    // Zod validation
    const {success} = SigninValidator.safeParse(body);
    
    if(!success){
        c.status(411);
        return c.json({
            message : "Invalid Credentials"
        })
    }

    try{
        
        const response = await prisma.user.findUnique({
            where : {
                username : body.username ,
            }
        })
        if(response){

            const isCorrectPassword = await bcrypt.compare(body.password,response.password);
            if(isCorrectPassword){
                const token = await sign({id : response.id }, c.env.JWT_SECRET)
                return c.json({
                    token
                })
            }else {
                c.status(411)
                return c.json({
                    message : "Error while verifying your details"
                })
            }
        }else {
            c.status(403)
            return c.json({
                message : "Invalid Credentials"
            })
        }

    }catch(e){
        c.status(411);
        return c.json({
            message : "Something went wrong"
        })
    }
  })
  
authRouter.post('/signup',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
    const body = await c.req.json();
    //Zod validation
    const {success} = SignupValidator.safeParse(body);
    
    if(!success){
        c.status(411);
        return c.json({
            message : "Invalid Credentials"
        })
    }
    
    try{
        const responseUserame = await prisma.user.findFirst({
            where : {
               username : body.username
            }
        })
        const responseEmail = await prisma.user.findFirst({
            where : {
               email : body.email
            }
        })
    //Zod validation
    if(!(responseEmail && responseUserame)){

            const genSaltGenerated = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, genSaltGenerated);

            const user = await prisma.user.create({
               data : {
                username : body.username,
                //Bcrypt
                password : hashedPassword,
                email : body.email,
                name : body.name 
               }
            })
            const token = await sign({id : user.id},c.env.JWT_SECRET)
            c.status(200)
            return c.json({
                token
            })
        }else {
            c.status(411);
            if(responseEmail){
                return c.json({
                    message : "Email not available"
                })
            }else {
                return c.json({
                    message : "Username not available"
                })
            }
        }
    }catch(e){
        c.status(411);
        return c.json({
            message : "Something went wrong"
        })
    }
  })


export default authRouter;
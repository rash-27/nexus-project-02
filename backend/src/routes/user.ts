import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Hono} from 'hono'
import { verify } from 'hono/jwt'
const userRouter = new Hono<{
    Bindings :{
        DATABASE_URL : string,
        JWT_SECRET : string 
    },
    Variables : {
        userId : string
    }
}>()

userRouter.use('/*',async(c , next)=>{
    //token of form "Bearer token"
    const authHeader = c.req.header('authorization') || '';
    const token = authHeader?.split(' ')[1];
    try{
        const user = await verify(token , c.env.JWT_SECRET);

        if(user){
            c.set("userId",String(user.id));
            await next(); 
        }else {
            return c.json({
                message : "You are not logged in!"
            })
        }
    }catch(e){
        c.status(403)
        return c.json({
            message : "You are not authorized" 
        })
    }

})

userRouter.get('/me', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

    try{
        const id = c.get("userId");
        const user = await prisma.user.findUnique({
            where : {
                id : id
            }
        })
        if(user){
            c.status(200);
            return c.json({
                name : user.name,
                email : user.email,
                username : user.username
            })
        }

    }catch(e){
        c.status(411);
        return c.json({
            message : "Something went wrong while fetching user data"
        })
    }
    return c.text('User Info')
  })
userRouter.get('/check-auth',(c)=>{
    return c.text("You are authenticated ")
})
userRouter.get('/restaurants', (c) => {
    return c.text('Restaurants info')
  })
  
export default userRouter
  
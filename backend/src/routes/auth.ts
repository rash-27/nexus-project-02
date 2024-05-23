import {Hono} from 'hono'

const authRouter = new Hono();

authRouter.post('/signin',(c)=>{
    return c.json({
      message : "Sign in"
    })
  })
  
authRouter.post('/signup',(c)=>{
    return c.json({
      message : "Sign Up"
    })
  })


export default authRouter;
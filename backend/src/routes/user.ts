import {Hono} from 'hono'
const userRouter = new Hono()

userRouter.get('/me', (c) => {
    return c.text('User Info')
  })
  
userRouter.get('/restaurants', (c) => {
    return c.text('Restaurants info')
  })
  
export default userRouter
  
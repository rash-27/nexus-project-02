import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from 'axios'
import { SigninSchema } from "../utils/validadtion";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
interface SigninError{
    username?: string,
    password?: string
}

function Signin(){
    const [username , setUsername]= useState('');
    const [password , setPassword] = useState('');
    const [error  ,  setError] = useState<SigninError>({username : '',password : ''})
    const [alert , setAlert] = useState('')
    async function handleOnclick (){

        const {success , error} = SigninSchema.safeParse({
            username : username ,
            password : password
        })

        if(!success && error){
            const { fieldErrors } = error.flatten();
            setError({
                username: fieldErrors.username && fieldErrors.username[0],
                password: fieldErrors.password && fieldErrors.password[0],
              });
              return;
        }
        if(success){
            setError({username :'',password:''});
            axios.post('http://localhost:8787/api/auth/signin',{
                username : username,
                password : password
            }).then((response)=>{
                localStorage.setItem("token",`Bearer ${response.data}`);
                const navigate = useNavigate();
                navigate('/profile');
            }).catch((e)=>{
                setAlert(e.response.data.message)
            });
        }
    }   
    return (
        <>
        <div className='flex h-screen justify-center bg-[url("/food_image.jpg")] bg-no-repeat bg-cover bg-center'>
        <div className="flex flex-col justify-center">
            <div className="text-center font-heading pb-10 md:pb-28 text-5xl lg:text-6xl font-black ">My Restaurant</div>
            {alert && <Alert message={alert} onClick={()=>setAlert('')} />}
            <div className="flex w-full rounded-xl flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="font-normal text-3xl md:text-5xl py-6">Sign in</div>
            <Input required={true} errorMessage={error['username']}  onChange={(e)=>setUsername(e.target.value)} placeHolder="Enter username" type="text" title="Username"/>
            <Input  required={true} errorMessage={error['password']} onChange={(e)=>setPassword(e.target.value)} placeHolder="Enter password" title="Password" type="password" />
            <Button link="signup" name="Sign In" onClick={()=>handleOnclick()} />
            </div>
        </div>
        </div>
        </>
)
}

export default Signin;
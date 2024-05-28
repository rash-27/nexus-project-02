import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from 'axios'
import { SigninSchema } from "../utils/validadtion";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import Loading from "./Loading";
interface SigninError{
    username?: string,
    password?: string
}

function Signin(){
    const [username , setUsername]= useState('');
    const [password , setPassword] = useState('');
    const [error  ,  setError] = useState<SigninError>({username : '',password : ''})
    const [alert , setAlert] = useState('')
    const [loading , setLoading] = useState(false)
    const {isAuthorized , isLoading} = useAuth();
    const navigate = useNavigate()
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
            setLoading(true);
            setError({username :'',password:''});
            axios.post('http://localhost:8787/api/auth/signin',{
                username : username,
                password : password
            }).then((response)=>{
                const token = "Bearer "+response.data.token;
                localStorage.setItem("token",token);
                navigate("/profile");
                setLoading(false);
            }).catch((e)=>{
                setAlert(e.response?.data?.message)
                setLoading(false);
            });
        }
    }  
    if(loading || isLoading)return <Loading />
    if(isAuthorized)navigate('/profile')
    if(!loading && !isAuthorized)return (
        <>
        <div className='flex h-screen justify-center bg-[url("/food_image.jpg")] bg-no-repeat bg-cover bg-center'>
        <div className="flex flex-col justify-center">
            <div className="text-center font-heading pb-10 md:pb-28 text-5xl lg:text-6xl font-black ">My Restaurant</div>
            {alert && <Alert message={alert} onClick={()=>setAlert('')} />}
            <div className="flex w-full rounded-xl flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="font-normal text-3xl md:text-5xl flex py-6">
                <div className="flex flex-col justify-center text-4xl md:text-5xl">
                <IoHome className="pr-3 cursor-pointer" onClick={()=>navigate('/')} />
                </div>
                <div>Sign in</div></div>
            <Input required={true} errorMessage={error['username']}  onChange={(e)=>setUsername(e.target.value)} placeHolder="Enter your username" type="text" title="Username"/>
            <Input  required={true} errorMessage={error['password']} onChange={(e)=>setPassword(e.target.value)} placeHolder="Enter your password" title="Password" type="password" />
            <Button link="signup" name="Sign In" onClick={()=>handleOnclick()} />
            </div>
        </div>
        </div>
        </>
)
}

export default Signin;
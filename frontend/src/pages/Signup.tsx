import axios from "axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { SignupSchema } from "../utils/validadtion";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import Loading from "./Loading";
interface SignupError{
    username?: string,
    password?: string,
    email?: string ,
    name?: string 
}
function Signup(){
    const [username , setUsername]= useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const [email , setEmail] = useState('');
    const [name , setName] = useState('');
    const [error  , setError] = useState<SignupError>({username : '',password : '',email:'',name:''})
    const [alert , setAlert] = useState('')
    const {isAuthorized , isLoading} = useAuth();
    const navigate = useNavigate();
    function handleOnclick (){

        const {success , error} = SignupSchema.safeParse({
            username : username ,
            password : password ,
            email : email,
            name : name
        })
        if(!success && error){
            const { fieldErrors } = error.flatten();
            setError({
                username: fieldErrors.username && fieldErrors.username[0],
                password: fieldErrors.password && fieldErrors.password[0],
                email: fieldErrors.password && fieldErrors.password[0],
                name : fieldErrors.password && fieldErrors.password[0],
              });
              return;
        }
        if(success){
            setError({username :'',password:'',email:'',name:''});
            setLoading(true);
            axios.post('http://localhost:8787/api/auth/signup',{
                username : username,
                password : password,
                name : name ,
                email : email
            }).then((response)=>{
                const token = "Bearer "+response.data.token;
                localStorage.setItem("token",token);
                navigate("/profile")
                setLoading(false);
            }).catch((e)=>{
                setAlert(e.response?.data?.message)
                setLoading(false)
            });
        }
    }   
    if(loading || isLoading)return <Loading />
    if(isAuthorized)navigate('/profile')
    if(!loading && !isAuthorized)return (
        <>
        <div className='flex h-screen justify-center bg-[url("/food_image.jpg")] bg-no-repeat bg-cover bg-center'>
        <div className="flex flex-col justify-center">
            <div className="text-center font-heading pb-10 md:pb-12 text-5xl lg:text-6xl font-black ">My Restaurant</div>
            {alert && <Alert message={alert} onClick={()=>setAlert('')} />}
            <div className="flex w-full rounded-xl flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="font-normal text-3xl md:text-5xl py-6 flex">
                <div className="flex flex-col justify-center text-4xl md:text-5xl">
                <IoHome className="pr-3 cursor-pointer" onClick={()=>navigate('/')} />
                </div>
                <div>Sign up</div></div>
            <Input required={true} errorMessage={error['email']}  onChange={(e)=>setEmail(e.target.value)} placeHolder="Enter your email" type="email" title="Email"/>
            <Input required={true} errorMessage={error['name']}  onChange={(e)=>setName(e.target.value)} placeHolder="Enter your name" type="text" title="Name"/>
            <Input required={true} errorMessage={error['username']}  onChange={(e)=>setUsername(e.target.value)} placeHolder="Create an username" type="text" title="Username"/>
            <Input  required={true} errorMessage={error['password']} onChange={(e)=>setPassword(e.target.value)} placeHolder="Create a password" title="Password" type="password" />
            <Button link="signin" name="Sign Up" onClick={()=>handleOnclick()} />
            </div>
        </div>
        </div>
        </>)
}

export default Signup;
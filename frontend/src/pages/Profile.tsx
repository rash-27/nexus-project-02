import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "./Loading";

function Profile(){
    const [personData ,setPersonData]= useState({username : '', email:'', name:''});
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL  
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get(BACKEND_URL+'/api/v1/me',{
            headers : {
                Authorization : token
            }
        }).then((response)=>{
            setPersonData({
                username : response.data.username,
                email : response.data.email,
                name : response.data.name
            })
        }).catch(()=>{

        })
    },[])
    const {isAuthorized ,isLoading}= useAuth();
    if(isLoading)return <Loading />
    if(!isLoading && !isAuthorized){
        navigate("/");
    }
    return <div className="h-screen bg-gradient-to-r from-pink-500 to-yellow-500 backdrop-blur bg-no-repeat bg-cover bg-center">
        <NavBar />
        <div className="text-center font-normal py-4 text-3xl md:text-5xl ">
            <span className="text-white">Profile Page</span>
        </div>
        <div>
            
        </div>
        <ProfileCard personDetails={personData} />
    </div>
}

export default Profile;
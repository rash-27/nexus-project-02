import axios from "axios";
import { useEffect, useState } from "react";

function useAuth(){
    const [isAuthorized , setIsAuthorized] = useState(false);
    const [isLoading , setIsLoading] = useState(true);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get('http://localhost:8787/api/v1/check-auth',{
            headers:{
                Authorization : token
        }}).then(()=>{
            setIsAuthorized(true)
            setIsLoading(false);
        }).catch(()=>{
            setIsAuthorized(false);
            setIsLoading(false);
        });
    },[])
    return {isAuthorized , isLoading};
}
export default useAuth;
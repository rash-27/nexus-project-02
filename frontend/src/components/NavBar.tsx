import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Button";

function NavBar(){
    const {isAuthorized} = useAuth();
    const navigate = useNavigate();
    const handleLogOut = ()=>{
        localStorage.setItem('token',"");
        navigate('/');
        window.location.reload();
    }
    return (
    <div>
        <div className="flex justify-between bg-gray-600">
            <div className="font-heading text-2xl  px-4 flex flex-col justify-center">
                <Link to={'/'} className="text-center text-white font-black text-white">My Restaurant</Link>
            </div>
            <div className="px-4 flex h-16">
            {isAuthorized ? 
            <div>
                <Button name="Log out" onClick={handleLogOut} />
            </div> :
            <div className="flex hidden sm:inline-flex">
                <div className="pr-2">
                    <Button name="Sign in" onClick={()=>navigate('/signin')} />
                </div>
                <div>
                <Button name="Sign up" onClick={()=>navigate('/signup')} />
                </div>
            </div>
        }
            {/* <div className="flex flex-col justify-center border rounded-full px-5 my-1 mx-2 text-normal text-2xl font-black bg-blue-200"><div>{personData['username'].charAt(0).toUpperCase()}</div></div> */}
            </div>
        </div>
    </div>)
}
export default NavBar;
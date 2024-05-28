import NavBar from "../components/NavBar";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home(){
    const {isAuthorized } = useAuth();
    const navigate = useNavigate();
    return <div className="h-screen bg-[url('/HomeBackground.jpg')] flex flex-col bg-center ">
        <div className="flex flex-col">
        <NavBar />
        <div className="flex justify-center">
            <div className="flex flex-col  text-center justify-center items-center">
                <div className="items center">
                    <div className="text-gray-100 font-normal text-4xl md:text-5xl md:text-6xl pt-32 " >My Restaurant</div>
                </div>
                <GradientButton label="Dig in and explore the menu!" onClick={()=>navigate('/menu')} />
                {!isAuthorized && <GradientButton label="Sign in for Personalized experience" onClick={()=>navigate('/signin')} /> }
                <div>

                </div>
            </div>
        </div>
        </div>
    </div>
}

export default Home;
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

function Profile(){
    function handleOnclick(){
        localStorage.setItem('token',"");
        window.location.href = '/'
    }
    const {isAuthorized ,isLoading}= useAuth();
    if(!isLoading && !isAuthorized){
        window.location.href = "/invalid-page"
    }
    return <div className="h-screen bg-yellow-300">
        <div className="flex justify-between bg-gray-600">
            <div className="font-heading text-2xl  px-4 flex flex-col justify-center items-center">
                <div className="text-center text-white font-black text-white">My Restaurant</div>
            </div>
        <div className="px-4 h-16">
        <Button name="Log out" onClick={handleOnclick} />
        </div>
        </div>
        <div className="text-center font-normal py-4 text-3xl md:text-5xl ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Profile Page</span>
        </div>

    </div>
}

export default Profile;
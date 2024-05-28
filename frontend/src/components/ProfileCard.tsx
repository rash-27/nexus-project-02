import { IoFastFood } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
interface ProfileCardProps{
    name : string ,
    username : string
    email :string 
}

function ProfileCard ({personDetails}:{personDetails : ProfileCardProps}){
    const navigate = useNavigate();

    const handleOnclick = ()=>{
        console.log('received')
        navigate('/food')
    }
return (

<div
    className="max-w-2xl mx-4 tracking-wide font-normal sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src='/profile-icon.jpg' alt='Profile Pic' />
    </div>
    <div className="text-center mt-2 pb-4">
        <h2 className="font-semibold  text-lg">{personDetails['username']}</h2>
    </div>
    <div className="p-4 border-t px-8 py-4 pb-10 text-md">
        <div><span className="font-bold pr-2">Username :</span>{personDetails['username']}</div>
        <div><span className="font-bold pr-2">Name :</span>{personDetails['name']}</div>
        <div><span className="font-bold pr-2">Email :</span>{personDetails['email']}</div>
    </div>
    <div onClick={handleOnclick} className="flex text-xl text-center justify-center cursor-pointer py-3 border bg-pink-300 rounded-lg">
        <div className="flex flex-col justify-center">
        <IoFastFood /> 
        </div>
        <div className="pl-2">Dig in and explore the menu!</div> 
        <div className="flex flex-col justify-center"> 
        <CiLocationArrow1 className="rotate-45 " />
        </div>
     </div>
</div>
)

}

export default ProfileCard;
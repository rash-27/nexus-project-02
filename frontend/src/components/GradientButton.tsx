import { CiLocationArrow1 } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";

interface GradientButtonProps{
    label :string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
function GradientButton({label , onClick}:GradientButtonProps){
    return <div onClick={onClick} className="font-normal flex text-2xl md:text-3xl cursor-pointer mx-1 mt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 rounded-lg py-3">
    <div className="flex flex-col justify-center">
    <IoFastFood /> 
    </div>
    <div className="pl-2">{label}</div> 
    <div className="flex flex-col justify-center"> 
    <CiLocationArrow1 className="rotate-45 " />
    </div>
    </div>
}

export default GradientButton
import { MdErrorOutline } from "react-icons/md";

interface InputProps{
    type : string,
    placeHolder : string,
    title : string,
    onChange : (e:React.ChangeEvent<HTMLInputElement>)=>void,
    required : boolean,
    errorMessage?: string
}

function Input({type,placeHolder,onChange ,title,required, errorMessage}:InputProps){
return <div className="py-3 mx-6 md:mx-20">
    <p className="font-normal md:text-xl">{title}{required && <span className="text-red-700 pl-1">*</span>}</p>
    <input onChange={onChange} type={type} required={required} className={`w-64 h-10 lg:text-md p-2 border placeholder-gray-500 border-gray-400 rounded-lg focus:border-gray-700 focus:outline-none ${errorMessage && "border-2 border-red-700"}` } placeholder={placeHolder} />
    {errorMessage && <div className="text-red-700 pt-1 flex"> <div className="pt-1 pr-1"> <MdErrorOutline /> </div><div> {errorMessage} </div></div>}
</div>
}
export default Input;
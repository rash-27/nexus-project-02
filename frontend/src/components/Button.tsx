import { Link } from "react-router-dom";

interface ButtonProps {
    name: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    link ? : string
}

function Button({name , onClick ,link}:ButtonProps){
    return (
        <>
        <div className="py-5 text-center">
            <button onClick={onClick} className="font-normal md:text-xl bg-pink-300 w-32 h-12 border rounded-lg border-gray-700 mb-4">
                {name}
            </button>
            {link && <div className="pb-2 ">{link === 'signin' ? "Already have an account? " : "Don't have an account? "} <Link to={`/${link}`} className="text-blue-300">{link.charAt(0).toUpperCase() + link.slice(1)}</Link> </div>}
        </div>
        </>
    )
}

export default Button;
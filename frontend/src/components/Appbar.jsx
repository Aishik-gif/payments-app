import { useNavigate } from "react-router-dom";

export function Appbar({firstName}) {
    const navigate = useNavigate();

    return <div className="flex justify-between w-full h-14 bg-gray-800 text-gray-50">
        <div className="font-bold text-xl md:text-2xl flex items-center h-full ml-4 md:ml-10">
            Payments App
        </div>
        <div className="flex items-center">
            <div className="px-1 font-light flex items-center h-full mr-4">
                Hello, {firstName}
            </div>
            <div className="font-medium rounded-full h-10 w-10 hidden md:flex flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-500 mr-7 text-xl cursor-default">
                {firstName ? firstName[0].toUpperCase() : "U"}
            </div>
            <button className="flex justify-center items-center rounded-md text-black bg-gray-300 hover:bg-red-300 font-medium px-4 py-2 md:mr-6 mr-2"
            onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
            }}>
                Sign out
            </button>
        </div>
    </div>
}
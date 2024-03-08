import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/dashboard");
    }, [navigate]);

    return (
        <div className="flex justify-center items-center bg-slate-300 w-full h-svh">
            <div className="flex justify-around items-center max-w-sm w-full h-fit bg-gray-100 p-6 rounded-lg">
                <button
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                    onClick={() => {
                        navigate("/signup");
                    }}
                >
                    Sign up
                </button>
                <div className="relative">
                    <div className="block absolute -inset-1 -skew-y-3 bg-pink-500"></div>
                    <div className="relative text-xl font-bold text-white">or</div>
                </div>
                
                <button
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                    onClick={() => {
                        navigate("/signin");
                    }}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../env";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("")
    const navigate = useNavigate();

    return (
        <div className="h-svh bg-green-100 flex justify-center items-center">
            <div className="max-w-sm w-full h-max rounded-md bg-gray-100 text-center py-2 px-4">
                <Heading label={"Send Money"}></Heading>
                <SubHeading label={"Enter amount to send money"}></SubHeading>
                <div className="flex justify-start items-center pt-6 pb-2">
                    <div className="font-medium rounded-full h-10 w-10 flex flex-shrink-0 flex-grow-0 items-center justify-center bg-green-300 mr-3 text-xl cursor-default ml-2">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="font-medium text-lg pr-1">{name}</div>
                </div>
                <InputBox
                    label={"Amount (in Rs)"}
                    placeholder={"Enter amount"}
                    type={"number"}
                    onchange={(e) => {
                        const value = Number.parseFloat(e.target.value).toFixed(2);
                        if(value != Number.parseFloat(e.target.value) && !isNaN(value)) {
                            e.target.value=value;
                        }
                        setAmount(isNaN(e.target.value) ? "" : e.target.value);
                    }}
                ></InputBox>
                <div className="pt-4 flex justify-center py-5">
                    <button
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition ease-in-out delay-50 hover:scale-105 h-10 px-4 py-2 w-full bg-green-500 text-white"
                        onClick={async () => {
                            await axios.post(API_URL+"/api/v1/account/transfer", 
                            {
                                amount,
                                to: id,
                            }, 
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            navigate("/dashboard");
                        }}
                    >
                        Send Money
                    </button>
                </div>
            </div>
        </div>
    );
};

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../env";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(localStorage.getItem("token")) {
    //         navigate("/dashboard")
    //     }
    // }, [ navigate])

    return (
        <div className="h-svh bg-slate-300 flex justify-center items-center">
            <div className="max-w-sm w-full h-max rounded-md bg-gray-100 text-center py-2 px-4">
                <Heading label={"Signup"}></Heading>
                <SubHeading
                    label={"Enter your information to create an account"}
                ></SubHeading>
                <InputBox
                    label={"First Name"}
                    placeholder={"Aishik"}
                    type={"text"}
                    onchange={(e) => {
                        setFirstName(e.target.value);
                    }}
                ></InputBox>
                <InputBox
                    label={"Last Name"}
                    placeholder={"Dutta"}
                    type={"text"}
                    onchange={(e) => {
                        setLastName(e.target.value);
                    }}
                ></InputBox>
                <InputBox
                    label={"Email"}
                    placeholder={"someone@gmail.com"}
                    type={"email"}
                    onchange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></InputBox>
                <InputBox
                    label={"Password"}
                    placeholder={"12345678"}
                    type={"password"}
                    onchange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></InputBox>
                <div className="pt-4 flex">
                    <Button
                        label={"Sign up"}
                        onClick={async () => {
                            const response = await axios.post(
                                API_URL+"/api/v1/user/signup",
                                {
                                    firstName,
                                    lastName,
                                    username,
                                    password,
                                }
                            );
                            if (response.status === 200) {
                                localStorage.setItem(
                                    "token",
                                    response.data.token
                                );
                                navigate("/dashboard");
                            }
                        }}
                    ></Button>
                </div>
                <BottomWarning
                    label={"Already have an account?"}
                    to={"/signin"}
                    buttonText={"Sign in"}
                ></BottomWarning>
            </div>
        </div>
    );
};

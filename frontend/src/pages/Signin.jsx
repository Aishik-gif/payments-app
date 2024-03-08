import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { usernameAtom, passwordAtom } from "../store/atoms/sign";
import axios from "axios";

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);

    // useEffect(() => {
    //     if(localStorage.getItem("token")) {
    //         navigate("/dashboard")
    //     }
    // }, [ navigate])

    return (
        <div className="h-svh bg-slate-300 flex justify-center items-center">
            <div className="max-w-sm w-full h-max rounded-md bg-gray-100 text-center py-2 px-4">
                <Heading label={"Sign in"}></Heading>
                <SubHeading
                    label={"Enter your credentials to access your account"}
                ></SubHeading>
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
                    placeholder={""}
                    type={"password"}
                    onchange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></InputBox>
                <div className="pt-4 flex">
                    <Button
                        label={"Sign in"}
                        onClick={async () => {
                            const response = await axios.post(
                                "http://localhost:3000/api/v1/user/signin",
                                {
                                    username,
                                    password,
                                }
                            );
                            if(response.status === 200) {
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            }
                        }}
                    ></Button>
                </div>
                <BottomWarning
                    label={"Don't have an account?"}
                    to={"/signup"}
                    buttonText={"Sign up"}
                ></BottomWarning>
            </div>
        </div>
    );
};

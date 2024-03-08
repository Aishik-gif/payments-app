import React, { Suspense, useEffect, useState } from "react";
// const Appbar = React.lazy(() => import("../components/Appbar").then(module => ({default: module.Appbar})));
// const Balance = React.lazy(() => import("../components/Balance").then(module => ({default: module.Balance})));
// const Users = React.lazy(() => import("../components/Users").then(module => ({default: module.Users})));
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

import axios from "axios";
import { API_URL } from "../env";



export const Dashboard = () => {
    const [balance, setBalance] = useState("0");
    const [firstName, setFirstName] = useState("User");
    const [id, setId] = useState("");

    useEffect(() => {
        axios.get(API_URL+"/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setBalance(res.data.balance);
        })
    }, []);

    useEffect(() => {
        axios.get(API_URL+"/api/v1/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setFirstName(res.data.user.firstName);
            setId(res.data.user._id);
        })
    }, []);

    return (
        <div>
            <Suspense fallback={"loading..."}>
                <Appbar firstName={firstName}></Appbar>
                <div className="m-6">
                    <Balance value={balance}></Balance>
                    <Users id={id}/>
                </div>
            </Suspense>
        </div>
    );
};

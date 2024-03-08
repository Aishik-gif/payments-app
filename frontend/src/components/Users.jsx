import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../env"

export function Users({ id }) {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + "/api/v1/user/bulk?filter=" + filter, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUsers(response.data.user);
                setError(null);
            })
            .catch(() => {
                setError("Failed to fetch users.");
            });
    }, [filter]);

    return (
        <div className="m-6">
            <div className="text-red-500">{error}</div>
            <div className="mx-4 my-2 text-xl font-bold">Users</div>
            <input
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                type="text"
                placeholder="Search users..."
                className="border rounded-lg shadow-md mb-2 w-full px-6 py-2 border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <div className="w-full">
                {users.map((user) => {
                    if (user._id !== id) return <User key={user._id} user={user} />;
                })}
            </div>
        </div>
    );
}

export function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between py-2 px-4 border border-gray-200 shadow-md rounded-lg my-3 hover:bg-gray-300">
            <div className="flex justify-center items-center">
                <div className="font-medium rounded-full h-10 w-10 flex flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-500 mr-4 text-xl cursor-default">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div className="font-medium text-lg pr-1">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-grow-0 flex-shrink items-center">
                <Button
                    label={"Send Money"}
                    onClick={() => {
                        navigate(
                            "/send?id=" +
                                user._id +
                                "&name=" +
                                `${user.firstName} ${user.lastName}`
                        );
                    }}
                />
            </div>
        </div>
    );
}

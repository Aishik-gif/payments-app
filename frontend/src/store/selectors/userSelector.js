import axios from "axios";
import { selector } from "recoil";

export const userSelector = selector({
    key: "userSelector",
    get: async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/v1/user/me",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return res.data.user;
        } catch (err) {
            return {};
        }
    },
});


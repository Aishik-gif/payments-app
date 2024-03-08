import axios from "axios";
import { selector } from "recoil";
import { API_URL } from "../../env";

export const userSelector = selector({
    key: "userSelector",
    get: async () => {
        try {
            const res = await axios.get(
                API_URL+"/api/v1/user/me",
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


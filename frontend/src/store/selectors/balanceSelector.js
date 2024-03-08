import axios from "axios";
import { selector } from "recoil";
import { API_URL } from "../../env";

export const balanceSelector = selector({
    key: "balanceSelector",
    get: async () => {
        const res = await axios.get(API_URL+"/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data.balance;
    }
})
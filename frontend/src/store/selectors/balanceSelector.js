import axios from "axios";
import { selector } from "recoil";

export const balanceSelector = selector({
    key: "balanceSelector",
    get: async () => {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.data.balance;
    }
})
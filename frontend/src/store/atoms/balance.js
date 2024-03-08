import { atom } from "recoil";
import { balanceSelector } from "../selectors/balanceSelector";

export const balanceAtom = atom({
    key:"balanceAtom",
    default: balanceSelector
})
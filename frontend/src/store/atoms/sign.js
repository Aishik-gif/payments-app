import { atom } from "recoil";
import { userSelector } from "../selectors/userSelector";

export const firstNameAtom = atom({
    key: "firstNameAtom",
    default: ""
});

export const lastNameAtom = atom({
    key: "lastNameAtom",
    default: ""
});

export const usernameAtom = atom({
    key: "usernameAtom",
    default: ""
});

export const passwordAtom = atom({
    key: "passwordAtom",
    default: ""
});

export const userAtom = atom({
    key: "userAtom",
    default: userSelector
})

export const meAtom = atom({
    key: "meAtom",
    default: userSelector
})
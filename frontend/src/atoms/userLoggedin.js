import { atom } from "recoil";

const userLoggedin = atom({
	key: "userLoggedin",
	default: JSON.parse(localStorage.getItem("user-threads")),
});

export default userLoggedin;
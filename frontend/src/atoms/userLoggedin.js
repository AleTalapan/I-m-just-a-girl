import { atom } from "recoil";

const userLoggedin = atom({
	key: "userLoggedin",
	default: JSON.parse(localStorage.getItem("journal")),
});

export default userLoggedin;
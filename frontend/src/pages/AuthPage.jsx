import {useRecoilValue} from 'recoil';
import SignupCard from "./Signup";
import LoginCard from "./Login";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenAtom);
    return <>
     {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}
    </>;
};

export default AuthPage;
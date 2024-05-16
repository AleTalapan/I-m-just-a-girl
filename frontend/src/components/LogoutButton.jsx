import { Link } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";
import userLoggedin from "../atoms/userLoggedin";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userLoggedin);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("journal");
      setUser(null);
      navigate("/auth");
    } catch (error) {
      showToast("Error", error.toString(), "error");
    }
  };

  return (
    <Link onClick={handleLogout}>
      Log Out
    </Link>
  );
};

export default LogoutButton;

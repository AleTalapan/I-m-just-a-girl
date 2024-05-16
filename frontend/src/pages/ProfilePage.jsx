
import { Flex, Text} from "@chakra-ui/react";
//import { useParams } from "react-router-dom";
import Calendar from "../components/Calendar";
import UserHeader from "../components/UserHeader";
import useGetUserProfile from "../hooks/useGetUserProfile";


const ProfilePage = () => {
  const { user } = useGetUserProfile();//user-ul din link
  console.log(user);

if (!user) return;
  <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user}/>
      <Flex mt={"30px"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>User Journal</Text>
      </Flex>
      <Flex>
        <Calendar user={user} /> 
      </Flex>
    </>
  );
};

export default ProfilePage;

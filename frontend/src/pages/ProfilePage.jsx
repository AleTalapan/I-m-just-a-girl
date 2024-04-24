
import { useParams } from "react-router-dom";
import { Flex, Text} from "@chakra-ui/react";

import Calendar from "../components/Calendar";
import UserHeader from "../components/UserHeader";

const ProfilePage = () => {
  const { username } = useParams(); 

  return (
    <>
      <UserHeader/>
      <Flex mt={"30px"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>User Journal</Text>
      </Flex>
      <Flex>
        <Calendar username={username} /> {/*transmitem username de pe ProfilePage la calendar*/}
      </Flex>
    </>
  );
};

export default ProfilePage;

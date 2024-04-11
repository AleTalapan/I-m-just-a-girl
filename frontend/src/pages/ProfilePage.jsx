import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import Calendar from "../components/Calendar";
import UserHeader from "../components/UserHeader"

const ProfilePage = () => {
 
  return (
    <>
      <UserHeader/>
      
      <Flex mt={"30px"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>User Journal</Text>
      </Flex>
      <Flex>
        <Calendar />
       
      </Flex>
    </>
  );
};

export default ProfilePage;

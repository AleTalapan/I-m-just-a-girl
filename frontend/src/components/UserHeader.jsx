import { Link } from "react-router-dom";
import { Box, Flex, Text, Button,HStack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { RiAdminFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import userAtom from "../atoms/userAtom";

const UserHeader = ({user}) => {
  const noteText = "A part of today's journal note..";//trb s o iau din jurnal
  

  const currentUser = useRecoilValue(userAtom); 


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Box p="10">
        <Avatar
          name="John Doe"
          src="./assets/miau.png"
          size={{
            md: "xl",
          }}
        />
      </Box>

      <Box>
        <HStack>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
        John Doe
        </Text>

        {/* {user.isAdmin && (
        <RiAdminFill color="purple" />
      )} */} 
      {/* daca e admin ii va aparea coroana langa nume */}
      <RiAdminFill color="purple" />
        </HStack>
      
     
        <Text fontSize={"sm"}>johndoe</Text>
        <Text fontSize={"sm"}>biography</Text>

    {/* daca esti user-ul curent trb sa-ti apara edit profile si daca e alt user friend/unfriend */}

    {/* {currentUser && user &&  currentUser._id === user._id ?
    <Link to="/edit-profile">
      <Button mt={5} borderColor="black" bg="purple.200">Edit Profile</Button>
    </Link>
          :
    <Button mt={5} borderColor="black" bg="purple.200" onClick={handleFriendUnfriend} isLoading={updating}>
      {isFriend ? "Unfriend" : "Friend"}
    </Button>
    )}*/}
  

        <Link to="/edit-profile">
          <Button mt={5} borderColor="black" bg="purple.200">Edit Profile</Button>
        </Link>

      

        
      </Box>

      <Box ml={4}>
        <Box borderColor="black" height="200px" bg="green.200" borderWidth="1px" overflow="hidden" p={5}>
          <Text>{noteText}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserHeader;


import { Box, Link, Flex, Text,HStack,VStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { useToast, Button } from "@chakra-ui/react";
import User from "../../../backend/models/userModel";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { RiAdminFill } from "react-icons/ri";
import userLoggedin from "../atoms/userLoggedin";

const UserHeader = ({user}) => {

  const toast = useToast();
  const noteText = "A part of today's journal note..";//trb s o iau din jurnal

  const currentUser = useRecoilValue(userLoggedin); 
  console.log(user);

  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );

  console.log(user.followers);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();




  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Pls login to follow", "error");
      return;
    }

    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
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

      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }

      setFollowing(!following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/users/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      showToast("Success", data.message, "success");
      console.log(user);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Box p="10">
        <Avatar
          name="John Doe"
          src={user.profilePic}
          size={{
            md: "xl",
          }}
        />
      </Box>

      <Box>
        <HStack>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
        {user.name}
        </Text>

         {user.isAdmin && (
        <RiAdminFill color="purple" />
      )} 
        </HStack>

      <VStack alignItems={"center"}>
        <Text fontSize={"sm"}>{user.username}</Text>
        </VStack>

        {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button mt={5} borderColor="black" bg="purple.200">Edit Profile</Button>
        </Link>
      )}

      {currentUser?._id !== user._id && (
        <Button mt={5} borderColor="black" bg="purple.200" onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

<Box>
      {currentUser.isAdmin && currentUser?._id !== user._id && (
        <Button mt={5} borderColor="black" bg="red" colorScheme="red" onClick={handleDeleteUser} >
          Delete User
        </Button>
      )}
      </Box>
     
      </Box>
      

      <Box ml={4}>
        <Box borderColor="black"
        minHeight="200px"
        maxHeight="200px"
        width="200px"
        bg="green.200"
        borderWidth="1px" 
        overflow="auto"
        p={5}>
          <Text>{user.bio}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserHeader;

import { Link } from "react-router-dom";
import { Box, Flex, Text, Button,HStack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
// import { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";

const UserHeader = ({currentUser = null, user = null}) => {
  const noteText = "A part of today's journal note..";
  // const [loading, setLoading] = useState(true);
  // const [message, setMessage] = useState('');
  //   //const currentUser = useRecoilValue(userAtom); mai trb implementata..
  // const [isFriend, setFriendState] = useState(
  //   user.friends.includes(currentUser?._id)
  // );
  // const [updating, setUpdating] = useState(false);

  // const handleFriendUnfriend = async () => {
  //   if (!currentUser) {
  //     setMessage("Please login");
  //     return;
  //   }

  //   if (updating) return;
  //   setUpdating(true);
  //   try {
  //     const res = await fetch(`/api/users/friends/${user.username}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();

  //     if (data.error) {
  //       setMessage(`Error: ${data.error}`);
  //       return;
  //     }

  //     if (isFriend) {
  //       setMessage(`Removed ${user.name} from friendslist`);
  //       user.friends.pop();
  //     } else {
  //       setMessage(`Added ${user.name} to friendlist`);
  //       user.friends.push(currentUser?._id);
  //     }

  //     setFriendState(!isFriend);
  //   } catch (error) {
  //     setMessage(`Error: ${error.message}`);
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

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

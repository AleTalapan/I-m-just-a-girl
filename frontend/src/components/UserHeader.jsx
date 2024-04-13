import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";

const UserHeader = () => {
  const noteText = "A part of today's journal note..";
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
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          John Doe
        </Text>

        <Text fontSize={"sm"}>johndoe</Text>
        <Text fontSize={"sm"}>biography</Text>
        <Link to="/edit-profile">
          <Button mt={5} borderColor="black" bg="purple.200">Edit Profile</Button>
        </Link>
      </Box>

      <Box ml={4}>
          <Box borderColor="black" height="200px" bg="green.200" borderWidth="1px"  overflow="hidden" p={5}>
            <Text>{noteText}</Text>
          </Box>
        </Box>
      
    </Flex>
  );
};

export default UserHeader;

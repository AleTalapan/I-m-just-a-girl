import { Link as RouterLink } from 'react-router-dom';
import { VStack, Link } from '@chakra-ui/react';

const FriendsList = () => {
  return (
    <VStack
      pos="absolute"
      top="100%"
      left="150%"
      zIndex="1"
      border="1px"
      height="500px"
      width="300px"
      borderRadius="md"
      p={2}
      bg="purple.200"
    >
      <Link as={RouterLink} to="/friend1">
        Friend 1
      </Link>
      <Link as={RouterLink} to="/friend2">
        Friend 2
      </Link>
      <Link as={RouterLink} to="/friend3">
        Friend 3
      </Link>

      {/* {friends.map((friend, index) => (
        <Link key={index} as={RouterLink} to={`/friend/${friend.id}`}>
          {friend.name}
        </Link>
      ))} */} 
    </VStack>
  );
};

export default FriendsList;

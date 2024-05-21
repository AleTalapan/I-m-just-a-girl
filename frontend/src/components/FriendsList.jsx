import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, Link,Text,Box } from '@chakra-ui/react';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMutualFriends = async () => {
      try {
        const res = await fetch(`/api/users/mutual-friends`);  
        const data = await res.json();
        
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch mutual friends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMutualFriends();
  }, []); 

  if (!Array.isArray(friends)) {
    console.error("Expected an array, received:", friends);
    return <Text>Error loading mutual friends.</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }


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
    overflowY="auto"
  >
    {friends.length === 0 ? (
      <Text>You have no mutual followers. Try to connect to more!</Text>
    ) : (
      friends.map((friend) => (
        <Box key={friend._id} 
          border= '1px solid ' 
          borderRadius= '8px' 
          margin= '3px'
          padding= '10px' 
          backgroundColor= '#f9f9f9' 
        >
          <Link as={RouterLink} to={`/${friend.username}`} textDecoration= 'none' color= 'black' >
            {friend.name}
          </Link>
        </Box>
      ))
    )}
  </VStack>
  );
};

export default FriendsList;

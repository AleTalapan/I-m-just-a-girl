import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, Link,Text } from '@chakra-ui/react';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends'); 
        const data = await response.json();

        setFriends(data);

      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false); //nu afisam nimic pana nu-s datele incarcate toate
      }
    };
    fetchFriends();
  }, []); 

  if (loading) {
    return null; 
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
        <Text>You have no friends in your list. Add some.</Text>
      ) : (
        friends.map((friend) => (
          <Link key={friend.username} as={RouterLink} to={`/${friend.username}`}>
            {friend.name}
          </Link>
        ))
      )}
    </VStack>
  );
};

export default FriendsList;

import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Box, Text, VStack, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(""); // State to store the username input
    const showToast = useShowToast();
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/journal/feed");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast("Error", "Failed to fetch posts", "error");
            } finally {
                setLoading(false);
            }
        };
        getFeedPosts();
    }, []);

    const goToUserProfile = async () => {
        if (!username.trim()) return;
    
        try {
            const response = await fetch(`/api/users/profile/${username}`);
            if (response.ok) {
                const user = await response.json();
                navigate(`${username}`);
            } else {
                showToast("Error", "User does not exist", "error");
            }
        } catch (error) {
            showToast("Error", "Failed to check user", "error");
        }
    };
    

    return (
        <Flex direction="column" align="flex-start" p={4} w="full">
            <Flex direction="row" align="center" mb={4}> {/* Ensure it's set to row */}
    <Input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="md"
        mr={2} // Right margin to separate from button
        w={400} // Width set to 300px
    />
    <Button onClick={goToUserProfile}
        bg="purple.200"
        _hover={{ bg: '#6f00ff' }}
        borderRadius="md"
        borderWidth="1px"
        borderColor="black"
        disabled={!username}>
        Search
    </Button>
</Flex>

            {loading ? (
                <Spinner size="xl" />
            ) : (
                <>
                    {posts.length === 0 ? (
                        <Text fontSize="xl" textAlign="center">Follow some users to see the feed</Text>
                    ) : (
                        <Flex justify="center" w="full">
                            <VStack spacing={4} w="full">
                                {posts.map(post => (
                                    <Box key={post._id} p={5} shadow="md" borderWidth="2px" borderRadius="lg" bg="#bf8358" w="full">
                                        <Text fontSize="lg" fontFamily={'cursive'} >{post.entry}</Text>
                                        <Text fontSize="sm" fontFamily={'cursive'} >{`By: ${post.createdBy} on ${new Date(post.createdAt).toLocaleDateString()}`}</Text>
                                    </Box>
                                ))}
                            </VStack>
                        </Flex>
                    )}
                </>
            )}
        </Flex>
    );
};

export default HomePage;

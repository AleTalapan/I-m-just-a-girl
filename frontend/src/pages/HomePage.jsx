import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Box, Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

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

    return (
        <Flex direction="column" align="flex-start" p={4} w="full">
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <>
                    {posts.length === 0 ? (
                        <Text fontSize="xl" textAlign="center">Follow some users to see the feed</Text>
                    ) : (
                        <Flex justify="flex-start" w="full">
                            <VStack spacing={4} w="50%">
                                {posts.map(post => (
                                    <Box key={post._id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="#bf8358">
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

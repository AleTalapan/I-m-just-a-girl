import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
   useEffect(() => {
    const getFeedPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("api/journal/feed");

            const data = await res.json()
            console.log(data);
        } catch (error) {
            console.log("eroareeeeee");
        }finally{
            setLoading(false);
        }
    }
    getFeedPosts();
   }, [])
  
};

export default HomePage
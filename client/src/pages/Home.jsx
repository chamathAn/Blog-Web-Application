import { useEffect,useState } from "react";
import Post from "../Post";
import  axios  from "axios";

export default function Home() {
const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/post")
    .then((res) => {
      setPosts(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
    });
  },[]);
  return (
    <>
      {posts?.map((post) => (
        <Post key={post._id} {...post}  />
      ))}
    </>
  );
}

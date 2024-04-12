import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function ViewPost() {
  const [postInfo, setPostInfo] = useState({});

  const { image, title, summary, content, author, createdAt } = postInfo;

  console.log(author?.username);
  let { id } = useParams();
  useEffect(() => {
    axios
      .post("http://localhost:4000/post/" + id, null, { withCredentials: true })
      .then((res) => {
        setPostInfo(res.data);
      });
  }, []);
  console.log(postInfo);
  if (!postInfo) {
    return "";
  }
  const username = author ? author.username : "";
  return (
    <div className="viewPost">
      <div className="image">
        <img src={"http://localhost:4000/" + image} alt="" />;
      </div>

      <h1>{title}</h1>
      {postInfo ? (
        <time>{createdAt}</time>
      ) : (
        ""
      )}
      <div className="author">by @{author?.username}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} className="content" />
    </div>
  );
}

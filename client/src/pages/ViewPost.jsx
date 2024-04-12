import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";

export default function ViewPost() {
  const [postInfo, setPostInfo] = useState({});
  const {userInfo} = useContext(UserContext);

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

  if (!postInfo) {
    return "";
  }


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

      {userInfo.id === author?._id && (
        
        <div className="editRow">
          <Link to={`/post/${id}/edit`} className="edit-btn">
            Edit Post
          </Link>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} className="content" />
    </div>
  );
}

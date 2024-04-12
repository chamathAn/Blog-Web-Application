import React from 'react'
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

export default function Post({_id,title, summary, content, image, createdAt, author}) {
    return (<div className="post">
    <div className="image">
      <Link to={`/post/${_id}`} className="link">
      <img
        src={"http://localhost:4000/"+image}
        alt=""
      />
        </Link>
      
    </div>

    <div className="texts">
      <Link to={`/post/${_id}`} className="link">
      <h2>{title}</h2>
      </Link>
      
      <p className="info">
        <span className="author">{author.username}</span>
        <time>{<ReactTimeAgo date={createdAt} locale="en-US"/>}</time>
      </p>
      <p className="summary">
        {summary}
      </p>
    </div>
  </div>);
}
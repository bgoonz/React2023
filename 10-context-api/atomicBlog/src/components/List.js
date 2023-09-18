import React, { useContext } from "react";
import { usePosts } from "../context/PostContext";

function List() {
  const { posts } = usePosts()
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default List;

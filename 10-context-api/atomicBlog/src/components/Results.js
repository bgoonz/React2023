import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";

function Results() {
  const { posts } = useContext(PostContext);
  return <p>🚀 {posts.length} atomic posts found</p>;
}

export default Results;

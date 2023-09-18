import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";
import List from "./List";

function Posts() {
  const { posts } = useContext(PostContext);
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}
export default Posts;

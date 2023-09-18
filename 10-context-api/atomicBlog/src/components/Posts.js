import React, { useContext } from "react";
import { usePosts } from "../context/PostContext";
import List from "./List";

function Posts() {
  const { posts } = usePosts()
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}
export default Posts;

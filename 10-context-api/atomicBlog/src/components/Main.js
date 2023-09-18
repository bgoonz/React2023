import React, { useContext } from "react";
import Posts from "./Posts";
import FormAddPost from "./FormAddPost";
import { PostContext } from "../App";

function Main() {
    const { posts, onAddPost } = useContext(PostContext);
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}
export default Main;

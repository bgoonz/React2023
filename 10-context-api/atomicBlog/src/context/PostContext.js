import { useState, createContext, useContext } from "react";
import { createRandomPost } from "./../utils/CreateRandomPost";
const PostContext = createContext();

function PostProvider({ children }) {
  // The callback function to useState is only called once, when the component is first rendered.
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost()),
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  let searchedPosts;
  if (searchQuery.length > 0) {
    searchedPosts = posts.filter((post) =>
      `${post.title} ${post.body}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  } else {
    searchedPosts = posts;
  }

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}

export { PostProvider, usePosts };

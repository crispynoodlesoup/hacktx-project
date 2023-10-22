import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
  const name = localStorage.getItem("user")
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://hacktxserver.fly.dev/getPosts");
      if(response.ok){
        const data = await response.json();
        setPosts(data);
        console.log(data)
      }else{
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts: " + error)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="Home">
      <nav>
        <ul>
          <Link to="../home">
            <li className="selected-page">Home</li>
          </Link>
          <Link to="../messages">
            <li>Messages</li>
          </Link>
          <Link to="../profile">
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
      <main className="home-page">
        <section className="forum-header">
          <h2>Welcome back {name}!</h2>
          <div className="account-div">
            <p>{name}</p>
            <div className="pfp"></div>
          </div>
        </section>
        <section className="forum">
          <div className="posts">
              {posts.map((post) => (
                <div className="user-post" key={post._id.$oid}>
                  <h3>{post.title}</h3>
                  <h5>From: {post.user}</h5>
                  <p>{post.content}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

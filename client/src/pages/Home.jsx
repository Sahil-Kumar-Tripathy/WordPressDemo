import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts?per_page=10")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>WordPress Headless Blog</h1>

      {posts.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}>
          <h2>
            <Link to={`/post/${p.id}`}>{p.title.rendered}</Link>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
        </div>
      ))}
    </div>
  );
}

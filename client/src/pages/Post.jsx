import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", body: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((res) => setPost(res.data));
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    axios.get(`http://localhost:5000/api/comments?postId=${id}`).then((res) => setComments(res.data));
  };

  const submitComment = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/comments", { postId: Number(id), ...form })
      .then(() => {
        setForm({ name: "", email: "", body: "" });
        fetchComments();
      });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Link to="/">← Back</Link>

      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      <hr />
      <h2>Comments</h2>

      {comments.map((c) => (
        <div key={c._id} style={{ marginBottom: "10px" }}>
          <strong>{c.name}</strong> <small>{new Date(c.createdAt).toLocaleString()}</small>
          <p>{c.body}</p>
        </div>
      ))}

      <h3>Add Comment:</h3>
      <form onSubmit={submitComment}>
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Comment"
          required
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <br />
        <button type="submit">Post comment</button>
      </form>
    </div>
  );
}

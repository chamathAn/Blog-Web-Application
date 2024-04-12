import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost() {
  const navigate = useNavigate();

  let { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post("http://localhost:4000/post/" + id);

      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
    }
    fetchData();
  }, []);

  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) data.append("file", file);

    const res = await axios.put(
      "http://localhost:4000/post/" + id + "/edit",
      data,
      { withCredentials: true }
    );
    if (res.data) {
      setRedirect(true);
    }

    if (redirect) {
        alert("Post updated successfully");
      navigate("/post/" + id);
    }
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />{" "}
      {/* Use files[0] to get the first file */}
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
      <button type="submit" style={{ marginTop: "5px" }}>
        Update Post
      </button>
    </form>
  );
}

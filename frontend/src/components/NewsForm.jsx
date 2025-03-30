import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const NewsManagement = () => {
    const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
  });
  const [editingNews, setEditingNews] = useState(null);

  // ✅ Fetch all news articles when the page loads
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/news");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // ✅ Handle form submission (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        const response = await axios.put(
          `http://localhost:5001/api/news/${editingNews._id}`,
          formData
        );
        setNews(news.map((n) => (n._id === response.data._id ? response.data : n)));
      } else {
        const response = await axios.post("http://localhost:5001/api/news", formData);
        setNews([...news, response.data]);
      }

      setEditingNews(null);
      setFormData({ title: "", content: "", author: "", category: "" });
    } catch (error) {
      alert("Failed to save news.");
      console.error(error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/news/${id}`);
      setNews(news.filter((n) => n._id !== id));
    } catch (error) {
      alert("Failed to delete news.");
      console.error(error);
    }
  };

  // ✅ Handle Edit (Populate form)
  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      author: newsItem.author,
      category: newsItem.category,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{editingNews ? "Edit News" : "Create News"}</h1>
      
      {/* ✅ News Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {editingNews ? "Update News" : "Create News"}
        </button>
      </form>

      {/* ✅ Display List of News */}
      <h2 className="text-xl font-bold mb-4">News Articles</h2>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n) => (
            <div key={n._id} className="bg-white p-4 shadow-md rounded">
              <h3 className="text-lg font-bold">{n.title}</h3>
              <p>{n.content}</p>
              <p className="text-sm text-gray-500">By: {n.author} | Category: {n.category}</p>
              <div className="flex mt-2">
                <button onClick={() => handleEdit(n)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(n._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsManagement;

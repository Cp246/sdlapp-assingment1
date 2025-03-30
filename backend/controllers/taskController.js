const News = require('../models/newsmodel');

// Get All News Articles (Read)
const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a News Article (Create)
const addNews = async (req, res) => {
    const { title, content, author, category } = req.body;
    try {
        const news = await News.create({ title, content, author, category });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a News Article
const updateNews = async (req, res) => {
    const { title, content, author, category } = req.body;
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News article not found' });

        news.title = title || news.title;
        news.content = content || news.content;
        news.author = author || news.author;
        news.category = category || news.category;

        const updatedNews = await news.save();
        res.json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a News Article
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News article not found' });

        await news.remove();
        res.json({ message: 'News article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNews, addNews, updateNews, deleteNews };

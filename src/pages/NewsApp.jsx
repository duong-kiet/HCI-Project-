import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsApp = () => {
  // State để lưu trữ các tin tức
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const apiKey = 'pub_61145b000d3d25cdb1318e1cceb3dd6cf3c19'; 
  const url = 'https://newsdata.io/api/1/latest';

  // Hàm gọi API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
            `${url}?apikey=${apiKey}&language=vi&country=vi`
        );
        setNews(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);  // [] để chỉ chạy khi component được mount lần đầu

  return (
    <div>
      <h1>Latest News</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {news.length > 0 ? (
          <ul>
            {news.map((article, index) => (
              <li key={index}>
                <h3>{article.title}</h3>
                {article.image_url && <img src={article.image_url} alt={article.title} />}
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default NewsApp;

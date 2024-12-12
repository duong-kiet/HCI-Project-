// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Newspaper = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiKey = "759ca505c83140efa8d7ec3c97f879d2"; // Replace with your NewsAPI key

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://newsapi.org/v2/everything?q=rich&from=2024-12-01&sortBy=publishedAt&limit=10&apiKey=${apiKey}`
//         );
//         setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch news articles.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>Latest News</h1>
//       {data?.articles?.length > 0 ? (
//         data.articles.map((article, index) => (
//           <div key={index} style={{ marginBottom: "20px" }}>
//             <h2>{article.author}</h2>
//             <img src={article.urlToImage} alt={article.title} />
//             <h3>{article.title}</h3>
//             <p>{article.description}</p>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">
//               Read More
//             </a>
//           </div>
//         ))
//       ) : (
//         <p>No articles found.</p>
//       )}
//     </div>
//   );
// };

// export default Newspaper;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsApp = () => {
  // State để lưu trữ các tin tức
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const apiKey = 'pub_61145b000d3d25cdb1318e1cceb3dd6cf3c19';  // Thay API key của bạn vào đây
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

async function fetchNews() {
  const apiKey = 'YOUR_MEDIASTACK_API_KEY'; 
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=weather&languages=en&limit=6`; // Endpoint Mediastack
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      const newsContainer = document.getElementById('news');
      
      if (data.data && data.data.length > 0) { // Mediastack menempatkan artikel dalam `data`
          const row = document.createElement('div');
          row.className = 'news-row';
          
          data.data.forEach((article, index) => {
              const newsItem = document.createElement('div');
              newsItem.className = 'news-item';
              newsItem.innerHTML = `
                  <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                  <p>${article.description || 'No description available.'}</p>
              `;
              row.appendChild(newsItem);
              
              if ((index + 1) % 3 === 0) {
                  newsContainer.appendChild(row.cloneNode(true));
                  row.innerHTML = '';
              }
          });
          
          if (row.innerHTML !== '') {
              newsContainer.appendChild(row);
          }
      } else {
          newsContainer.innerHTML = '<p>No news available</p>';
      }
  } catch (error) {
      console.error('Error fetching news:', error);
      document.getElementById('news').innerHTML = '<p>Error fetching news. Please try again later.</p>';
  }
}

// Call fetchNews on page load
fetchNews();

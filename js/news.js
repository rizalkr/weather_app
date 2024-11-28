// Fetch and display news
async function fetchNews() {
    const apiKey = '5918ef80d06047b98441879799d3570c';
    const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const newsContainer = document.getElementById('news');
  
    if (data.articles) {
      const row = document.createElement('div');
      row.className = 'news-row';
      data.articles.slice(0, 6).forEach((article, index) => { // Limit to 6 articles
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description}</p>
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
}
  
// Call fetchNews on page load
fetchNews();

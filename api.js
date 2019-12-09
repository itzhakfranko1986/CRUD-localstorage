(() => {
  const apiKey = 'b0e16dacb2be405388bb6a2d84d1d09d';

  const menu = document.querySelector('select');
  const sectionNews = document.querySelector('.section-news');

  menu.innerHTML = renderOptions();

  configRequest(menu[0].value);

  menu.addEventListener('change', () => {
    const query = menu.options[menu.selectedIndex].value;
    sectionNews.innerHTML = '';
    configRequest(query);
  });

  function configRequest(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=pt&apiKey=${apiKey}`;

    fetch(url)
      .then(res => {
        res
          .text()
          .then(result =>
            JSON.parse(result).articles.map(
              news => (sectionNews.innerHTML += renderNews(news))
            )
          );
      })
      .catch(e => {
        console.log(e);
      });
  }

  function renderOptions() {
    const categories = JSON.parse(window.localStorage.getItem('categories'));

    return categories.map(
      category => `
        <option value="${category.category}">${category.menuName}</option>
      `
    );
  }

  function renderNews(news) {
    return ` <article class="card" id="article">

    <img class="card__image" src="${
      news.urlToImage
        ? news.urlToImage
        : 'https://www.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    }"/>
    <div>
      <h2 class="card__title">${news.title}</h2>
      <p class="card__description">${
        news.description ? news.description : ''
      }</p>
    </div>
    <p class="card__author"> ${news.author ? news.author : 'Desconhecido'}</p>
    </article>
    `;
  }
  renderOptions();
})();

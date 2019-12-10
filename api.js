(() => {
    const apiKey = "b0e16dacb2be405388bb6a2d84d1d09d";

    const menu = document.querySelector("select");
    const sectionNews = document.querySelector(".section-news");
    const spinner = document.querySelector(".fa-spinner");

    menu.innerHTML = renderOptions();

    configRequest(menu[0].value);

    menu.addEventListener("change", () => {
        const query = menu.options[menu.selectedIndex].value;
        sectionNews.innerHTML = "";
        configRequest(query);
    });

    function configRequest(query) {
        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=pt&apiKey=${apiKey}`;
        loading();

        fetch(url)
            .then((res) => {
                res.text().then((result) =>
                    JSON.parse(result).articles.map(
                        (news, index) =>
                            (sectionNews.innerHTML += renderNews(news, index))
                    )
                );
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function renderOptions() {
        const categories = JSON.parse(
            window.localStorage.getItem("categories")
        );

        return categories.map(
            (category) => `
        <option value="${category.category}">${category.menuName}</option>
      `
        );
    }

    function renderNews(news, id) {
        return ` <article class="card" id="article">
        <div class="count-news">
            <span>${id + 1}</span>
        </div>
        <div>

    <img class="card__image" src="${
        news.urlToImage
            ? news.urlToImage
            : "https://www.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg"
    }"/>
    <div class="card-infos">
      <h2 class="card__title">${news.title}</h2>
      <p class="card__description">${
          news.description ? news.description : ""
      }</p>
      <p class="card__author"> ${news.author ? news.author : "Desconhecido"}</p>

    </div>
        </div>
    </article>
    `;
    }

    function loading() {
        spinner.classList.add("show");
        setTimeout(() => {
            spinner.classList.remove("show");
        }, 500);
    }
    renderOptions();
})();

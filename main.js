(() => {
    const inputMenu = document.querySelector('[data-form="name-menu"]');
    const inputCategory = document.querySelector('[data-form="category"]');
    const tableBody = document.querySelector(".tbody");
    const form = document.querySelector(".form");
    const btnEdit = document.querySelector(".form__btn-edit");
    let currentDB;
    let categories = JSON.parse(window.localStorage.getItem("categories"))
        ? JSON.parse(window.localStorage.getItem("categories"))
        : [];

    showCategories();
    form.addEventListener("submit", handleSubmit);

    btnEdit.addEventListener("click", editItem);
    function createCategory({ id, menuName, category }) {
        return { id, menuName, category };
    }

    function clearInputs() {
        inputMenu.value = "";
        inputCategory.value = "";
    }

    function generateID() {
        return (
            "_" +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
    }

    function generateListHTML() {
        if (categories) {
            return categories
                .map(
                    (menu) =>
                        `
          <tr class="table-row">
            <td><span>${menu.menuName}</span></td>
            <td><span>${menu.category}</span></td>
            <td>
              <button onclick="onRemoveCategory(event)" class="btn-remove"><span id="${menu.id}" class="fas fa-trash"></span>
              </button>
            </td>
            <td>
              <button onclick="onEditCategory(event)" class="btn-edit">
                <span data-id="${menu.id}" class="fas fa-pen-square"></span>
              </button>
            </td>
          </tr>
      `
                )
                .join("");
        }
    }

    function showCategories() {
        tableBody ? (tableBody.innerHTML = generateListHTML()) : null;
    }

    function handleSubmit() {
        event.preventDefault();

        categories.push(
            createCategory({
                id: generateID(),
                menuName: inputMenu.value,
                category: inputCategory.value
            })
        );
        setItemLS(categories);
        showCategories();
        clearInputs();
        inputMenu.focus();
    }

    function setItemLS(db) {
        window.localStorage.setItem("categories", JSON.stringify(db));
    }

    function editItem() {
        console.log(currentDB);
        categories.find((menu) => menu.id === currentDB[0].id).menuName =
            inputMenu.value;
        categories.find((menu) => menu.id === currentDB[0].id).category =
            inputCategory.value;
        setItemLS(categories);
        showCategories();
        clearInputs();
        inputMenu.focus();
    }

    window.onRemoveCategory = (e) => {
        const currentItems = categories.filter(
            (menu) => menu.id !== e.target.id
        );
        window.localStorage.removeItem("categories");

        setItemLS(currentItems);

        categories = JSON.parse(window.localStorage.getItem("categories"));
        showCategories();
    };

    window.onEditCategory = (e) => {
        const currentItem = categories.filter(
            (menu) => menu.id === e.target.dataset.id
        );
        inputCategory.value = currentItem[0].category;
        inputMenu.value = currentItem[0].menuName;
        return (currentDB = currentItem);
    };
})();

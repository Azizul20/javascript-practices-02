
const searchMeal = () => {
    document.getElementById('search').addEventListener("click", event = () => {
        const searchField = document.getElementById('searchField');
        const searchText = searchField.value;
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => console.log(error));
    });
}

const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('searchResult');
    if (meals === null) {
        searchResult.innerHTML = `
            <h3 class="textCenter">No meal found</h3>
        `;
    }
    else {
        searchResult.innerHTML = '';
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('card-container');
            div.innerHTML = `
                    <div onclick="loadMealDetail(${meal.idMeal})" class="card card-beauty">
                        <img src="${meal.strMealThumb}" class="card-img">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                    `;
            searchResult.appendChild(div);
        });
    }

}

const loadMealDetail = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
        .catch(error => console.log(error));
}
// ${meal.strIngredient1 ? ` <li>${meal.strIngredient1}</li>` : ""}
const displayMealDetail = (meal) => {
    const mealDetail = document.getElementById('mealDetail');
    mealDetail.innerHTML = `
        <div class="card-detail">
            <img src="${meal.strMealThumb}" class="card-img-detail">
                <h5 class="card-title-detail">${meal.strMeal}</h5>
                <p class="card-title-detail">Ingredients</p>
                <ul>
                    ${IngredientList(meal)}
                </ul>
        </div>
    `;
}

const IngredientList = (meal) => {
    let ingredientList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            ingredientList += `<li>${ingredient}</li>`;
        }
    }
    return ingredientList;
}

searchMeal();
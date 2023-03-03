const searchBar = document.querySelector("#searchBar");

function searchRecipesLoop(recipes, searchParams) {
  const { search, ingredients, ustensils, appliance } = searchParams;
  const results = [];

  for (const recipe of recipes) {
    let matchedIngredients = true;
    let matchedUstensils = true;

    if (search) {
      const searchTerms = search.toLowerCase().split(" ");
      let matchedSearchTerms = 0;

      for (const term of searchTerms) {
        if (
          recipe.name.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term)
        ) {
          matchedSearchTerms++;
        }
      }

      if (matchedSearchTerms !== searchTerms.length) {
        continue;
      }
    }

    if (ingredients) {
      for (const ingredient of ingredients) {
        let matchedIngredient = false;

        for (const recipeIngredient of recipe.ingredients) {
          if (
            recipeIngredient.ingredient
              .toLowerCase()
              .includes(ingredient.toLowerCase())
          ) {
            matchedIngredient = true;
            break;
          }
        }

        if (!matchedIngredient) {
          matchedIngredients = false;
          break;
        }
      }

      if (!matchedIngredients) {
        continue;
      }
    }

    if (ustensils) {
      for (const ustensil of ustensils) {
        let matchedUstensil = false;
        for (const recipeUstensil of recipe.ustensils) {
          if (recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())) {
            matchedUstensil = true;
            break;
          }
        }
        if (!matchedUstensil) {
          matchedUstensils = false;
          break;
        }
      }
      if (!matchedUstensils) {
        continue;
      }
    }

    if (
      appliance &&
      !recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
    ) {
      continue;
    }

    results.push(recipe);
  }

  return results;
}

let searchParams = {
  search: "",
  ingredients: [],
  ustensils: [],
  appliance: "",
};

let globalRecipesFilters = {
  ingredients: [],
  ustensils: [],
  appliance: [],
};

function searchRecipe() {
  console.time("searchRecipe");
  const result = searchRecipesLoop(recipes, searchParams);
  globalRecipesFilters.ingredients = [];
  globalRecipesFilters.ustensils = [];
  globalRecipesFilters.appliance = [];
  result.forEach((element) => {
    const card = new Recipe(element);
    const cardHTML = card.getHTML();
    document.querySelector(".cardList").innerHTML += cardHTML;
    let ingredients = card.getIngredientsList();
    let ustentils = card.getUstensilsList();
    let appliance = card.getAppliance();
    ingredients.forEach((element) => {
      if (!globalRecipesFilters.ingredients.includes(element)) {
        globalRecipesFilters.ingredients.push(element);
      }
    });
    ustentils.forEach((element) => {
      if (!globalRecipesFilters.ustensils.includes(element)) {
        globalRecipesFilters.ustensils.push(element);
      }
    });
    if (!globalRecipesFilters.appliance.includes(appliance)) {
      globalRecipesFilters.appliance.push(appliance);
    }
  });
  updateFiltersList();
  console.timeEnd("searchRecipe");
}
function updateFiltersList() {
  let menuFilters = document.querySelectorAll(".filterContent");
  menuFilters.forEach((element) => {
    let dataId = element.dataset.id;
    let elementList = element.querySelector(".filterList");
    elementList.innerHTML = "";
    switch (dataId) {
      case "ingredient":
        globalRecipesFilters.ingredients.forEach((element) => {
          if (searchParams.ingredients.includes(element)) return;
          let html = `<div class="filterName" data-id="ingredient">${element}</div>`;
          elementList.innerHTML += html;
        });
        break;
      case "ustensile":
        globalRecipesFilters.ustensils.forEach((element) => {
          if (searchParams.ustensils.includes(element)) return;
          let html = `<div class="filterName" data-id="ustensile">${element}</div>`;
          elementList.innerHTML += html;
        });
        break;
      case "appareil":
        globalRecipesFilters.appliance.forEach((element) => {
          if (searchParams.appliance.includes(element)) return;
          let html = `<div class="filterName" data-id="appareil">${element}</div>`;
          elementList.innerHTML += html;
        });
        break;
    }
  });
  document.querySelectorAll(".filterName").forEach((filterName) => {
    filterName.addEventListener("click", (e) => {
      let name = e.target.innerText;
      let type = e.target.dataset.id;

      e.target.parentElement.parentElement.querySelector(".filterInput").value =
        "";
      addFilter(name, type);
    });
  });
}

searchBar.addEventListener("keyup", (e) => {
  if (e.target.value.length < 3) {
    searchParams.search = "";
  } else {
    searchParams.search = e.target.value;
  }
  document.querySelector(".cardList").innerHTML = "";
  searchRecipe();
});

function addFilter(name, type) {
  const filteredItem = document.querySelector(".filtered");
  const html = `
    <div class="filteredItem ${type}">
          <div class="filteredName">${name}</div>
          <i class="delFiltered far fa-times-circle"></i>
        </div>
        `;
  filteredItem.innerHTML += html;
  switch (type) {
    case "ingredient":
      searchParams.ingredients.push(name);
      break;
    case "ustensile":
      searchParams.ustensils.push(name);
      break;
    case "appareil":
      searchParams.appliance = name;
      break;
  }
  document.querySelector(".cardList").innerHTML = "";
  searchRecipe();
  document.querySelectorAll(".delFiltered").forEach((delFiltered) => {
    delFiltered.addEventListener("click", (e) => {
      let name = e.target.previousElementSibling.innerText;
      let type = e.target.parentElement.classList[1];
      removeFilter(name, type);

      e.target.parentElement.remove();
    });
  });
}

function removeFilter(name, type) {
  switch (type) {
    case "ingredient":
      searchParams.ingredients = searchParams.ingredients.filter(
        (item) => item !== name
      );
      break;
    case "ustensile":
      searchParams.ustensils = searchParams.ustensils.filter(
        (item) => item !== name
      );
      break;
    case "appareil":
      searchParams.appliance = "";
      break;
  }
  document.querySelector(".cardList").innerHTML = "";
  searchRecipe();
}

searchRecipe();

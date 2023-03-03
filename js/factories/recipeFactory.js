class Recipe {
  constructor(...data) {
    this.datas = data;
  }

  getIngredientsToHTML() {
    let html = "";
    this.datas[0].ingredients.forEach((element) => {
      let unit;
      let quantity;
      if (element.unit === undefined) {
        unit = "";
      } else {
        unit = element.unit;
      }
      if (element.quantity === undefined) {
        quantity = "";
      } else {
        quantity = element.quantity;
      }
      html += `<div class="cardIngredient"><b style="font-weight: bolder;">${
        element.ingredient
      }</b> ${quantity + " " + unit}</div>`;
    });
    return html;
  }

  getHTML() {
    const html = `
        <div class="card">
          <div class="cardTop"></div>
          <div class="cardContent">
            <div class="cardContentTop">
              <div class="cardTitle">${this.datas[0].name}</div>
              <div class="cardTime"><i class="far fa-clock"></i>${
                this.datas[0].time
              } min</div>
            </div>
            <div class="cardContentDown">
              <div class="cardIngredients">${this.getIngredientsToHTML()}</div>
              <div class="cardTuto">
              ${this.datas[0].description}
              </div>
            </div>
          </div>
        </div>
        `;
    return html;
  }
  getUstensilsList() {
    let list = [];
    this.datas[0].ustensils.forEach((element) => {
      list.push(element.toLowerCase());
    });
    return list;
  }
  getIngredientsList() {
    let list = [];
    this.datas[0].ingredients.forEach((element) => {
      list.push(element.ingredient.toLowerCase());
    });
    return list;
  }
  getAppliance() {
    return this.datas[0].appliance.toLowerCase();
  }
}

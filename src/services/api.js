export async function getCategories() {
  const categoriesML = await (await fetch('https://api.mercadolibre.com/sites/MLB/categories')).json();
  return categoriesML;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const queryAndCategorieML = await (await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}q=${query}`)).json();
  return queryAndCategorieML;
}

export async function getProductsFromQuery(query) {
  const queryML = await (await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query} `)).json();
  return queryML.results;
}

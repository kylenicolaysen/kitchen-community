const createRecipe = async (input) => {
  const ingredients = input.ingredients
  const directions = input.directions
  return { ingredients, directions }
}

module.exports = createRecipe
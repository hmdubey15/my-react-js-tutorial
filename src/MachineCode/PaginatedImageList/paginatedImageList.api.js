export const fetchRecipes = async ({ skip = 0, limit = 10 } = { skip: 0, limit: 10 }) => {
  const res = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}&select=name,image`);
  const data = await res.json();
  return data;
};

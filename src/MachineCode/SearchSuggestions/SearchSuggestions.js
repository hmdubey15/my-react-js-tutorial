import React, { useCallback, useEffect, useState } from "react";

const fetchRecipesApiCall = async (searchText) => {
  const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchText}`);
  const data = (await response.json()).recipes;
  return data;
};

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const SearchSuggestions = () => {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    debounce(async () => {
      setRecipes(await fetchRecipesApiCall(searchText));
    }, 1000)();
  }, [searchText]);

  const handleTextInput = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  return (
    <>
      <h1>Search Suggestions</h1>
      <input type="text" onChange={handleTextInput} value={searchText} />
      {recipes.map((recipe) => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
    </>
  );
};

export default SearchSuggestions;

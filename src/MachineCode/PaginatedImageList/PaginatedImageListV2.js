import React, { useEffect, useState, useRef } from 'react';

import { fetchRecipes } from './paginatedImageList.api';
import { FETCH_LIMIT } from './paginatedList.constants';

import './paginatedImageList.css';

const PaginatedImageListV2 = () => {
  const [recipes, setRecipes] = useState([]);

  const skipDataRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    (async () => {
      setRecipes((await fetchRecipes({ skip: 0, limit: FETCH_LIMIT })).recipes);
      skipDataRef.current = FETCH_LIMIT;
    })();
  }, []);

  useEffect(() => {
    containerRef.current.addEventListener('scroll', () => {
      const scrollPos = containerRef.current.scrollLeft + containerRef.current.clientWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      if (scrollPos === scrollWidth && skipDataRef.current != null) {
        (async () => {
          const newData = await fetchRecipes({ skip: skipDataRef.current, limit: FETCH_LIMIT });
          setRecipes((prevRecipes) => {
            const newRecipesList = [...prevRecipes, ...newData.recipes];
            skipDataRef.current = newRecipesList.length >= newData.total ? null : newRecipesList.length;
            return newRecipesList;
          });
        })();
      }
    });
  }, []);

  return (
    <div className="container" ref={containerRef}>
      {recipes.map((recipe) => (
        <img width="300px" src={recipe?.image} alt="recipe" key={recipe?.id} />
      ))}
    </div>
  );
};

export default PaginatedImageListV2;

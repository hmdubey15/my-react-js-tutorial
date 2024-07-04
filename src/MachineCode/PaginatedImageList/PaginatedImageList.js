import React, { useEffect, useState, useRef, useCallback } from 'react';

import { fetchRecipes } from './paginatedImageList.api';
import { FETCH_LIMIT } from './paginatedList.constants';

import './paginatedImageList.css';

const PaginatedImageList = () => {
  const [recipes, setRecipes] = useState([]);

  const skipDataRef = useRef(0);
  const observerRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    (async () => {
      setRecipes((await fetchRecipes({ skip: 0, limit: FETCH_LIMIT })).recipes);
      skipDataRef.current = FETCH_LIMIT;
    })();
  }, []);

  const lastElementRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && skipDataRef.current != null) {
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
    if (node) {
      // Adding this event listener is necessary because all images with 0 width will be visible on component mount
      node.addEventListener('load', () => {
        observerRef.current.observe(node);
      });
    }
  }, []);

  return (
    <div className="container">
      {recipes.map((recipe, index) => (
        // 🌟 WRAP IMAGES IN DIV OF FIXED WIDTH IF YOU DON'T WANT TO ATTACH LOAD EVENT LISTENER ON LAST IMAGES
        <img
          ref={recipes.length === index + 1 ? lastElementRef : null}
          width="300px"
          src={recipe?.image}
          alt="recipe"
          key={recipe?.id}
          data-img-seq={index}
        />
      ))}
    </div>
  );
};

export default PaginatedImageList;

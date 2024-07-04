import { useCallback, useState } from 'react';

import './selectBox.css';
import { fetchRecipes } from './selectBox.api';

interface Item {
  id: number;
  name: string;
  image: string;
}

function SelectBox() {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [selectedItemsIndex, setSelectedItemsIndex] = useState<Item[]>([]);

  const handleClick = useCallback(async () => {
    try {
      const response = await fetchRecipes();
      const recipes = response.recipes;
      setItemsList(recipes);
    } catch (err) {
      setItemsList([]);
      console.error(err);
    }
  }, []);

  const handleClickItem = (clickedItem: Item) => () => {
    setSelectedItemsIndex(prevArr => [...prevArr, clickedItem]);
    setItemsList(prevList => prevList.filter(item => item.id !== clickedItem.id))
  };

  return (
    <div className="container">
      <div className="input-container">
        {selectedItemsIndex.map((item) => (
          <div className="selected-item item" key={item.id}>
            <span>{item.name}</span>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
        <input onClick={handleClick} />
      </div>

      <ul>
        {itemsList.map((item, index) => (
          <li key={item.id} role="button" onClick={handleClickItem(item)} className="item">
            <span>{item.name}</span>
            <img src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBox;

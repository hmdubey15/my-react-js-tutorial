import './autoCompleteContainer.css';
import AutoComplete from './components/AutoComplete';

function AutoCompleteContainer() {
  const fetchSuggestions = async (query: string) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div className="autocomplete-app-container">
      <h1>Auto Complete / Typeahead</h1>
      <AutoComplete placeholder="Enter test" fetchSuggestions={fetchSuggestions} />
    </div>
  );
}

export default AutoCompleteContainer;

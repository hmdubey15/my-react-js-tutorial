import { RecipeItems } from '../AutoComplete/AutoComplete';

import './searchSuggestions.css';

interface SearchSuggestionsProps {
  error: string;
  isLoading: Boolean;
  itemsList: RecipeItems[];
}

const SearchSuggestions = ({ error, isLoading, itemsList }: SearchSuggestionsProps) => {
  return (
    <ul className="search-suggestions-container">
      {error.length !== 0 ? <>Error: {error}</> : isLoading ? <>Loading...</> : itemsList.map(({ name, id }) => <li key={id}>{name}</li>)}
    </ul>
  );
};

export default SearchSuggestions;

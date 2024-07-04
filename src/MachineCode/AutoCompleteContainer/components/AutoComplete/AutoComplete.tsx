import { useState, useMemo, ChangeEvent, useCallback } from 'react';
import './autoComplete.css';
import SearchSuggestions from '../SearchSuggestions';

interface AutoCompleteProps {
  placeholder: string;
  fetchSuggestions: (query: string) => Promise<RecipeItems[]>;
}

export interface RecipeItems {
  name: string;
  id: number;
  [key: string | number]: any;
}

function debounce(callback: (...callbackArgs: any[]) => any, timeIv = 1000) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, timeIv);
  };
}

const AutoComplete = ({ placeholder, fetchSuggestions }: AutoCompleteProps) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [itemsList, setItemsList] = useState<RecipeItems[]>([]);

  const debouncedFetchList = useMemo(() => debounce(async (textEntered) => {
    setIsLoading(true);
    fetchSuggestions(textEntered)
      .then((res) => {
        setItemsList(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }), [fetchSuggestions]);

  const handleInputTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const textEntered = event.target.value;
      setInputText(textEntered);
      debouncedFetchList(textEntered);
    },
    [debouncedFetchList]
  );

  return (
    <div>
      <input placeholder={placeholder} onChange={handleInputTextChange} value={inputText} className="input-field" />
      <SearchSuggestions error={error} isLoading={isLoading} itemsList={itemsList} />
    </div>
  );
};

export default AutoComplete;

import { useCallback, useState } from 'react';

import TABLE_DATA from './tableData.json';

const ONE_PAGE_DATA = 5;
const DATA_SIZE = TABLE_DATA.length;
const NUM_OF_PAGES = Math.floor(DATA_SIZE / ONE_PAGE_DATA) + 1;
const PAGINATION_BUTTON_TYPES = {
  NEXT: 'next',
  PREV: 'prev',
};

function PaginatedTable() {
  const [tableData, setTableData] = useState(() => TABLE_DATA.slice(0, ONE_PAGE_DATA));
  const [curPage, setCurPage] = useState(1);

  const handlePaginationClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLButtonElement;
      const btnClicked = target.dataset.pageBtn;
      let newPage = curPage;
      if (btnClicked === PAGINATION_BUTTON_TYPES.PREV) newPage = Math.max(1, curPage - 1);
      else if (btnClicked === PAGINATION_BUTTON_TYPES.NEXT) newPage = Math.min(NUM_OF_PAGES, curPage + 1);
      setCurPage(newPage);
      setTableData(TABLE_DATA.slice(ONE_PAGE_DATA * (newPage - 1), Math.min(ONE_PAGE_DATA * newPage, DATA_SIZE)));
    },
    [curPage]
  );

  return (
    <div className="main-container">
      <table>
        <caption>Paginated Table Data</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Occupation</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" role="button" onClick={handlePaginationClick}>
        <button data-page-btn={PAGINATION_BUTTON_TYPES.PREV}>◀️</button>
        <span>{curPage}</span>
        <button data-page-btn={PAGINATION_BUTTON_TYPES.NEXT}>▶️</button>
      </div>
    </div>
  );
}

export default PaginatedTable;

import { Fragment, useCallback, useState, ReactNode, ChangeEvent } from 'react';
import { FileDataType } from '../data';

import './item.css';
import { setNewFileData } from '../fileStructure.helpers';

interface ItemProps {
  data?: FileDataType;
  setData?: (newData: any) => any;
  children?: ReactNode; // For holding the input box in parallel
}

function Item({ data, children, setData }: ItemProps) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  // 0 -> not being added, 1 -> file being added, 2 -> folder being added
  const [newItemType, setNewItemType] = useState<0 | 1 | 2>(0);
  const [inputText, setInputText] = useState<string>('');

  const handleFolderClicked = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  const handleSetItemTypeBeingAdded = useCallback(
    (type: 0 | 1 | 2) => () => {
      setNewItemType(type);
      setIsOpen(true);
    },
    []
  );

  const handleSaveItem = useCallback(() => {
    if (setData)
      setData((prevData: FileDataType) => {
        const newData = structuredClone(prevData);
        setNewFileData(data?.id, newData, inputText, newItemType === 2);
        setNewItemType(0);
        setInputText('');
        return newData;
      });
  }, [data, setData, inputText, newItemType]);

  const handleRemoveInputField = useCallback(() => {
    setNewItemType(0);
  }, []);

  const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  }, []);

  return (
    <ul className="item-container">
      {children ? (
        <li>{children}</li>
      ) : (
        <li>
          <span role="button" onClick={data?.isFolder ? handleFolderClicked : undefined}>
            {data?.isFolder ? '📁 ' : '📄 '}
            {data?.name}
          </span>
          {data?.isFolder ? (
            <Fragment>
              <button onClick={handleSetItemTypeBeingAdded(1)}>Add File</button>
              <button onClick={handleSetItemTypeBeingAdded(2)}>Add Folder</button>
            </Fragment>
          ) : null}
        </li>
      )}
      {isOpen && newItemType > 0 ? (
        <Item>
          <input placeholder={newItemType === 1 ? 'Enter file name' : 'Enter folder name'} value={inputText} onChange={handleTextChange} />
          <button onClick={handleSaveItem}>✅</button>
          <button onClick={handleRemoveInputField}>🗑️</button>
        </Item>
      ) : null}
      {isOpen ? data?.children.map((childData) => <Item data={childData} setData={setData} key={childData.id} />) : null}
    </ul>
  );
}

export default Item;

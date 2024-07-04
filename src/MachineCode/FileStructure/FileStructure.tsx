import { useState } from 'react';

import FILE_DATA, { FileDataType } from './data';
import Item from './Item';
import "./fileStructure.css";

function FileStructure() {
  const [fileData, setFileData] = useState<FileDataType>(FILE_DATA);

  return (
    <div className='file-structure-container'>
      <h1>File Structure</h1>
      <Item data={fileData} setData={setFileData}  />
    </div>
  );
}

export default FileStructure;

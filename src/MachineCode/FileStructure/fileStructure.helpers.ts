import { FileDataType } from './data';

export const setNewFileData = (id: number | string | undefined, fileData: FileDataType | undefined, inputText: string, isFolder: Boolean) => {
  if (fileData?.id === id) {
    fileData?.children.push({
      name: inputText,
      isFolder,
      id: Number(new Date()),
      children: [],
    });
    return null;
  }
  if (fileData) {
    for (let child of fileData?.children) {
      const ret = setNewFileData(id, child, inputText, isFolder);
      if (ret == null) return null;
    }
  }
  return 1;
};

const STRUCTURE = {
  id: '1',
  isFolder: true,
  name: 'FileStructureComponent',
  children: [
    {
      id: '2',
      isFolder: true,
      name: 'FileStructure',
      children: [
        {
          id: '3',
          isFolder: false,
          name: 'fileStructure.tsx',
          children: [],
        },
        {
          id: '4',
          isFolder: false,
          name: 'fileStructure.css',
          children: [],
        },
      ],
    },
    {
      id: '5',
      isFolder: false,
      name: 'package.json',
      children: [],
    },
  ],
};

export interface FileDataType {
  name: string;
  id: number | string;
  isFolder: Boolean;
  children: FileDataType [];
}

export default STRUCTURE;

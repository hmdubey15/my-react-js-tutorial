import { useCallback, useState } from 'react';

import { BOX_STRUCTURE } from '../checkboxesData';

interface CheckBoxesListProps {
  fileData: BOX_STRUCTURE[];
  childrenBoxesToggled?: Function;
}

interface SelectedBoxesObject {
  [id: number]: 0 | 1 | 2; // 0 -> not selected, 1 -> partially selected, 2 -> selected
}

function CheckBoxesList({ fileData, childrenBoxesToggled }: CheckBoxesListProps) {
  const [selectedBoxes, setSelectedBoxes] = useState<SelectedBoxesObject>({});
  const [currChecked, setCurrChecked] = useState<number>(0);

  const handleToggleCheckBox = useCallback(
    (id: number) => () => {
      if (selectedBoxes?.[id] > 0) setCurrChecked(prevVal => prevVal - 1);
      setSelectedBoxes({ ...selectedBoxes, [id]: selectedBoxes?.[id] === 2 ? 0 : 2 });
    },
    [selectedBoxes]
  );

  return (
    <ul>
      {fileData.map(({ id, name, children }) => (
        <li key={id}>
          <label style={selectedBoxes?.[id] === 1 ? { background: 'orange' } : {}}>
            <input type="checkbox" onChange={handleToggleCheckBox(id)} checked={selectedBoxes?.[id] > 0} />
          </label>
          {name}
          {children?.length && (
            <CheckBoxesList
              fileData={children}
              childrenBoxesToggled={(value: 0 | 1 | 2) => {
                setSelectedBoxes((prevState) => ({ ...prevState, [id]: value }));
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CheckBoxesList;

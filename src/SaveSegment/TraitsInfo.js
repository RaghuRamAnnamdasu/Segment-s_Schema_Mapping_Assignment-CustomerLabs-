import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

export function TraitsInfo() {
  return (
    <div className="informationWrapper">
      <div className="instructionWrapper">
        To save your segment, you need to add the schemas to build the query
      </div>
      <div className="indicationWrapper">
        <div className="userTraitsWrapper">
          <CircleIcon fontSize='small' />
          - User Traits
        </div>
        <div className="groupTraitsWrapper">
          <CircleIcon fontSize='small' />
          - Group Traits
        </div>
      </div>
    </div>
  );
}

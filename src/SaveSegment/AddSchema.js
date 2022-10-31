import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

import { SCHEMAOBJECT } from './Constants';

export function AddSchema({ remainingSchemaArray, handleSchemaSelect, addSchemaTraitCategory, selectedSchemaValue }) {
  return (
    <div className="addSchemaDropDown">
      <div><CircleIcon fontSize='small' sx={{ color: "#cfd8dc" }} className={addSchemaTraitCategory} /></div>
      <div className="addSchemaSelectTagEnclosure">
        {remainingSchemaArray.length && <select name="addSchemaToSegment" onChange={handleSchemaSelect} value={selectedSchemaValue}>
          <option value="add_schema_to_segment" selected>Add Schema To Segment</option>
          {remainingSchemaArray.map((schemaValue) => {
            return <option value={schemaValue}>{SCHEMAOBJECT[schemaValue]}</option>;
          })}
        </select>}
      </div>
    </div>
  );
}

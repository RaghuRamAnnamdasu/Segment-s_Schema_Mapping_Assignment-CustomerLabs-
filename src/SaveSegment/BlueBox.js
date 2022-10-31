import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveIcon from '@mui/icons-material/Remove';

import { SCHEMAOBJECT } from './Constants';

export function BlueBox({ addedSchemaArray, remainingSchemaArray, handleSchemaSelectInBlueBox, handleSchemaRemove }) {
  return (
    <div className="blueBox">
      {addedSchemaArray?.map((addedSchemaValue) => {
        return (
          <div className="addedSchemaWrapper">
            <div><CircleIcon fontSize='small' className={addedSchemaValue} /></div>
            <div className="addedSchemaEnclosureSelectTag">
              <select name="addedSchemaDetail" onChange={(evt) => handleSchemaSelectInBlueBox(evt, addedSchemaValue)} value={addedSchemaValue}>
                <option value={addedSchemaValue} selected hidden>{SCHEMAOBJECT[addedSchemaValue]}</option>
                {remainingSchemaArray?.map((schemaValue) => {
                  return <option value={schemaValue}>{SCHEMAOBJECT[schemaValue]}</option>;
                })}
              </select>
            </div>
            <div>
              <RemoveIcon fontSize='small' className="schemaRemoveIcon" onClick={(evt) => handleSchemaRemove(evt, addedSchemaValue)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

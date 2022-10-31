import React, { useState } from 'react';

import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { SCHEMAOBJECT, USERTRAITSARRAY } from './Constants';
import { BlueBox } from './BlueBox';
import { AddSchema } from './AddSchema';
import { TraitsInfo } from './TraitsInfo';
import { AddSegmentName } from './AddSegmentName';

export function SaveSegment() {
  
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [addedSchemaArray, setAddedSchemaArray] = useState([]);
  const [remainingSchemaArray, setRemainingSchemaArray] = useState(Object.keys(SCHEMAOBJECT));
  const [selectedSchemaValue, updateSelectedSchema] = useState("add_schema_to_segment");
  const [addSchemaTraitCategory, updateAddSchemaTraitCategory] = useState(null);


  const submitSegmentData = async (data)=>{
    let result = await fetch("https://webhook.site/03e40adf-87c7-4011-9b22-7b8052a92b22",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {"content-type": "application/json"}
    })
    // let response = await result.json();
  }

  const handleSegmentName = (evt)=>{
    setSegmentName(evt.target.value)
  }

  const handleSchemaSelect = (evt)=>{
    updateSelectedSchema(evt.target.value);
    if (evt.target.value !== "add_schema_to_segment"){
      USERTRAITSARRAY.includes(evt.target.value) ? updateAddSchemaTraitCategory(evt.target.value) : updateAddSchemaTraitCategory(evt.target.value)
    }else{
      updateAddSchemaTraitCategory(null);
    }
  }

  const handleSchemaAddition = (evt)=>{
    if(selectedSchemaValue !== "" && selectedSchemaValue !== "add_schema_to_segment"){
      const index = remainingSchemaArray.indexOf(selectedSchemaValue);
      const tempArray = [...remainingSchemaArray];
      tempArray.splice(index,1);
      setRemainingSchemaArray(tempArray);
      setAddedSchemaArray([...addedSchemaArray,selectedSchemaValue]);
      updateSelectedSchema("add_schema_to_segment");
      updateAddSchemaTraitCategory(null);
    }else{
      console.log("Please select a schema");
    }
  }

  const handleSchemaSelectInBlueBox = (evt,previousSelection)=>{
    var value = evt.target.value;
    const indexInRemaingSchemaArray = remainingSchemaArray.indexOf(value);
    const indexInAddedSchemaArray = addedSchemaArray.indexOf(previousSelection);
    const tempArray1 = [...remainingSchemaArray];
    tempArray1.splice(indexInRemaingSchemaArray,1);
    tempArray1.push(previousSelection);
    setRemainingSchemaArray(tempArray1);

    const tempArray2 = [...addedSchemaArray];
    tempArray2.splice(indexInAddedSchemaArray,1);
    tempArray2.splice(indexInAddedSchemaArray,0,value);
    setAddedSchemaArray(tempArray2);
  }

  const handleSave = (evt)=>{
    const selectedSchemaArray = addedSchemaArray.map((schemaValue)=>{
      return {[schemaValue] : SCHEMAOBJECT[schemaValue]}
    })
    const segmentData = {
      "segment_name" : segmentName,
      "schema" : selectedSchemaArray
    }
    submitSegmentData(segmentData);
  }

  const handleCancel = (evt)=>{
    setOpen(false);
    setSegmentName("");
    setAddedSchemaArray([]);
    setRemainingSchemaArray(Object.keys(SCHEMAOBJECT));
    updateSelectedSchema("add_schema_to_segment");
  }

  const handleSchemaRemove = (evt,addedSchemaValue)=>{
    const indexInAddedSchemaArray = addedSchemaArray.indexOf(addedSchemaValue);
    const tempArray1 = [...addedSchemaArray];
    tempArray1.splice(indexInAddedSchemaArray,1);
    setAddedSchemaArray(tempArray1);

    const tempArray2 = [...remainingSchemaArray];
    tempArray2.push(addedSchemaValue);
    setRemainingSchemaArray(tempArray2);
  }
  return (
    <React.Fragment>
      <div className="saveSegmentButtonEnclosure">
        <Button className="saveSegmentButton" variant='outlined' onClick={() => setOpen(true)}>Save Segment</Button>
      </div>
      <Modal className="modalEnclosure" open={open}>
        <Box>
          <div className="header">
            <ArrowBackIosNewIcon fontSize='small' onClick={handleCancel}/>
            Saving Segment
          </div>
          <div className="body">
            <AddSegmentName segmentName={segmentName} handleSegmentName={handleSegmentName} />
            <TraitsInfo />
            <BlueBox addedSchemaArray={addedSchemaArray} remainingSchemaArray={remainingSchemaArray} handleSchemaSelectInBlueBox={handleSchemaSelectInBlueBox} handleSchemaRemove={handleSchemaRemove} />
            <AddSchema remainingSchemaArray={remainingSchemaArray} handleSchemaSelect={handleSchemaSelect} addSchemaTraitCategory={addSchemaTraitCategory} selectedSchemaValue={selectedSchemaValue}/>
            <a className="addNewSchemaLink" href="#" onClick={handleSchemaAddition}>+ <span>Add new schema</span></a>
          </div>
          <div className="footer">
            <Button className="saveButton" variant='contained' onClick={handleSave}>Save the Segment</Button>
            <Button className="cancelButton" variant='contained' onClick={handleCancel}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}



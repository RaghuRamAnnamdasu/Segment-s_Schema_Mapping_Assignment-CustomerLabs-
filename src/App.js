import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';

import { useState } from 'react';

import './App.css';

function App() {

  const schemaObject = {
    first_name: "First Name",
    last_name: "Last Name",
    gender: "Gender",
    age: "Age",
    account_name: "Account Name",
    city: "City",
    state: "State"
  }

  const userTraitsArray = ["first_name","last_name","gender","age"];
  // const groupTraitsArray = ["account_name","city","state"];

  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [addedSchemaArray, setAddedSchemaArray] = useState([]);
  const [remainingSchemaArray, setRemainingSchemaArray] = useState(Object.keys(schemaObject));
  const [selectedSchemaValue, updateSelectedSchema] = useState("add_schema_to_segment");
  const [addSchemaTraitCategory, updateAddSchemaTraitCategory] = useState(null);

  // const handleClose = () => setOpen(false);

  const submitSegmentData = async (data)=>{
    let result = await fetch("https://webhook.site/03e40adf-87c7-4011-9b22-7b8052a92b22",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {"content-type": "application/json"}
    })
    let response = await result.json();
    console.log("Result after sending data to server........",response)
  }


  const handleSegmentName = (evt)=>{
    setSegmentName(evt.target.value)
  }

  const handleSchemaSelect = (evt)=>{
    updateSelectedSchema(evt.target.value);
    if (evt.target.value !== "add_schema_to_segment"){
      userTraitsArray.includes(evt.target.value) ? updateAddSchemaTraitCategory(evt.target.value) : updateAddSchemaTraitCategory(evt.target.value)
    }else{
      updateAddSchemaTraitCategory(null);
    }
  }

  const handleSchemaAddition = (evt)=>{
    if(selectedSchemaValue !== "" && selectedSchemaValue !== "add_schema_to_segment"){
      const index = remainingSchemaArray.indexOf(selectedSchemaValue);
      const tempArray = [...remainingSchemaArray];
      // console.log("index............",index,temporarySelection)
      tempArray.splice(index,1);
      console.log("temp array", index, tempArray);
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
    console.log("added schema array", tempArray2);
  }

  const handleSave = (evt)=>{
    const selectedSchemaArray = addedSchemaArray.map((schemaValue)=>{
      return {[schemaValue] : schemaObject[schemaValue]}
    })
    const segmentData = {
      "segment_name" : segmentName,
      "schema" : selectedSchemaArray
    }

    console.log("Final Output.............", segmentData);
    submitSegmentData(segmentData);
  }

  const handleCancel = (evt)=>{
    setOpen(false);
    setSegmentName("");
    setAddedSchemaArray([]);
    setRemainingSchemaArray(Object.keys(schemaObject));
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
    <div className="App">
      <div className = "saveSegmentButtonEnclosure" >
        <Button className = "saveSegmentButton" variant='outlined' onClick = {()=>setOpen(true)}>Save Segment</Button>
      </div>
      <Modal className = "modalEnclosure"
        open={open}
        // onClose={handleClose}
      >
        <Box>
          <div className = "header">
            <ArrowBackIosNewIcon fontSize='small'/>
            Saving Segment
          </div>
          <div className = "body">
            <div className = "segmentNameWrapper">
              <label htmlFor='segment-Name'>Enter the Name of the Segment</label>
              <input type = "text" name = "segment_name" id = "segment-Name" placeholder = "Name of the segment" value = {segmentName} onChange = {handleSegmentName} />
            </div>
            <div className = "informationWrapper">
              <div className = "instructionWrapper">
                To save your segment, you need to add the schemas to build the query
              </div>
              <div className = "indicationWrapper">
                <span className = "userTraitsWrapper">
                  <CircleIcon fontSize='small'/>
                  - User Traits
                </span>
                <span className = "groupTraitsWrapper">
                  <CircleIcon fontSize='small'/>
                  - Group Traits
                </span>
              </div>
            </div>
            <div className="blueBox">
                {
                  addedSchemaArray?.map((addedSchemaValue)=>{
                    return (
                      <div className = "addedSchemaWrapper">
                        <span><CircleIcon fontSize='small'className = {addedSchemaValue}/></span>
                        <span className = "addedSchemaEnclosureSelectTag">
                          <select name = "addedSchemaDetail" onChange = {(evt)=>handleSchemaSelectInBlueBox(evt, addedSchemaValue)} value = {addedSchemaValue}>
                            <option value = {addedSchemaValue} selected>{schemaObject[addedSchemaValue]}<span className = "dropDownIcon"><KeyboardArrowDownIcon /></span></option>
                            {
                              remainingSchemaArray?.map((schemaValue)=>{
                                return <option value = {schemaValue}>{schemaObject[schemaValue]}<span className = "dropDownIcon"><KeyboardArrowDownIcon /></span></option>
                              })
                            }
                          </select>
                        </span>
                        <span>
                          <RemoveIcon fontSize='small' className = "schemaRemoveIcon" onClick = {(evt)=>handleSchemaRemove(evt,addedSchemaValue)}/>
                        </span>
                      </div>
                    )
                  })
                }
            </div>
            <div className="addSchemaDropDown">
              <span><CircleIcon fontSize='small' sx={{color : "#cfd8dc"}} className = {addSchemaTraitCategory}/></span>
              <span className = "addSchemaSelectTagEnclosure">
                {remainingSchemaArray.length && <select name = "addSchemaToSegment" onChange = {handleSchemaSelect} value = {selectedSchemaValue}>
                  <option value = "add_schema_to_segment" selected>Add Schema To Segment<span className = "dropDownIcon"><KeyboardArrowDownIcon /></span></option>
                  {remainingSchemaArray.map((schemaValue)=>{
                    return <option value = {schemaValue} >{schemaObject[schemaValue]}<span className = "dropDownIcon"><KeyboardArrowDownIcon /></span></option>
                  })}
                </select>}
              </span>
            </div>
            <a className = "addNewSchemaLink" href="#" onClick = {handleSchemaAddition}>+ <span>Add new schema</span></a>
          </div>
          <div className = "footer">
            <Button className = "saveButton" variant='contained' onClick = {handleSave}>Save the Segment</Button>
            <Button  className = "cancelButton" variant='contained' onClick = {handleCancel}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default App;

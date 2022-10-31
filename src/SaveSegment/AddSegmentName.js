import React from 'react';

export function AddSegmentName({ segmentName, handleSegmentName }) {
  return (
    <div className="segmentNameWrapper">
      <label htmlFor='segment-Name'>Enter the Name of the Segment</label>
      <input type="text" name="segment_name" id="segment-Name" placeholder="Name of the segment" value={segmentName} onChange={handleSegmentName} />
    </div>
  );
}

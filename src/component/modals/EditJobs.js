import React, { useRef, useState } from "react";

const EditJobs = ({selectedRow}) => {
   console.log({selectedRow})
    return (
        <ul key={selectedRow.nameJob}>
            <li>{selectedRow.status.name}</li>
            <li>{selectedRow.category.name}</li>
            <li>{selectedRow.nameJob}</li>
        </ul>
    )
}

export default EditJobs;

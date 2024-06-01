import React, { useState, useEffect } from "react";
import PrimeTable from "../primeTable/PrimeTable";
import { Dropdown } from "primereact/dropdown";
import editJobColumns from '../columns/editJobColumns';
import { jobCategories, jobStatuses } from "../../store/generateJob";
import { useJobsStore } from "../../store/useJobsStore";

const EditJobs = ({
  selectedRowItem,
  setSelectedRowItem,
  setVisible,
  visible,
  toast,
  updateItems
}) => {
  const [formData, setFormData] = useState(selectedRowItem);

  const handleSave = () => {
    updateItems(formData);
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };


  return (
    <div className="p-3 border-t space-y-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="itemName" className="mb-2 font-semibold text-gray-700">Item Name</label>
          <input
            id="itemName"
            value={formData?.itemName}
            onChange={(e) => handleChange(e,'itemName')}
            className="p-2 border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={formData?.quantity}
            onChange={(e) => handleChange(e,'quantity')}
            className="p-2 border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            rows={1}
            value={formData?.description}
            onChange={(e) => handleChange(e,'description', )}
            className="p-2 border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="mb-2 font-semibold text-gray-700">Notes</label>
          <textarea
            id="notes"
            rows={1}
            value={formData?.notes}
            onChange={(e) => handleChange(e,'notes')}
            className="p-2 border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>

  );
};

export default EditJobs;

import React, { useState, useEffect } from "react";
import PrimeTable from "../primeTable/PrimeTable";
import { Dropdown } from "primereact/dropdown";
import editJobColumns from '../columns/editJobColumns';
import { jobCategories, jobStatuses } from "../../store/generateJob";

const EditJobs = ({ selectedRow, jobs, toast, setJobs, setVisible, setSelectedRow }) => {

  const [formData, setFormData] = useState(selectedRow);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    setFormData(selectedRow);
  }, [selectedRow]);

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedFormData);
  };

  const textEditor = (options) => {
    return (
      <input
        className="border w-full border-slate-400 rounded-md outline-none font-normal py-1"
        type="text"
        value={options.value}
        onChange={(e) => {
          handleChange(options.field, e.target.value);
          options.editorCallback(e.target.value);
        }}
      />
    );
  };

  const dropdownEditor = (options, values, optionLabel) => {
    return (
      <Dropdown
        value={options.value}
        options={values}
        optionLabel={optionLabel}
        onChange={(e) => {
          handleChange(options.field, e.value);
          options.editorCallback(e.value);
        }}
        placeholder={`Select a ${optionLabel}`}
        itemTemplate={(option) => (
          <div>
            {option[optionLabel]}
          </div>
        )}
      />
    );
  };

  //   ${option[optionLabel] === "Completed" ? "p-tag p-tag-success" : ""} 
  //   ${option[optionLabel] === "On Hold" ? "p-tag p-tag-warning" : ""}
  //   ${option[optionLabel] === "In Progress" ? "p-tag p-tag-progress" : ""}
  //   `}>

  const statusEditor = (options) => {
    return dropdownEditor(options, jobStatuses, 'name');
  };

  const categoryEditor = (options) => {
    return dropdownEditor(options, jobCategories, 'name');
  };

  const columns = editJobColumns({
    textEditor,
    dropdownEditor,
    statusEditor,
    categoryEditor
  });


  const handleCancel = () => {
    setVisible({ editJobVisible: false })
    setSelectedRow(null)
  };

  const handleSave = () => {
    const updatedJobs = jobs.map(job =>
      job.id === selectedRow.id ? formData : job
    );
    setJobs(updatedJobs);
    if (formData !== selectedRow) {
      toast.current.show({
        severity: 'success',
        summary: 'Job Edited',
        detail: 'The job has been successfully updated.',
        life: 3000
      });
      setVisible({ editJobVisible: false });
    } else {
      toast.current.show({
        severity: 'info',
        summary: 'No Changes',
        detail: 'No changes were made to the job.',
        life: 3000
      });
    }
  };


  return (
    <div>
      <div className="w-[100%]">
        <PrimeTable
          value={[formData]}
          columns={columns}
          scrollHeight="400px"
          globalFilter={globalFilterValue}
          globalFilterFields={["nameJob", "status.name", "category.name"]}
          editMode="cell"
          selectionMode="single"
        />
        <div className="flex justify-end gap-3 my-8">
          <button
            className="border rounded-md px-4 py-2 bg-red-700 text-white hover:bg-red-800 transition-all flex items-center gap-2 font-normal"
            onClick={handleCancel}
          >
            Cancel Changes <i className="pi pi-times"></i>
          </button>
          <button
            className="border rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal"
            onClick={handleSave}
          >
            Save Changes <i className="pi pi-check"></i>
          </button>
        </div>
      </div>

    </div>
  );
};

export default EditJobs;

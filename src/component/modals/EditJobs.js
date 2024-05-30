import React, { useState } from "react";
import PrimeTable from "../primeTable/PrimeTable";
import { useJobsStore } from "../../store/useJobsStore";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import editJobColumns from '../columns/editJobColumns';
import { jobCategories, jobStatuses } from "../../store/generateJob";

const EditJobs = ({ selectedRow }) => {
  const { jobs, setJobs } = useJobsStore((state) => ({
    jobs: state.jobs,
    setJobs: state.setJobs
  }));
  console.log({jobs});
  const [formData, setFormData] = useState(selectedRow);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const textEditor = (options) => {
    return (
      <input
        className="border  border-slate-400 rounded-md outline-none font-normal "
        type="text"
        value={options.value}
        onChange={(e) => {
          handleChange(options.field, e.target.value);
          options.editorCallback(e.target.value);
        }}
      />
    );
  };

  const dropdownEditor = (options, values) => {
    return (
      <Dropdown
        value={options.value}
        options={values}
        optionLabel="name"
        onChange={(e) => {
           handleChange(options.field, e.value);
          options.editorCallback(e.value);
        }}
      />
    );
  };

  const columns = editJobColumns({
    textEditor,
    dropdownEditor
  });

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-1">
        <div className="relative w-full max-w-md">
          <input
            className="border border-gray-300 rounded-md p-0.5 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <PrimeTable
      value={[formData]}
      columns={columns}
      scrollHeight="400px"
      header={header}
      globalFilter={globalFilterValue}
      globalFilterFields={["nameJob", "status.name", "category.name"]}
      editMode="cell"
      selectionMode="single"
    >
      {columns.map((col, i) => (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          editor={col.editor}
          style={col.style}
          body={(rowData) => {
            if (col.field === 'status.name') {
              return rowData.status.name;
            }
            if (col.field === 'category.name') {
              return rowData.category.name;
            }
            return rowData[col.field];
          }}
        />
      ))}
    </PrimeTable>
  );
};

export default EditJobs;

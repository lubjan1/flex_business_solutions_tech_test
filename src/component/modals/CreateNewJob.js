import React, { useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';

const CreateNewJob = ({ jobCategories, jobStatuses, addJobs, setVisible, toast }) => {
    const [formData, setFormData] = useState({
        nameJob: '',
        category: null,
        status: null,
    });

    const handleChange = (e, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };

    const handleDropdownChange = (e, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: e.value
        }));
    };

    const handleSave = () => {
        if (!formData.nameJob || !formData.category || !formData.status) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'Incomplete Form', 
                detail: 'Please fill out all fields before saving.', 
                life: 3000 });
            return;
        }
        addJobs(formData);
        setVisible({createNewJobVisible:false});
        toast.current.show({ 
            severity: 'success', 
            summary: 'Job Added', 
            detail: 'The job has been added successfully.', 
            life: 3000 });
    };

    return (
        <div className="select-none">
            <div className="my-8">
                <input
                    onChange={(e) => handleChange(e, 'nameJob')}
                    className="border border-slate-400 rounded-md outline-none font-normal p-1.5 w-full"
                    placeholder="Name"
                    name="nameJob"
                />
            </div>
            <div className="flex gap-4 my-8">
                <Dropdown
                    value={formData.category}
                    onChange={(e) => handleDropdownChange(e, 'category')}
                    options={jobCategories}
                    optionLabel="name"
                    placeholder="Select a Category"
                    className="w-full md:w-14rem border"
                />
                <Dropdown
                    value={formData.status}
                    onChange={(e) => handleDropdownChange(e, 'status')}
                    options={jobStatuses}
                    optionLabel="name"
                    placeholder="Select a Status"
                    className="w-full md:w-14rem border"
                />
            </div>
            <div className="flex justify-end gap-3 my-8">
                <button onClick={() => setVisible(false)} className="border rounded-md px-2 py-0.5 bg-red-700 text-white hover:bg-red-800 transition-all flex items-center gap-2 font-normal">
                    Cancel Changes<i className="pi pi-times"></i>
                </button>
                <button onClick={handleSave} className="border rounded-md px-2 py-0.5 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal">
                    Save Changes<i className="pi pi-check"></i>
                </button>
            </div>
        </div>
    )
}

export default CreateNewJob;

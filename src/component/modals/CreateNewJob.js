import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

const CreateNewJob = ({ jobCategories, jobStatuses, addJobs, setVisible, toast }) => {
    const [formData, setFormData] = useState({
        nameJob: '',
        category: null,
        status: null,
        id: null
    });

    // Function to handle form field changes
    const handleChange = (e, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };

    // Function to handle saving the form data
    const handleSave = () => {
        if (!formData.nameJob || !formData.category || !formData.status) {
            toast.current.show({
                severity: 'error',
                summary: 'Incomplete Form',
                detail: 'Please fill out all fields before saving.',
                life: 3000
            });
            return;
        }
        addJobs(formData);
        setVisible({ createNewJobVisible: false });
        toast.current.show({
            severity: 'success',
            summary: 'Job Added',
            detail: 'The job has been added successfully.',
            life: 3000
        });
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
                    onChange={(e) => handleChange(e, 'category')}
                    options={jobCategories}
                    optionLabel="name"
                    placeholder="Select a Category"
                    className="w-full md:w-14rem border"
                />
                <Dropdown
                    value={formData.status}
                    onChange={(e) => handleChange(e, 'status')}
                    options={jobStatuses}
                    optionLabel="name"
                    placeholder="Select a Status"
                    className="w-full md:w-14rem border"
                />
            </div>

            <div className="flex justify-end gap-3 my-8">
                <button
                    className="border rounded-md px-4 py-2 bg-red-700 text-white hover:bg-red-800 transition-all flex items-center gap-2 font-normal"
                    onClick={() => setVisible(false)}
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
    )
}

export default CreateNewJob;

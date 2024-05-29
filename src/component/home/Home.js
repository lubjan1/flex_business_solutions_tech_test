import React, { useState } from "react";
import { useJobsStore } from "../../store/useUsersStore";
import PrimeTable from "../primeTable/PrimeTable";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

const Home = () => {
    const { jobs } = useJobsStore((state) => ({
        jobs: state.jobs,
    }));
    const [visible, setVisible] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const statusCounts = jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, {});

    console.log({ statusCounts });

    const columns = [
        {
            field: "nameJob",
            header: "Jobsite Name",
        },
        {
            field: "status",
            header: "Status",
            body: (row) => {
                return (
                    <span
                        className={`
                ${row.status === "Completed" ? "p-tag p-tag-success" : ""} 
                ${row.status === "On Hold" ? "p-tag p-tag-warning" : ""}
                ${row.status === "In Progress" ? "p-tag p-tag-progress" : ""}
                `
                        }
                    >
                        {row.status}
                    </span>
                );
            },
        },
    ];

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-end gap-2">
                <div className="relative">
                    <input
                        className="border border-slate-400 rounded-md outline-none font-normal p-0.5 pl-8"
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                    <i className="pi pi-search absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                </div>
                <button onClick={() => setVisible(true)} className="border rounded-md px-2 py-0.5 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal">
                    Create<i className="pi pi-plus"></i>
                </button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="p-6 flex flex-col justify-end h-screen">
            <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="bg-green-100 border border-green-200 p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-check-circle text-green-500 text-3xl mr-2"></i>
                        <h1 className="text-green-700 font-semibold text-lg">Completed</h1>
                    </div>
                    <p className="text-green-800 text-2xl mt-2">{statusCounts.Completed || 0}</p>
                </div>
                <div className="bg-yellow-100 border border-yellow-200 p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-exclamation-triangle text-yellow-500 text-3xl mr-2"></i>
                        <h1 className="text-yellow-700 font-semibold text-lg">On Hold</h1>
                    </div>
                    <p className="text-yellow-800 text-2xl mt-2">{statusCounts["On Hold"] || 0}</p>
                </div>

                <div className="bg-blue-100 border border-blue-200 p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-spinner text-blue-500 text-3xl mr-2"></i>
                        <h1 className="text-blue-700 font-semibold text-lg">In Progress</h1>
                    </div>
                    <p className="text-blue-800 text-2xl mt-2">{statusCounts["In Progress"] || 0}</p>
                </div>
            </div>
            {/* Moadl */}
            <Dialog header="Create new job" visible={visible} style={{ width: '40vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="">
                    <div className="my-4">
                        <input
                            className="border border-slate-400 rounded-md outline-none font-normal p-0.5 pl-8 w-full" 
                            // value={globalFilterValue}
                            // onChange={onGlobalFilterChange}
                            placeholder="Name"
                        />
                    </div>
                    <div className="flex gap-4 my-4"> 
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full md:w-14rem" />
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full md:w-14rem" />
                    </div>
                </div>
            </Dialog>
            {/*  */}
            <div className="border rounded-md">
                <PrimeTable
                    value={jobs}
                    columns={columns}
                    scrollHeight="500px"
                    header={header}
                    globalFilter={globalFilterValue}
                    globalFilterFields={["nameJob", "status"]}
                />
            </div>
        </div>
    );
};

export default Home;

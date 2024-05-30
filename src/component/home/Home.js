import React, { useRef, useState } from "react";
import { useJobsStore } from "../../store/useJobsStore";
import PrimeTable from "../primeTable/PrimeTable";
import { Dialog } from 'primereact/dialog';
import CreateNewJob from "../modals/CreateNewJob";
import { jobCategories,jobStatuses } from "../../store/generateJob";
import { Toast } from 'primereact/toast'
import EditJobs from "../modals/EditJobs";


const Home = () => {
    const { jobs:initialJobs } = useJobsStore((state) => ({
        jobs: state.jobs,
    }));
    const [jobs,setJobs]=useState(initialJobs)
    const [selectedRow,setSelectedRow]=useState(null)

    const toast = useRef(null);

    const [visible, setVisible] = useState({
        createNewJobVisible:false,
        editJobVisible:false
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const statusCounts = jobs?.reduce((acc, job) => {
        acc[job.status.name] = (acc[job.status.name] || 0) + 1;
        return acc;
    }, {});

    const columns = [
        {
            field: "nameJob",
            header: "Jobsite Name",
        },
        {
            field: "status.name",
            header: "Status",
            body: (row) => {
                return (
                    <span
                        className={`
                ${row.status.name === "Completed" ? "p-tag p-tag-success" : ""} 
                ${row.status.name === "On Hold" ? "p-tag p-tag-warning" : ""}
                ${row.status.name === "In Progress" ? "p-tag p-tag-progress" : ""}
                `
                 }
                    >
                        {row.status.name}
                    </span>
                );
            },
        },
    ];

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const addJobs = (newJobs) => {
        setJobs([...jobs,newJobs])
    }



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
                <button onClick={() => setVisible({createNewJobVisible:true})} className="border rounded-md px-2 py-0.5 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal">
                    Create<i className="pi pi-plus"></i>
                </button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="p-6 flex flex-col justify-end h-screen">
            <Toast ref={toast} />
            <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="complete-statistics border p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-check-circle text-green-500 text-3xl mr-2"></i>
                        <h1 className="text-green-700 font-semibold text-lg">Completed</h1>
                    </div>
                    <p className="text-green-800 text-2xl mt-2">{statusCounts.Completed || 0}</p>
                </div>
                <div className="on-hold-statistics border  p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-exclamation-triangle text-yellow-800 text-3xl mr-2"></i>
                        <h1 className="text-yellow-800 font-semibold text-lg">On Hold</h1>
                    </div>
                    <p className="text-yellow-800 text-2xl mt-2">{statusCounts["On Hold"] || 0}</p>
                </div>

                <div className="in-progress-statistics border  p-4 rounded-md flex flex-col items-center shadow-md">
                    <div className="flex items-center">
                        <i className="pi pi-spinner text-green-800 text-3xl mr-2"></i>
                        <h1 className="text-green-800 font-semibold text-lg">In Progress</h1>
                    </div>
                    <p className="text-green-800 text-2xl mt-2">{statusCounts["In Progress"] || 0}</p>
                </div>
            </div>
            {/* Modal */}
            <Dialog 
                header="Create new job" 
                visible={visible.createNewJobVisible} 
                style={{ width: '40vw' }} 
                onHide={() => { if (!visible.createNewJobVisible) return; setVisible({createNewJobVisible:false}); }}
                >
                {visible.createNewJobVisible &&  <CreateNewJob 
                        jobCategories={jobCategories}
                        jobStatuses={jobStatuses}
                        addJobs={addJobs}
                        setVisible={setVisible}
                        toast={toast}
                    />}
            </Dialog>
            <Dialog 
                header="Edit the job" 
                visible={visible.editJobVisible} 
                style={{ width: '60vw',height:"40vw" }} 
                onHide={() => { if (!visible.editJobVisible) return; setVisible({editJobVisible:false}); }}
                >
                  {visible.editJobVisible && <EditJobs 
                        selectedRow={selectedRow}
                        setVisible={setVisible}
                        toast={toast}
                    />}
            </Dialog>
            {/* /// */}
            <div className="border rounded-md shadow-md">
                <PrimeTable
                    value={jobs}
                    columns={columns}
                    scrollHeight="500px"
                    header={header}
                    globalFilter={globalFilterValue}
                    globalFilterFields={["nameJob", "status.name"]}
                    selection={selectedRow} 
                    onSelectionChange={(e) => {
                        setSelectedRow(e.value)
                        setVisible({editJobVisible:true})
                    }}
                    selectionMode="single"
                />
            </div>
        </div>
    );
};

export default Home;

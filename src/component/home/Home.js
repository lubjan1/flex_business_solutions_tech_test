import React, { useRef, useState } from "react";
import { useJobsStore } from "../../store/useJobsStore";
import PrimeTable from "../primeTable/PrimeTable";
import { Dialog } from 'primereact/dialog';
import CreateNewJob from "../modals/CreateNewJob";
import { jobCategories, jobStatuses } from "../../store/generateJob";
import { Toast } from 'primereact/toast';
import EditJobs from "../modals/EditJobs";
import mainColumns from "../columns/mainColumns";

const Home = () => {
    // Fetch initial jobs from the store
    const { jobs: initialJobs } = useJobsStore((state) => ({
        jobs: state.jobs
    }));
    // Component state variables
    const [jobs, setJobs] = useState(initialJobs);
    const [selectedRow, setSelectedRow] = useState(null);
    const toast = useRef(null);

    const [visible, setVisible] = useState({
        createNewJobVisible: false,
        editJobVisible: false
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");

    // Calculate status counts for different job statuses
    const statusCounts = jobs?.reduce((acc, job) => {
        acc[job.status.code] = (acc[job.status.code] || 0) + 1;
        return acc;
    }, {});

    // table columns
    const columns = mainColumns()

    // Handle global filter change
    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    // Add new jobs to the state
    const addJobs = (newJob) => {
        setJobs([...jobs, newJob]);
    };

    // table header with search and create button
    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-2">
                <div className="relative w-full max-w-md">
                    <input
                        className="w-full border border-gray-300 rounded-md p-1 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                    <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <button
                    onClick={() => setVisible({ createNewJobVisible: true })}
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                    Create
                    <i className="pi pi-plus"></i>
                </button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="p-4 space-y-2 bg-gray-50 text-gray-900 min-h-screen">
            <Toast ref={toast} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status count display */}
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md border border-gray-200">
                    <i className="pi pi-check-circle text-green-400 text-3xl mb-1"></i>
                    <h2 className="font-bold text-lg">Completed</h2>
                    <p className="text-xl mt-1">{statusCounts.completed || 0}</p>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md border border-gray-200">
                    <i className="pi pi-exclamation-triangle text-yellow-400 text-3xl mb-1"></i>
                    <h2 className="font-bold text-lg">On Hold</h2>
                    <p className="text-xl mt-1">{statusCounts.on_hold || 0}</p>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md border border-gray-200">
                    <i className="pi pi-spinner text-blue-400 text-3xl mb-1"></i>
                    <h2 className="font-bold text-lg">In Progress</h2>
                    <p className="text-xl mt-1">{statusCounts.in_progress || 0}</p>
                </div>
            </div>

            {/* Create New Job Dialog */}
            <Dialog
                header="Create new job"
                visible={visible.createNewJobVisible}
                style={{ width: '40vw', backgroundColor: '#ffffff' }}
                onHide={() => setVisible({ createNewJobVisible: false })}
            >
                {visible.createNewJobVisible && <CreateNewJob
                    jobCategories={jobCategories}
                    jobStatuses={jobStatuses}
                    addJobs={addJobs}
                    setVisible={setVisible}
                    toast={toast}
                    selectedRow={selectedRow}
                />}
            </Dialog>

            {/* Edit Job Dialog */}
            <Dialog
                header="Edit the job"
                visible={visible.editJobVisible}
                style={{ width: '60vw', height: "40vw", backgroundColor: '#ffffff' }}
                onHide={() => { 
                    setVisible({ editJobVisible: false });
                    setSelectedRow(null); 
                }}
            >
                {visible.editJobVisible && selectedRow && <EditJobs
                    selectedRow={selectedRow}
                    setVisible={setVisible}
                    toast={toast}
                />}
            </Dialog>

            {/* Jobs Table */}
            <div className="p-4 rounded-md shadow-md border border-gray-200">
                <PrimeTable
                    value={jobs}
                    columns={columns}
                    scrollHeight="400px"
                    header={header}
                    globalFilter={globalFilterValue}
                    globalFilterFields={["nameJob", "status.name"]}
                    selection={selectedRow}
                    onSelectionChange={(e) => {
                        setSelectedRow(e.value);
                        setVisible({ editJobVisible: true });
                    }}
                    selectionMode={'single'}
                    editMode={false}
                />
            </div>
        </div>
    );
};

export default Home;

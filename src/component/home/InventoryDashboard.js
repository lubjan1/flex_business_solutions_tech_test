import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimeTable from '../primeTable/PrimeTable';
import { useJobsStore } from '../../store/useJobsStore';
import inventoryColumns from '../columns/inventoryColumns';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import EditJobs from '../modals/EditJobs';

const InventoryDashboard = () => {
  const { jobs, setJobs } = useJobsStore((state) => ({
    jobs: state.jobs,
    setJobs: state.set
  }));

  const location = useLocation();
  const selectedJob = location.state;

  const job = useMemo(() => jobs.find(job => job.id === selectedJob.id), [jobs, selectedJob]);
  useEffect(() => {
    if (!job) navigate("/")
  }, [])

  const [visible, setVisible] = useState({
    editJobVisible: false
  });
  const navigate = useNavigate();

  const toast = useRef(null);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedRowItem, setSelectedRowItem] = useState(null);

  // Handle global filter change
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end items-center p-2">
        <Toast ref={toast} />
        <div className="relative w-full max-w-md">
          <input
            className="w-full border border-gray-300 rounded-md p-1 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    );
  };

  // Update items in the job
  const updateItems = (updatedItem) => {
    if (job.items.find(item => item.id === updatedItem.id) === updatedItem) {
      toast.current.show({ severity: 'info', summary: 'No Changes', detail: 'No changes were made.', life: 3000 });
      return setVisible({ editJobVisible:true });
    }
    const updatedJob = {
      ...selectedJob,
      items: selectedJob.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    };
    toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Item has been updated successfully.', life: 3000 });
    setJobs(state => ({
      ...state,
      jobs: state.jobs.map(job =>
        job.id === selectedJob.id ? updatedJob : job
      )
    }));
    setVisible({ editJobVisible:false });

  };

  const columns = inventoryColumns();
  const header = renderHeader();

  return (
    <>
      <Dialog
        header="Edit Job"
        visible={visible.editJobVisible}
        style={{ width: '50vw' }}
        onHide={() => {
          setVisible({ editJobVisible: false });
          setSelectedRowItem(null);
        }}
      >
        {visible.editJobVisible && (
          <EditJobs
            setVisible={setVisible}
            visible={visible}
            selectedRowItem={selectedRowItem}
            setSelectedRowItem={setSelectedRowItem}
            updateItems={updateItems}
            toast={toast}
          />
        )}
      </Dialog>

      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900 w-full">
        <div className="flex p-4 bg-gray-100 text-gray-900 w-full">
          <div className="w-1/4 bg-white rounded-md shadow-md border p-4 flex flex-col justify-between">
            <div>
              <div className="bg-gray-200 border p-2 text-center font-medium text-gray-700 rounded-md">
                {selectedJob.nameJob}
              </div>
              <div className="mt-4 text-center text-gray-700">
                <span className="font-semibold">Category:</span> {selectedJob?.category.name}
              </div>
            </div>
            <button
              className="mt-4 w-full border rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2 font-normal"
              onClick={() => navigate(`/`)}
            >
              Go Back<i className="pi pi-arrow-left ml-2"></i>
            </button>
          </div>

          <div className="w-3/4 ml-4 rounded-md shadow-md border border-gray-200">
            <PrimeTable
              value={job?.items ?? selectedJob.items}
              columns={columns}
              scrollHeight="400px"
              header={header}
              globalFilter={globalFilterValue}
              globalFilterFields={["itemName", "quantity","description","notes"]}
              selection={selectedRowItem}
              onSelectionChange={(e) => {
                setSelectedRowItem(e.value);
                setVisible({ editJobVisible: true });
              }}
              selectionMode="single"
              editMode={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryDashboard;

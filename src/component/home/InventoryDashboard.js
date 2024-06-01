import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PrimeTable from '../primeTable/PrimeTable';
import { useJobsStore } from '../../store/useJobsStore';
import inventoryColumns from '../columns/inventoryColumns';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import EditJobs from '../modals/EditJobs';

const InventoryDashboard = () => {

  const { jobs, setJobs } = useJobsStore((state) => ({
    jobs: state.jobs,
    setJobs: state.setJobs
}));
  const [visible, setVisible] = useState({
    editJobVisible: false
  });
  const navigate = useNavigate()
  const location = useLocation();

  const toast = useRef(null);
  
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedRowItem, setSelectedRowItem] = useState(null);

  // console.log({ category,nameJob,items })

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };


  const renderHeader = () => {
    return (
      <div className="flex justify-end items-center ">
        <div className="relative w-full max-w-md">
          <input
            className="w-full border border-gray-300 rounded-md p-1 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    );
  };

  const updateItems = (updatedItem) => {
    // Assuming jobs.items is the array of items
    const updatedJobs = { ...jobs, items: jobs.items.map((job) =>
      job.id === updatedItem.id ? updatedItem : job
    )};
    setJobs(updatedJobs);
  };
  
  const columns = inventoryColumns();

  const header = renderHeader();
  

  return (
    <>
      <Dialog
        header="Edit the job"
        visible={visible.editJobVisible}
        style={{ width: '50vw', }}
        onHide={() => {
          setVisible({ editJobVisible: false });
          setSelectedRowItem(null);
        }}
      >
        {visible.editJobVisible && <EditJobs
          setVisible={setVisible}
          visible={visible}
          selectedRowItem={selectedRowItem}
          setSelectedRowItem={setSelectedRowItem}
          updateItems={updateItems}
          toast={toast}
        />}
      </Dialog>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900 w-full">
        <div className="flex p-4 bg-gray-50 text-gray-900 w-full">
          {/* Sidebar */}
          <div className='w-[20%] bg-white rounded-md shadow-md border p-4'>
            <div className='bg-[#f8f8f8] border p-2 text-center font-medium text-gray-700 rounded-md'>
              {jobs.nameJob}
            </div>
            <div className='mt-4 text-center text-gray-700'>
              <span className='font-semibold'>Category:</span> {jobs?.category.name}
            </div>
            <button
                    className="border rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal"
                    onClick={()=> navigate(`/`)}
                >
                    Go Back<i className="pi pi-check"></i>
                </button>
          </div>

          {/* Jobs Table */}
          <div className="rounded-md shadow-md border border-gray-200 w-full ml-4">
            <PrimeTable
              value={Array.isArray(jobs.items) ? jobs.items : []}
              columns={columns}
              scrollHeight="400px"
              header={header}
              globalFilter={globalFilterValue}
              globalFilterFields={["itemName", "status.name"]}
              selection={selectedRowItem}
              onSelectionChange={(e) => {
                setSelectedRowItem(e.value);
                setVisible({ editJobVisible: true })
              }}
              selectionMode={'single'}
              editMode={false}
            />
          </div>
        </div>
      </div>
    </>

  );
};

export default InventoryDashboard;
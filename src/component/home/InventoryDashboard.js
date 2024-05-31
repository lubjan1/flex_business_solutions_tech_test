import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PrimeTable from '../primeTable/PrimeTable';
import { useJobsStore } from '../../store/useJobsStore';
import inventoryColumns from '../columns/inventoryColumns';

const InventoryDashboard = () => {
  const { id } = useParams();
  const { jobs, setJobs } = useJobsStore(state => ({
    jobs: state.jobs,
    setJobs: state.setJobs
  }));
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const location = useLocation();
  const selectedRow = location.state.selectedRow;
  
  const [selectedItems, setSelectedItems] = useState(selectedRow?.items || []);
  const [selectedRowItem, setSelectedRowItem] = useState(null);

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const columns = inventoryColumns();

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

  const header = renderHeader();

  return (
    <div className="flex p-4 bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className='w-[20%] bg-white rounded-md shadow-md border p-4'>
        <div className='bg-[#f8f8f8] border p-2 text-center font-medium text-gray-700 rounded-md'>
          {selectedRow?.nameJob}
        </div>
        <div className='mt-4 text-center text-gray-700'>
          <span className='font-semibold'>Category:</span> {selectedRow?.category?.name}
        </div>
      </div>

      {/* Jobs Table */}
      <div className="rounded-md shadow-md border border-gray-200 w-full ml-4">
        <PrimeTable
          value={selectedItems}
          columns={columns}
          scrollHeight="400px"
          header={header}
          globalFilter={globalFilterValue}
          globalFilterFields={["itemName", "status.name"]}
          selection={selectedRowItem}
          onSelectionChange={(e) => {
            setSelectedRowItem(e.value);
          }}
          selectionMode={'single'}
          editMode={false}
        />
      </div>
    </div>
  );
};

export default InventoryDashboard;

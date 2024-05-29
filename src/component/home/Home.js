import React, { useState } from 'react'
import { useJobsStore } from '../../store/useUsersStore'
import PrimeTable from '../primeTable/PrimeTable'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';

const Home = () => {
    
    const { jobs } = useJobsStore((state) => ({
        jobs: state.jobs,
    }))
    
    const [globalFilterValue, setGlobalFilterValue] = useState([]);
    console.log({jobs});

    const statusCounts = jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, {});

    console.log({statusCounts});
    const columns = [
        { 
            field: 'nameJob',
            header: 'Jobsite Name',
        },
        { 
            field: 'status', 
            header: 'Status',
            body:(row)=> {
                return <span className={
                    `${row.status === 'Completed' ? 'p-tag p-tag-success' : ''} 
                     ${row.status === 'In Progress' ? 'p-tag p-tag-error' : ''} 
                     ${row.status === 'On Hold' ? 'p-tag p-tag-warning' : ''}`
                  }>
                    {row.status}
                  </span>
            }
        },
    ];

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value)
    };


    const renderHeader = () => {
        return (
            <div className="flex justify-end gap-2">
                <input className='border border-slate-400 rounded-md outline-none font-normal p-0.5' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                <button className='border rounded-md px-2 py-0.5 bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 font-normal' >Create<i className="pi pi-plus"></i></button>
            </div>
        );
    };

    const header = renderHeader();

    
    return (

        <div className="p-6 flex flex-col justify-end h-screen">
            <div className='grid grid-cols-3 gap-3 mb-10'>
                <div className='border p-6 rounded-md w-8/12'>
                    <h1 className='border-b text-center'>Content 1</h1>
                </div>
                <div className='border p-6 rounded-md w-8/12'>
                    <h1 className='border-b text-center'>Content 2</h1>
                </div>
                <div className='border p-6 rounded-md w-8/12'>
                    <h1 className='border-b text-center'>Content 3</h1>
                </div>
            </div>
            <div className='border rounded-md'>
                <PrimeTable
                    value={jobs}
                    columns={columns}
                    scrollHeight='500px'
                    header={header}
                    globalFilter={globalFilterValue}
                    globalFilterFields={['nameJob', 'status']}
                />
            </div>
        </div>
    )
}

export default Home
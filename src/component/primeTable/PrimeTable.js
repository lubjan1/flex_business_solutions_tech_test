import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PrimeTable = ({
    columns = [],
    value,
    scrollHeight,
    header,
    globalFilter,
    globalFilterFields,
    selection,
    onSelectionChange,
    selectionMode,
    editMode,
    sortable=true,
    children,
    ...props
}) => {


    return (
        <div className="card">
            <DataTable
                value={value}
                tableStyle={{ minWidth: '50rem' }}
                size="sm"
                scrollHeight={scrollHeight}
                sortMode="single"
                stripedRows
                scrollable
                removableSort
                header={header}
                globalFilter={globalFilter}
                globalFilterFields={globalFilterFields}
                className="white-header"
                selectionMode={selectionMode}
                selection={selection}
                onSelectionChange={onSelectionChange}
                editMode={editMode}
                {...props}
            >
                 {children}
                {columns.map((column) => (
                    <Column  key={column.field} {...column} />
                ))}
            </DataTable>
        </div>
    );
};

export default PrimeTable;

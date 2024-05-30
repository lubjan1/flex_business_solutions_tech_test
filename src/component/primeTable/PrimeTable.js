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
    editMode
}) => {
    const columnsToShow = () => {
        return columns.map((column, index) => (
            <Column
                key={index}
                field={column.field}
                header={column.header}
                body={column.body}
                editor={column.editor}
                sortable
                showAddButton
            />
        ));
    };

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
            >
                {columnsToShow()}
            </DataTable>
        </div>
    );
};

export default PrimeTable;

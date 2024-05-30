
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

 const PrimeTable = ({
    columns=[],
    value,
    scrollHeight,
    header,
    globalFilter,
    globalFilterFields,
    selection,
    onSelectionChange,
    onChange
}) => {

    const columnsToShow = () => {
        return columns.map((column) => (
            <Column
                key={column.field}
                field={column.field}
                header={column.header}
                body={column.body}
                sortable
                showAddButton
        />
        ))
    }

    return (
        <div className="card">
            <DataTable
                value={value}
                tableStyle={{ minWidth: '50rem', }}
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
                selectionMode="single" 
                selection={selection}
                onSelectionChange={onSelectionChange}
                onChange={onChange}
            >
                {columnsToShow()}
            </DataTable>
        </div>
    )
}

export default PrimeTable
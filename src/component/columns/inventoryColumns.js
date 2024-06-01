
const inventoryColumns = () => {
    return [
        {
          field: 'id',
          header: 'Id',
          style: { width: "200px" },
          sortable:true,
          body: (rowData) => rowData?.id,
        },
        {
          field: 'itemName',
          header: 'ItemName',
          style: { width: "200px" },
          sortable:true,
          body: (rowData) => rowData?.itemName,
        },
        {
          field: 'quantity',
          header: 'Quantity',
          style: { width: "200px" },
          sortable:true,
          body: (rowData) => rowData?.quantity,
        },
        {
          field: 'description',
          header: 'Description',
          sortable:true,
          style: { width: "200px" },
          body: (rowData) => rowData?.description,
        },
        {
          field: 'notes',
          header: 'Notes',
          sortable:true,
          style: { width: "200px" },
          body: (rowData) => rowData?.notes,
        },
      ]
}

export default inventoryColumns







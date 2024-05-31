
const inventoryColumns = () => {
    return [
        {
          field: 'id',
          header: 'Id',
          style: { width: "200px" },
          body: (rowData) => rowData?.id,
        },
        {
          field: 'itemName',
          header: 'ItemName',
          style: { width: "200px" },
          body: (rowData) => rowData?.itemName,
        },
        {
          field: 'quantity',
          header: 'Quantity',
          style: { width: "200px" },
          body: (rowData) => rowData?.quantity,
        },
        {
          field: 'description',
          header: 'Description',
          style: { width: "200px" },
          body: (rowData) => rowData?.description,
        },
        {
          field: 'notes',
          header: 'Notes',
          style: { width: "200px" },
          body: (rowData) => rowData?.notes,
        },
      ]
}

export default inventoryColumns







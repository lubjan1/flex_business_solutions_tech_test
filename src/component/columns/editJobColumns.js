
const editJobColumns = ({
  textEditor,
  statusEditor,
  categoryEditor
}) => {
  return [
    {
      field: 'nameJob',
      header: 'Job Name',
      editor: textEditor,
      style:{ width:"200px" }
    },
    {
      field: 'status',
      header: 'Status',
      editor: statusEditor,
      body: (rowData) => rowData.status.name,
      style:{ width:"200px" }

    },
    {
      field: 'category',
      header: 'Category',
      editor: categoryEditor,
      body: (rowData) => rowData.category.name,
      style:{ width:"200px" }
    } 
  ];
};

export default editJobColumns;

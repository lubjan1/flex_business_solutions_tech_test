import { Dropdown } from "primereact/dropdown";
import { jobCategories, jobStatuses } from "../../store/generateJob";

const editJobColumns = ({
  textEditor,
  dropdownEditor,
}) => {
  return [
    {
        field: "nameJob",
        header: "Jobsite Name",
        editor: (options) => textEditor(options),
        style:{ width:"150px" }
    },
    {
        field: "status.name",
        header: "Status",
        editor: (options) => dropdownEditor(options, jobStatuses),
        body: (rowData) => rowData.category.name,
        style:{ width:"150px" }
    },
    {
        field: "category.name",
        header: "Category",
        editor: (options) => dropdownEditor(options, jobCategories),
        body: (rowData) => rowData.category.name,
        style:{ width:"150px" }
    },
  ];
};

export default editJobColumns;



const mainColumns = () => {
    return [
        {
            field: "nameJob",
            header: "Jobsite Name",
            sortable:true,
        },
        {
            field: "status.name",
            header: "Status",
            sortable:true,
            body: (row) => {
                return (
                    <span className={`
                        ${row.status.name === "Completed" ? "p-tag p-tag-success" : ""} 
                        ${row.status.name === "On Hold" ? "p-tag p-tag-warning" : ""}
                        ${row.status.name === "In Progress" ? "p-tag p-tag-progress" : ""}
                    `}>
                        {row.status.name}
                    </span>
                );
            },
        },
    ];
}

export default mainColumns
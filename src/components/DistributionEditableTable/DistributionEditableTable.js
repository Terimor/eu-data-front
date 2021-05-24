import MaterialTable from "material-table";
import React from "react";

const DistributionEditableTable = (props) => {
    const data = props.data.data;
    const [columns] = React.useState(data[0].map((element, index) => (
        {field: index, title: element}
    )));
    const rows = data.slice(1).map((row) => {
        let rowObj = {};
        row.forEach((elem, index) => rowObj[index] = elem);

        return rowObj;
    });

    return (
        <MaterialTable
            columns={columns}
            data={rows}
            title={null}
        />
    );
}

export {DistributionEditableTable};

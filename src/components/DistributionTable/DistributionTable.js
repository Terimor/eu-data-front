import MaterialTable from "material-table";
import React from "react";

const DistributionTable = (props) => {
    const data = props.data.data;
    const [columns] = React.useState(Object.keys(data[0]).map((element) => (
        {field: element, title: element}
    )));

    console.log(data, columns);

    return (
        <MaterialTable
            columns={columns}
            data={data}
            title={null}
        />
    );
}

export {DistributionTable};

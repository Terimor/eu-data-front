import MaterialTable from "material-table";
import React from "react";

const DistributionEditableTable = (props) => {
    const {data, setData} = props;
    const columns = Object.keys(data[0]).map((element) => (
        {field: element, title: element}
    ));

    return (
        <MaterialTable
            columns={columns}
            data={data.map(row => Object.assign({}, row))}
            title={null}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }, 1000)
                    }),
            }}
        />
    );
}

export {DistributionEditableTable};

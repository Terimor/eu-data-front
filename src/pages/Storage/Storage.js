import DatasetList from "../../components/DatasetList";
import React from "react";
import {getDatasets} from "../../api";
import DatasetEditModal from "../../components/DatasetEditModal";

const Storage = () => {
    const [datasets, setDatasets] = React.useState([]);
    const [modalState, setModalState] = React.useState({
        datasetId: null,
        isModalOpen: false
    });


    React.useEffect(() => {
        getDatasets().then((result) => {
            setDatasets(result.data.dataset_collection);
        });
    }, []);

    const handleDatasetClick = (dataset) => {
        setModalState({...modalState, isModalOpen: true, datasetId: dataset.id});
    }

    const setModalOpen = (isModalOpen) => {
        setModalState({...modalState, isModalOpen: isModalOpen});
    }

    return (
        <div>
            {!!datasets.length && <DatasetList
                data={datasets}
                handleDatasetClick={handleDatasetClick}
            />}
            <DatasetEditModal
                {...modalState}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}

export {Storage};

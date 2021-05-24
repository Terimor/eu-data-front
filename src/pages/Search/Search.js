import React from 'react';
import SearchForm from "../../components/SearchForm";
import {searchDatasets} from "../../api";
import DatasetList from "../../components/DatasetList";
import {perPage} from "../../const/pagination";
import DatasetModal from "../../components/DatasetModal";

const Search = () => {
    const [datasets, setDatasets] = React.useState([]);
    const [datasetsAmount, setDatasetsAmount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchParams, setSearchParams] = React.useState({});
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [selectedDatasetId, setDatasetId] = React.useState(null);

    React.useEffect(() => {
        if (datasets.length) {
            handleSearch();
        }
    }, [currentPage]);

    const handleSearch = (params = null) => {
        if (params) {
            setSearchParams(params);
        } else {
            params = searchParams;
        }

        params.per_page = perPage;
        params.page = currentPage;

        searchDatasets(params).then((result) => {
            setDatasets(result.data.dataset_collection)
            setDatasetsAmount(result.data.total_datasets_amount);
        });
    }

    const handleDatasetClick = (datasetId) => {
        setDatasetId(datasetId);
        setModalOpen(true);
    }

    return (
        <div>
            <SearchForm submitHandle={handleSearch}/>
            {datasets && <DatasetList
                data={datasets}
                datasetsAmount={datasetsAmount}
                currentPage={currentPage}
                handlePageChange={setCurrentPage}
                handleDatasetClick={handleDatasetClick}
            />}
            <DatasetModal
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                datasetId={selectedDatasetId}
            />
        </div>
    );
}

export {Search};

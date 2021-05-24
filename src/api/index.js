import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const url = (path) => apiUrl + path;

//supplier
export const supplierSearchDatasets = (params) => {
    return axios.post(url('/api/supplier/search'), params);
}

export const supplierGetDataset = (datasetId, usePersist) => {
    return axios.post(url('/api/supplier/get-dataset'), {
        external_id: datasetId,
        use_persist: usePersist
    });
}


//api
export const getDatasets = () => {
    return axios.get(url('/api/datasets'));
}

export const getDataset = (id) => {
    return axios.get(url(`/api/datasets/${id}`));
}
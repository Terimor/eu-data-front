import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const url = (path) => apiUrl + path;

export const searchDatasets = (params) => {
    return axios.post(url('/api/search'), params);
}

export const getDataset = (datasetId, usePersist) => {
    return axios.post(url('/api/get-dataset'), {
        external_id: datasetId,
        use_persist: usePersist
    })
}
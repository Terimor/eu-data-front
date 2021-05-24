import {Pagination} from '@material-ui/lab';
import {perPage} from "../../const/pagination";
import Dataset from "../Dataset";

const getPagesAmount = (datasetsAmount) => Math.ceil(datasetsAmount / perPage);

const DatasetList = (props) => {
    return (
        <div>
            {props.data.map((elem) => (
                <Dataset dataset={elem} onClick={props.handleDatasetClick}/>
            ))}
            <Pagination
                page={props.currentPage}
                count={getPagesAmount(props.datasetsAmount)}
                onChange={(event, value) => props.handlePageChange(value)}
            />
        </div>
    );
}

export {DatasetList};

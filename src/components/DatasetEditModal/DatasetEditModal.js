import {AppBar, Box, Button, Dialog, ListItem, ListItemText, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {getDataset, updateDataset} from "../../api";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {encodeCsv, parseCsv} from "../../utils/csvParser";
import DistributionEditableTable from "../DistributionEditableTable";
import {usePrevious} from "../../hooks/usePrevious";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} >
                    {children}
                </Box>
            )}
        </div>
    );
}

const DatasetEditModal = (props) => {
    const [dataset, setDataset] = React.useState(null);
    const [distributionTabIndex, setDistributionTabIndex] = React.useState(0);
    const oldDistributionTabIndex = usePrevious(distributionTabIndex);
    const [tableData, setTableData] = React.useState([]);

    const datasetId = props.datasetId;
    const isModalOpen = props.isModalOpen;
    const setModalOpen = props.setModalOpen;

    const classes = useStyles();

    const handleSave = () => {
        dataset.distributions[oldDistributionTabIndex].payload = encodeCsv(tableData);
        updateDataset(dataset).then(() => {
            setModalOpen(false);
        });
    };

    React.useEffect(() => {
        if (datasetId && isModalOpen) {
            getDataset(datasetId).then((result) => {
                setDataset(result.data.dataset);
            });
        }
    }, [datasetId, isModalOpen]);

    React.useEffect(() => {
        if (dataset) {
            if (oldDistributionTabIndex) {
                dataset.distributions[oldDistributionTabIndex].payload = encodeCsv(tableData);
            }

            const newTableData = parseCsv(dataset.distributions[distributionTabIndex].payload).data;
            setTableData(newTableData);
        }
    }, [distributionTabIndex, dataset]);

    return (
        <Dialog
            fullScreen
            onClose={() => setModalOpen(true)}
            open={isModalOpen}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setModalOpen(false)} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Перегляд набору даних
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => setModalOpen(false)}>
                        закрити
                    </Button>
                </Toolbar>
            </AppBar>
            {!!dataset && <List>
                {dataset.description_en &&
                <ListItem button>
                    <ListItemText primary="Опис(АНГЛ)" secondary={dataset.description_en}/>
                </ListItem>}
                <Divider/>
                {dataset.description_de &&
                <ListItem button>
                    <ListItemText primary="Опис(НІМ)" secondary={dataset.description_de}/>
                </ListItem>}
                <Divider/>
                {dataset.description_fr &&
                <ListItem button>
                    <ListItemText primary="Опис(АНГЛ)" secondary={dataset.description_fr}/>
                </ListItem>}
                <Divider/>
                {!!dataset.distributions.length && <div>
                    <AppBar position="static">
                        <Tabs value={distributionTabIndex} onChange={(event, value) => setDistributionTabIndex(value)}>
                            {dataset.distributions.map((elem, index) => (
                                <Tab value={index} key={index} label={elem.format} {...a11yProps(index)}/>
                            ))}
                        </Tabs>
                    </AppBar>
                    {dataset.distributions.map((elem, index) => (
                        <TabPanel value={distributionTabIndex} index={index} key={index}>
                            {!!tableData.length && <DistributionEditableTable
                                data={tableData}
                                setData={setTableData}
                            />}
                        </TabPanel>
                    ))}
                </div>}
                <Box p={5} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleSave}>Зберегти</Button>
                </Box>
            </List>}
        </Dialog>
    );
}

export {DatasetEditModal};

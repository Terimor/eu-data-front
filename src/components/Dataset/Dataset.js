import {ListItem, ListItemText, Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React from "react";

const Dataset = (props) => {
    const dataset = props.dataset;

    return (
        <Paper style={{padding: 10, marginTop: 20, cursor: "pointer"}} onClick={() => props.onClick(dataset)}>
            <List>
                <ListItem button>
                    <ListItemText primary="Країна" secondary={dataset.country_code}/>
                </ListItem>
                <Divider/>
                {dataset.description_en &&
                <ListItem>
                    <ListItemText primary="Опис(АНГЛ)" secondary={dataset.description_en}/>
                </ListItem>}
                <Divider/>
                {dataset.description_de &&
                <ListItem>
                    <ListItemText primary="Опис(НІМ)" secondary={dataset.description_de}/>
                </ListItem>}
                <Divider/>
                {dataset.description_fr &&
                <ListItem>
                    <ListItemText primary="Опис(АНГЛ)" secondary={dataset.description_fr}/>
                </ListItem>}
            </List>
        </Paper>
    );
}

export {Dataset};

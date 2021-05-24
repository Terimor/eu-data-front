import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import StorageIcon from '@material-ui/icons/Storage';
import {Link} from 'react-router-dom';

export const menuItems = (
    <div>
        <ListItem button component={Link} to="/search">
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Пошук інформації"/>
        </ListItem>
        <ListItem button component={Link} to="/storage">
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary="Сховище"/>
        </ListItem>
    </div>
);
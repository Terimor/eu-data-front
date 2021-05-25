import React from 'react'
import {Box, Button, MenuItem, Paper, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const dataScopes = [
    {
        value: '',
        label: '-'
    },
    {
        value: 'countryData',
        label: 'Країна',
    },
    {
        value: 'eu',
        label: 'Європа',
    },
    {
        value: 'io',
        label: 'Світ'
    }
];

const SearchForm = (props) => {
    const [searchPattern, setSearchPattern] = React.useState('');
    const [dataScope, setDataScope] = React.useState('');

    const onSubmit = () => {
        const params = {
            query: searchPattern
        };

        props.submitHandle(params);
    };

    return (
        <Paper style={{padding: 20}}>
            <form noValidate autoComplete="off">
                <Box display="flex" justifyContent="space">
                    <TextField
                        required
                        label="Шаблон пошуку"
                        value={searchPattern}
                        onChange={(event) => setSearchPattern(event.target.value)}
                    />
                    <TextField
                        select
                        label="Контекст даних"
                        value={dataScope}
                        onChange={(event) => setDataScope(event.target.value)}
                        style={{minWidth: 150}}
                    >
                        {dataScopes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={onSubmit} style={{marginLeft: 20}}>
                        Пошук <SearchIcon/>
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export {SearchForm};
import {readString, jsonToCSV} from 'react-papaparse';

const POSSIBLE_COLUMN_DELIMITERS = [',', ';', '\t'];
const ROW_DELIMITER = '\n';
const TRUTHFUL_CHARACTERS_AMOUNT = 300;

const matchesAmount = (payload, char) => {
    return payload.split(char).length - 1;
}

const getDelimiters = (payload) => {
    let delimitersValue = [];

    POSSIBLE_COLUMN_DELIMITERS.forEach((elem) => {
        delimitersValue.push(matchesAmount(payload, elem));
    });

    const maxWeight = Math.max(...delimitersValue);
    const maxWeightIndex = delimitersValue.indexOf(maxWeight);

    return [ROW_DELIMITER, POSSIBLE_COLUMN_DELIMITERS[maxWeightIndex]];
}

export const parseCsv = (payload) => {
    const [rowDelimiter, columnDelimiter] = getDelimiters(payload.slice(0, TRUTHFUL_CHARACTERS_AMOUNT));

    return readString(payload, {delimiter: columnDelimiter, newline: rowDelimiter, skipEmptyLines: true, header: true});
};

export const encodeCsv = (data) => {
    return jsonToCSV(data);
};
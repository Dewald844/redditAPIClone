import csv_reader from 'csv-parser';
import csv_writer from 'csv-writer';
import fs from 'fs';

export const readFromFileStream = async (filename) => {
    return new Promise((resolve, reject) => {
        let rows = [];
        fs.createReadStream(filename)
            .pipe(csv_reader())
            .on('data', (row) => {
                console.log('Parsed row:', row);
                rows.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(rows);
            })
            .on('error', (error) => {
                reject("Error reading CSV file: " + error);
            });
    });
};

export const appendToFileStream = async (filename, headerMap, data) => {
    const csvWriter = csv_writer.createObjectCsvWriter({
        path: filename,
        header: headerMap,
        append: true
    });

    try {
        await csvWriter.writeRecords([data]);
        console.log("CSV file successfully written");
    } catch (err) {
        console.log("Error writing CSV file: " + err);
    }
};

export const rewriteToFileStream = async (filename, headerMap, data) => {
    const csvWriter = csv_writer.createObjectCsvWriter({
        path: filename,
        header: headerMap,
    });

    try {
        await csvWriter.writeRecords(data);
        console.log("CSV file successfully updated");
    } catch (err) {
        console.log("Error writing CSV file: " + err);
    }
};
const fs = require('fs');
const path = require('path');

const convertToJSON = (fileName) => {
    if(!checkIfCorrectInput(fileName)) return 1;;
    const encoding = 'utf-8';
    const lineSeparator =  new RegExp(/\r\n/g);
    const itemsDelimiter = ',';
    const fileUrl = path.join(__dirname, fileName);
    const jsonFileName = cutExtention(fileName) + '.json';
    const buff = [];

    console.log('Beginning convertation of', fileName);
    fs.readFile(fileUrl, encoding, (error, data) => {
        if (error) console.log(error);
        const dataArr = data.split(lineSeparator);
        const keys = dataArr[0].split(itemsDelimiter);
        populateDataToObj(buff, dataArr, keys, itemsDelimiter);
        const resultData = JSON.stringify(buff);

        fs.writeFile(jsonFileName, resultData, (error) => {
            if (error) return console.error(error)
            console.log('Writing is done.')
        });
    });

    console.log('Convertation complete');
};

const checkIfCorrectInput = (fileName) => {
    if(!fileName) {
        console.log('Please provide a filename!');
        return false;
    }
    if (!fs.existsSync(fileName)) {
        console.log(`${fileName} not found`);
        return false;
    }
    return true;
}

const populateDataToObj = (buff, dataArr, keys, itemsDelimiter = ',') => {
    let i = 1;
    while(i < dataArr.length - 1) {
        const dataObj = {}
        const dataArrItem = dataArr[i].split(itemsDelimiter);
        keys.forEach((item, index) => {
            dataObj[item] = dataArrItem[index];
        })
        buff.push(dataObj);
        i++;
    }
    return(buff);
}

const cutExtention = (name) => {
    const dotPosition = name.lastIndexOf('.');
    return name.slice(0, dotPosition);
}

convertToJSON(process.argv[2]);
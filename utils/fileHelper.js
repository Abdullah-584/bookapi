const fs = require("fs");

// Read JSON File
const readData = (filePath) => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

// Write JSON File
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData,
};
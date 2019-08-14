


// const tableData = [
//     {
//         Name: null,
//         Address: null,
//         FavoriteFood: null,
//         EyeColor: null,
//         IsActive: true,
//     },
// ]

const dataWithOptions = {
    Name: ["Bill Oswald", "John Screed", "Jill Batchford", "Ashley Briar"],
    Address: ["123 East St", "321 West Street", "1359 North Bradshaw Drive", "1 New Brunswock Ln"],
    FavoriteFood: ["Hot Dogs", "Hamburger", "Soup", "Tea"],
    EyeColor: ["Green", "Blue", "Brown", "Other"],
    IsActive: [true, false],
}

const pickRandomValue = function (options) {
    return options[Math.floor(Math.random() * options.length)];
}

const htmlCollectionToArr = function (collection) {
    let arr = [];
    for (let i = 0; i < collection.length; i++) {
        arr.push(collection[i])
    }
    return arr;
}

const buildRowFromDataEntry = function (data) {
    let row = document.createElement('tr');
    Object.keys(data).forEach( function(property) {
        let cell = document.createElement('td');
        cell.innerText = pickRandomValue(data[property]);
        row.appendChild(cell);
    })
    return row;
}

const buildTableWithData = function (data, rowCount) {
    const mainTable = document.getElementById("table-body");

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < rowCount; i++) {
        fragment.appendChild(buildRowFromDataEntry(data))
    }

    mainTable.appendChild(fragment)
}

const getHeaderWidths = function(sourceHeaderRowId) {
    const sourceTableHeader = document.getElementById(sourceHeaderRowId);
    let widthsArr = []
    const headerCells = htmlCollectionToArr(sourceTableHeader.children);
    headerCells.forEach( function (cell) {
        widthsArr.push(cell.clientWidth);
    })
    return widthsArr;
}

const setShadowHeaderWidths = function (shadowHeaderId, widthsArr) {
    const shadowHeader = document.getElementById(shadowHeaderId)
    // const headerCells = Array.from(shadowHeader.children)
    const headerCellsArr = htmlCollectionToArr(shadowHeader.children);
    
    if (widthsArr.length === headerCellsArr.length) {
        synchWidths(widthsArr, headerCellsArr);
    }
}

const synchWidths = function (sourceElements, targetElement) {
    for(let i = 0; i < sourceElements.length; i++) {
        targetElement[i].width = sourceElements[i] - 9 + "px";
    }
}

buildTableWithData(dataWithOptions, 40);
const sourceWidths = getHeaderWidths("main-table-header-row");
setShadowHeaderWidths("shadow-header", sourceWidths)

const whenResized = function () {
    const newSourceWidths = getHeaderWidths("main-table-header-row");
    setShadowHeaderWidths("shadow-header", newSourceWidths)
}
import { requestData } from './requestData_fromFile.js';

//test function to create DIV element purely from JS file 
function displayMenu(menuOutHTML) {
    const div = document.createElement('div');
    div.textContent = `Displaying menu \n ${menuOutHTML}`;
    document.body.appendChild(div);
}

const menuFile = "./config/menuInfo.json"
var menuData = requestData(menuFile);
// const menuDataStr = JSON.stringify(menuData);
const menuDataStr = JSON.stringify(menuData,null,2); //spacing level = 2, which is pretty print
console.log(menuDataStr);


displayMenu(menuDataStr);

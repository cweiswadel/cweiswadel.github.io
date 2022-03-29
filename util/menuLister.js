//test function to create DIV element purely from JS file 
function displayMenu(menuOutHTML) {
    const div = document.createElement('div');
    div.textContent = `Displaying menu ${menuOutHTML}`;
    document.body.appendChild(div);
}

//takes input from a file (reads it as a string), and then returns as obj
function requestData(inFile) {
    var request = new XMLHttpRequest(), outObj;
    request.open('GET', inFile, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log(request.responseText);
        outObj = JSON.parse(request.responseText);
        return outObj;
    } else {
        console.log(`Non successfull GET call: ${request.responseText}`);
    }
}

const menuFile = "./config/menuInfo.json"
var menuData = requestData(menuFile);
// const menuDataStr = JSON.stringify(menuData);
const menuDataStr = JSON.stringify(menuData,null,2); //spacing level = 2, which is pretty print


displayMenu(menuDataStr);

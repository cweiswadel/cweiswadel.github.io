//test function to create DIV element purely from JS file 
function displayMenu(menuOutHTML) {
    const div = document.createElement('div');
    div.textContent = `Displaying menu ${text}`;
    document.body.appendChild(div);
}

function requestData(inFile) {
    var request = new XMLHttpRequest(), outObj;
    request.open('GET', inFile, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        // console.log(request.responseText);
        outObj = JSON.parse(request.responseText);
        return outObj;
    } else {
        console.log(`Non successfull GET call: ${request.responseText}`);
    }
}

const menuFile = ""
var menuData = requestData()
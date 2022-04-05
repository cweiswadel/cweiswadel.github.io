/////////////////////////////////////////////////
//takes input from a file (reads it as a string), and then returns as obj
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
export { requestData };
/////////////////////////////////////////////////



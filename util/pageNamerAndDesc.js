

function getPageName(file) {

}

function wrapAsParaEle(input) {
    return `<p>${input}</p>`;
}

function wrapAsHeaderEle(inStr) {
    return `<title> ${inStr}</title>`;
}

function hello(text) {
    const div = document.createElement('div');
    div.textContent = `Hello ${text}`;
    document.body.appendChild(div);
}


var path = window.location.pathname;
// var pathSplit = path.split("/");
var page = path.split("/").pop(); //gives the file name with extension
var pageName = page.split(".").shift();
console.log(path);
// console.log( pathSplit );
console.log(page);
console.log(pageName);

document.getElementById('curFilePath').innerHTML = wrapAsParaEle(path);
document.getElementById('curFileName').innerHTML = wrapAsParaEle(page);

function loadJSON(inFile, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', inFile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

async function init(inFile) {
    loadJSON(inFile, function (response) {
        // Parse JSON string into object
        var outData = JSON.parse(response);
        console.log(outData)
    });
}

const pageDirFile = './config/pageInfo.json';
var jsonData = await init(pageDirFile);
console.log(jsonData);

//testing json data stored locally in this file to test offline/locally
testJSONData = { "pageDirectory": [{ "pageName": "home", "pageFile": "index.html", "pageSort": 0, "pageInfo": { "pageTitle": "pageTitle", "pageHeader": "pageHeader", "pageDesc": "pageDescription" } }, { "pageName": "1", "pageFile": "page1.html", "pageSort": 1, "pageInfo": { "pageTitle": "pageTitle", "pageHeader": "pageHeader", "pageDesc": "pageDescription" } }, { "pageName": "2", "pageFile": "page2.html", "pageSort": 2, "pageInfo": { "pageTitle": "pageTitle", "pageHeader": "pageHeader", "pageDesc": "pageDescription" } }, { "pageName": "listContentTEST", "pageFile": "listContentTEST.html", "pageSort": 3, "pageInfo": { "pageTitle": "pageTitle", "pageHeader": "pageHeader", "pageDesc": "pageDescription" } }] };



function getPageName(file){
    
}

function wrapAsParaEle(input){
    return `<p>${input}</p>`;
}

function wrapAsHeaderEle(inStr){
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
console.log( path );
// console.log( pathSplit );
console.log( page );
console.log( pageName );

document.getElementById('curFilePath').innerHTML = wrapAsParaEle(path);
document.getElementById('curFileName').innerHTML = wrapAsParaEle(page);

function loadJSON(inFile,callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', inFile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (!(xobj.readyState == 4 && xobj.status == "200")) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 function init(inFile) {
    loadJSON(inFile,function(response) {
     // Parse JSON string into object
       var outData = JSON.parse(response);
       console.log(outData)
    });
   }

const pageDirFile = './config/pageInfo.json';
var jsonData = init(pageDirFile);
console.log(jsonData);
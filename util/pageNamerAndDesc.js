

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
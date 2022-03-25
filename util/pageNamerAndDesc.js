//function to take data and wrap in <p> tags
function wrapAsParaEle(input) {
    return `<p>${input}</p>`;
}

//function to take data and wrap in <title> tags; for use to create a default title element
function wrapAsTitleEle(inData) {
    return `<title>${inData}</title>`
}

//function to wrap data in <h1> tag
function wrapAsH1Ele(inStr) {
    return `<h1> ${inStr}</h1>`;
}

//function to wrap an array of elements in the <body> tag
function wrapAsBodyEle(inArr) {
    outArr = inArr;
    outArr.unshift('<body>'); //add element to beginning of array
    outArr.push('</body>'); //add element to end of array
    return outArr;
}

//function to take any array and join with \n => mainly used to make wrapAsBodyEle() output HTML ready
function outHtml(inArr) {
    return inArr.join('\n');
}

//accepts any amount of arguments and puts all arguments together into a single array
function htmlEleArrBuilder(){
    outArr = [];
    for (let i=0;i<arguments.length;i++){
        outArr.push(argument[i]);
    }
    return outArr;
}

//test function to create DIV element purely from JS file 
function hello(text) {
    const div = document.createElement('div');
    div.textContent = `Hello ${text}`;
    document.body.appendChild(div);
}

//page dir for page configuration json
const pageDirFile = './config/pageInfo.json';

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
/////////////////////////////////////////////////

//inputData must be an object //requestData function does that conversion already
function createPageTitleHTML(inputData) {
    const curPath = window.location.pathname;
    var dataArr = inputData["pageDirectory"];
    var winPage = curPath.split("/").pop();
    const foundPageInfo = dataArr.find(element => element['pageFile'] == winPage);
    inPageName = foundPageInfo['pageName'];
    inPageTitle = foundPageInfo['pageInfo']['pageTitle'];
    titleOut = wrapAsTitleEle(`${inPageName} -- ${inPageTitle}`);
    return titleOut; //returns string for <title> html ele
}

//build base <body> element containing information from input configuration data(file)
function createPageBodyBaseHTML(inputData) {
    var curPath = window.location.pathname;
    console.log(winPageName);
    var winPage = curPath.split("/").pop(); //gives the file name with extension
    var winPageName = curPath.split(".").shift(); //gives the file name header (before the file ext)

    var inPageArr = inputData['pageDirectory'];
    var inPageName, inPageTitle, inPageFile, inPageDesc, inPageFile, inPageHeader;
    var titleOut, arrOut = [];
    for (let i = 0; i < inPageArr.length; i++) {
        inPageFile = inPageArr[i]['pageFile'];
        console.log(inPageFile);
        if (inPageFile == winPage) {
            inPageHeader = inPageArr[i]['pageInfo']['pageHeader'];
            inPageDesc = inPageArr[i]['pageInfo']['pageDesc'];
            inPageFile = inPageArr[i]['pageFile'];
            arrOut.push(wrapAsH1Ele(inPageHeader));
            arrOut.push(wrapAsParaEle(inPageDesc));
            arrOut.push(wrapAsParaEle(`The current page file is: ${inPageFile}`));

        }
    }
    return arrOut;
}

var pageData = requestData(pageDirFile);

var outTitleHTML = createPageTitleHTML(pageData);
document.getElementById('title').innerHTML = outTitleHTML;

var bodyHTMLArr = createPageBodyBaseHTML(pageData);
var outBodyHtml = outHtml(bodyHTMLArr);
document.getElementById('bodyHTML').innerHTML = outBodyHtml;



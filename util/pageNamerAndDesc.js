import { requestData } from './requestData_fromFile.js';

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


//inputData must be an object //requestData function does that conversion already
function createPageTitleHTML(inputData) {
    // console.log(inputData);
    const curPath = window.location.pathname;
    // console.log(curPath);
    var dataArr = inputData["pageDirectory"];
    // console.log(dataArr)
    var winPage = curPath.split("/").pop();
    // console.log(winPage);
    var foundPageInfo = dataArr.find(element => element['pageFile'] == winPage);
    // console.log(foundPageInfo);
    var inPageName = foundPageInfo['pageName'];
    var inPageTitle = foundPageInfo['pageInfo']['pageTitle'];
    var titleOut = wrapAsTitleEle(`${inPageName} -- ${inPageTitle}`);
    return titleOut; //returns string for <title> html ele
}

//build base <body> element containing information from input configuration data(file)
function createPageBodyBaseHTML(inputData) {
    var curPath = window.location.pathname;
    var winPage = curPath.split("/").pop(); //gives the file name with extension
    var winPageName = curPath.split(".").shift(); //gives the file name header (before the file ext)
    // console.log(winPageName);

    var inPageArr = inputData['pageDirectory'];
    var inPageName, inPageTitle, inPageFile, inPageDesc, inPageFile, inPageHeader;
    var titleOut, arrOut = [];
    for (let i = 0; i < inPageArr.length; i++) {
        inPageFile = inPageArr[i]['pageFile'];
        // console.log(inPageFile);
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

//page dir for page configuration json
const pageDirFile = './config/pageInfo.json';
var pageData = requestData(pageDirFile);

var outTitleHTML = createPageTitleHTML(pageData);
document.getElementById('title').innerHTML = outTitleHTML;

var bodyHTMLArr = createPageBodyBaseHTML(pageData);
var outBodyHtml = outHtml(bodyHTMLArr);
document.getElementById('bodyHTML').innerHTML = outBodyHtml;


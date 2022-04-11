import { requestData } from './requestData_fromFile.js';
// import { outHtml, htmlEleArrBuilder } from './pageNamerAndDesc.js'

//test function to create DIV element purely from JS file 
function displayMenuRaw(menuOutHTML) {
    const para = document.createElement('p');
    const div = document.createElement('div');

    div.id = "menuListData";
    div.innerHTML = menuOutHTML;
    para.id = "menuText";
    para.textContent = `Displaying menu`;

    const anchorElement = document.getElementById('menuLister');
    anchorElement.appendChild(para);
    anchorElement.appendChild(div);
}

function listMenuSection(menuDataObj) {
    console.log(`listing menu section (desserts vs drinks vs etc.)`)
    //take a menuData (object) variable and then allows selection of an element from the "menuSections" value 
    var menuSectionArr = menuDataObj["menuSections"];

    var anchorEle = document.getElementById('menuSections');
    var opt = document.createElement('option');
    var optInfoText = `--Please select menu--`;
    opt.id = "helpText"
    opt.value = null;
    opt.innerHTML = optInfoText;
    console.log(opt)
    anchorEle.appendChild(opt);

    var menuSectionName;
    for (let i = 0; i < menuSectionArr.length; i++) {
        var loopOpt = document.createElement('option');
        console.log(menuSectionArr[i]);
        menuSectionName = menuSectionArr[i]['menuSectionName'];
        console.log(menuSectionName);
        loopOpt.id = menuSectionName;
        loopOpt.value = menuSectionName;
        loopOpt.innerHTML = menuSectionName;
        console.log(loopOpt);
        anchorEle.appendChild(loopOpt);
    }
}

document.getElementById('menuSections').onchange = function () {
    var menuList = document.getElementById("menuSections"); //for taking data from select field "menuSections"
    var parentNode = document.getElementById("selectedMenu"); // establishing parent node/anchor element
    var childNode = document.createElement('input'); //creating a childNode to dynamically change based on select "menuSelections"

    //establishing values and parameters for the child node -- this will be the reflected output 
    childNode.type = "text", childNode.size = "20", childNode.id = "selectedMenuChild", childNode.value = menuList.options[menuList.selectedIndex].text;

    var textNode = document.createElement('p') //creating a descriptive text element
    textNode.innerHTML = "Selected Menu: "; //text of p element

    //since this function is ONCHANGE, remove any listed choices and then re-append/display the newest choice
    //this while loop clears ALL child nodes from parentNode
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
    parentNode.appendChild(textNode);
    parentNode.appendChild(childNode);
}

const menuFile = "./config/menuInfo.json"
var menuData = requestData(menuFile);
console.log(menuData);
// const menuDataStr = JSON.stringify(menuData);
// const menuDataStr = JSON.stringify(menuData, null, 2); //spacing level = 2, which is pretty print
// console.log(menuDataStr);

// displayMenuRaw(menuData);
listMenuSection(menuData);

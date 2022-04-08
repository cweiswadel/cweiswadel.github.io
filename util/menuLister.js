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

//function to select an item from a drop down and update a text box/form from the selection
document.getElementById('myList').onchange = function() {
    var mylist = document.getElementById("myList");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
}

function listMenuSection(menuDataObj){
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
    for(let i=0;i<menuSectionArr.length;i++){
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





const menuFile = "./config/menuInfo.json"
var menuData = requestData(menuFile);
console.log(menuData);
// const menuDataStr = JSON.stringify(menuData);
// const menuDataStr = JSON.stringify(menuData, null, 2); //spacing level = 2, which is pretty print
// console.log(menuDataStr);

displayMenuRaw(menuData);
listMenuSection(menuData);

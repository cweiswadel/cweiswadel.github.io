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

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//function to build list of options in the dropdown(select with child option elements)
function listMenuSection(menuDataObj, anchorPointID) {
    console.log(`listing menu section (desserts vs drinks vs etc.)`)
    //take a menuData (object) variable and then allows selection of an element from the "menuSections" value 
    var menuSectionArr = menuDataObj["menuSections"];

    //anchorPointID is the ID of the element in the HTML that the 
    var anchorEle = document.getElementById(anchorPointID);
    var opt = document.createElement('option'); //create an option element (dropdown)
    var optInfoText = `--Please select menu--`; //default text to be displayed in the dropdown
    opt.id = "helpText", opt.value = null, opt.innerHTML = optInfoText; //create and set values for dropdown element 
    // console.log(opt)
    anchorEle.appendChild(opt); //appending the dropdown into the anchor point

    var menuSectionName; //init a var for the name of items to be added in the dropdown 
    for (let i = 0; i < menuSectionArr.length; i++) {
        var loopOpt = document.createElement('option'); //while in the loop create an option element
        // console.log(menuSectionArr[i]);
        menuSectionName = menuSectionArr[i]['menuSectionName']; //get the menuSection name from the menuSectionArr
        // console.log(menuSectionName);
        loopOpt.id = menuSectionName, loopOpt.value = menuSectionName, loopOpt.innerHTML = menuSectionName; //set the values of the option to be added to the dropdown list
        // console.log(loopOpt);
        anchorEle.appendChild(loopOpt); //adding element into dropdown of possibilities
    }
}

function getNextNodeID(inputNodeID) {
    let curEle = document.getElementById(inputNodeID);
    let siblingEleID = curEle.nextElementSibling.id;
    return siblingEleID;
}

// function formatMenuSelectionDataObj_forTable(menuSectionObj) {
//     if(menuSectionObj==undefined){
//         //menuSectionObj has been initialized yet
//         console.log('Awaiting input of menuSectionSelector');
//     } else {
//         console.log(menuSectionObj);
//         var tableHeader = menuSectionObj.menuSectionName;
//         console.log(tableHeader);
//     }

// }

function onChangeOfDropDown(selectEleID, displayNodeID, displayText, dataObj) {
    document.getElementById(selectEleID).onchange = function () {
        var userSelectList = document.getElementById(selectEleID); //for taking data from select field "menuSections"
        // var parentNode = document.getElementById("selectedMenu"); // establishing parent node/anchor element, which will be the next node after selectEleID (nextElementSibling)
        var parentNode = document.getElementById(getNextNodeID(selectEleID)); // establishing parent node/anchor element, which will be the next node after selectEleID (nextElementSibling)
        var childNode = document.createElement('input'); //creating a childNode to dynamically change based on select "menuSelections"

        //establishing values and parameters for the child node -- this will be the reflected output 
        childNode.type = "text", childNode.size = "20", childNode.id = displayNodeID, childNode.value = userSelectList.options[userSelectList.selectedIndex].text, childNode.readOnly = true;

        var textNode = document.createElement('p') //creating a descriptive text element
        textNode.innerHTML = displayText; //text of p element

        var dataNode = document.createElement('article');

        var dataObjArr = dataObj['menuSections'], menuSectionName, menuSectionElement, outData;
        console.log(dataObjArr);
        for (let i = 0; i < dataObjArr.length; i++) {
            menuSectionElement = dataObjArr[i];
            menuSectionName = dataObjArr[i]['menuSectionName'];
            outData = 'No menu selected...yet';
            if (menuSectionName === childNode.value) {
                console.log(menuSectionName);
                outData = menuSectionElement; //defining the output variable, an object that contains the selected menu section (includes an array of items, and attributes with the items)
                console.log(`outData:`);
                console.log(outData);
                break;
            }
        }
        // console.log(JSON.stringify(outData, null, 2));
        dataNode.innerHTML = outData;
        dataNode.id = 'rawDataNode';

        //since this function is ONCHANGE, remove any listed choices and then re-append/display the newest choice
        //this while loop clears ALL child nodes from parentNode
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
        //add nodes to get correct output/display
        parentNode.appendChild(textNode);
        parentNode.appendChild(childNode);
        parentNode.appendChild(dataNode);

        //testing

        var tableNode = document.createElement('table') //create a table node for display of the selected menu sec
        tableNode.id = 'menuSecTable'; //defining the id of the html element
        console.log(tableNode);
        // console.log(outData);
        var tableHeader = outData.menuSectionName; //using the object of selected menu, define the variables for display in the table //menuSectionName = Desserts, Drinks, Etc.
        var fullDataArr = outData.menuItems; //the array of items in this menu section (ALL ITEMs in the specifc section)
        var foodTypesArr = [], foodTypeCtObj = {};

        //loop to count the distinct foodTypeName entries //storing it as foodTypeCtObj
        for (let i = 0; i < fullDataArr.length; i++) {
            var foodTypeName = fullDataArr[i].menuItemType.foodType;
            foodTypeCtObj[foodTypeName] = foodTypeCtObj[foodTypeName] ? foodTypeCtObj[foodTypeName] + 1 : 1;
        }

        console.log(foodTypeCtObj);

        console.log(tableHeader);
        console.log(fullDataArr);
        console.log(foodTypesArr);

        //defining the entire length of the table based on number of items 
        var totalColSpan = fullDataArr.length;

        tableNode.setAttribute("class", "table table-hover table-dark"); //setting the class of the tableNode to a predefined bootstrap class
        var tableNode_tHead = tableNode.createTHead(); //Create THead element for the table header
        //format of table entries
        /*
        <table>
            <thead>
                <tr>
                    <th colspan="3">Main Table Header</th>
                </tr>
                <tr>
                    <th colspan="2">Table Sub-header 1</th>
                    <th colspan="1">Table Sub-header 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The table body</td>
                    <td>with two columns</td>
                    <td>with 3 columns</td>
                </tr>
            </tbody>
        </table>        
        */

        var headerMenuSec_tr = document.createElement('tr');
        var headerMenusSec_th = document.createElement('th');
        headerMenusSec_th.innerHTML = capitalize(tableHeader), headerMenusSec_th.colSpan = totalColSpan, headerMenusSec_th.scope = 'col', headerMenusSec_th.style.textAlign = 'center';
        tableNode_tHead.appendChild(headerMenuSec_tr);
        headerMenuSec_tr.appendChild(headerMenusSec_th);

        // var headerFoodTypeRow;
        var headerFoodType_tr = document.createElement('tr');
        for (const [foodTypeName, count] of Object.entries(foodTypeCtObj)) {
            console.log(`${foodTypeName} : ${count}`);
            var headerFoodType_th = document.createElement('th');
            headerFoodType_th.colSpan = count, headerFoodType_th.innerText = capitalize(foodTypeName);
            console.log(headerFoodType_th.innerHtml);
            headerFoodType_tr.appendChild(headerFoodType_th);
        }
        tableNode_tHead.appendChild(headerFoodType_tr);

        // headerMenuCell.innerHTML = tableHeader;

        // var headerFoodTypeRow = headerMenuSec.insertRow(1);

        // for(let i=0; i<totalColSpan; i++){


        // }

        parentNode.appendChild(tableNode);




        return outData; //return the dataNode as an html element to manipulate separately 
    }
}

//function to take the dataNode input and manipulate it into human readable display (the actual menu display)
//take the input of a dataNode (element agnostic)




const menuFile = "./config/menuInfo.json"
var menuDataObj = requestData(menuFile);
console.log(menuDataObj);

// displayMenuRaw(menuData);
const menuSecID = 'menuSections', selectMenuSecID = 'selectedMenuSecChild', selectMenuSecTxt = "Selected Menu Section: ";
var runMenuListFn = listMenuSection(menuDataObj, menuSecID);
runMenuListFn;

var runOnChangeMenuSecList = onChangeOfDropDown(menuSecID, selectMenuSecID, selectMenuSecTxt, menuDataObj);
runOnChangeMenuSecList;






// var runOnChangeMenuInput = onChangeOfInput()

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

function createFoodItemTD(foodItem, foodPrice, foodOptionsArr) {
    var tdEle = document.createElement('td');
    var selectEle = document.createElement('select');
    selectEle.id = `${foodItem}_toppings`;
    var optEle_info = document.createElement('option');
    optEle_info.id = `${foodItem}_helpText`, optEle_info.value = null, optEle_info.innerHTML = '--Please select topping--';
    selectEle.appendChild(optEle_info);
    if (Array.isArray(foodOptionsArr) != true) {
        //the toppings is not an array or does not exist
        selectEle.remove();
    } else {
        for (let i = 0; i < foodOptionsArr.length; i++) {

            var optEle_loop = document.createElement('option');
            optEle_loop.id = `${foodItem}_${foodOptionsArr[i]}`, optEle_loop.innerHTML = `${foodOptionsArr[i]}`;
            selectEle.appendChild(optEle_loop);
        }
    }
    var innerTextContent = `${foodItem} \n $${foodPrice} \n`;
    tdEle.innerText = innerTextContent;
    tdEle.appendChild(selectEle);
    return tdEle;
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
        console.log(dataNode);

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
        console.log(fullDataArr);
        if (fullDataArr != undefined) {
            for (let i = 0; i < fullDataArr.length; i++) {
                var foodTypeName = fullDataArr[i].menuItemType.foodType;
                foodTypeCtObj[foodTypeName] = foodTypeCtObj[foodTypeName] ? foodTypeCtObj[foodTypeName] + 1 : 1;
            }



            console.log(foodTypeCtObj); //object which shows the menuItemType.foodType and count of such from fullDataArr

            console.log(tableHeader);
            console.log(fullDataArr); //fullDataArr for selected menu
            console.log(foodTypesArr);

            //defining the entire length of the table based on number of items 
            var totalColSpan = fullDataArr.length;

            tableNode.setAttribute("class", "table table-hover table-dark"); //setting the class of the tableNode to a predefined bootstrap class
            var tableNode_tHead = tableNode.createTHead(); //Create THead element for the table header
            var headerMenuSec_tr = document.createElement('tr'); //creating table row entry for menu section header
            var headerMenusSec_th = document.createElement('th'); //creating table header row entry for menu section header, following schema above

            headerMenusSec_th.innerHTML = capitalize(tableHeader), headerMenusSec_th.colSpan = totalColSpan, headerMenusSec_th.scope = 'col', headerMenusSec_th.style.textAlign = 'center';

            tableNode_tHead.appendChild(headerMenuSec_tr); //add the tr element onto the thead element
            headerMenuSec_tr.appendChild(headerMenusSec_th); //add the th element onto the tr element

            //loop to create the th elements as needed for the different food types
            var headerFoodType_tr = document.createElement('tr'); //create a tr to nest all the th elements into
            for (const [foodTypeName, count] of Object.entries(foodTypeCtObj)) { //read from the entries in the foodTypeCtObj for the th inner texts and col span
                console.log(`${foodTypeName} : ${count}`);
                var headerFoodType_th = document.createElement('th');
                headerFoodType_th.colSpan = count, headerFoodType_th.innerText = capitalize(foodTypeName), headerFoodType_th.id = foodTypeName;
                console.log(headerFoodType_th);
                headerFoodType_tr.appendChild(headerFoodType_th); //nest the th within the tr
            }
            tableNode_tHead.appendChild(headerFoodType_tr); // add the newly created tr into the thead

            var menuSecItem_tbody = tableNode.createTBody();
            var menuSecItem_tr = document.createElement('tr'); //table row entry for the list of td items for the selected menu
            menuSecItem_tbody.appendChild(menuSecItem_tr);

            //fullDataArr contains all the info for the selected menu
            //info needed to show: foodShortName, ppu, then dropdown for toppings
            let foodItemsArr = [], foodItemObj = {};

            //breaking down the fullDataArr for the values needed to display the menu
            //storing it as an array foodItemsArr of all items belonging to the selected menu
            for (let i = 0; i < fullDataArr.length; i++) {
                var foodShortName = fullDataArr[i].menuItemType.foodShortName; //display name
                var foodType = fullDataArr[i].menuItemType.foodType; //foodtype 
                var foodPPU = fullDataArr[i].ppu; //price 
                var foodToppingObjArr = fullDataArr[i].topping; //arr containing ID of toppings, and topping

                //breaking down the foodToppingObjArr to only get toppings for food item
                var foodToppingArr = [];
                if (Array.isArray(foodToppingObjArr) == true) {
                    foodToppingObjArr.forEach(element =>
                        foodToppingArr.push(element.type));
                } else {
                    foodToppingArr = ['None']; //default the value of the topping array to None if undefined/not an array
                }

                //create an object to pull from for creation of the html elements
                foodItemObj = {
                    foodItemType: foodType, //type
                    foodItemdisplayName: foodShortName, //display name
                    foodItemPrice: foodPPU, //price
                    foodToppings: foodToppingArr //arr of ONLY toppings matching the item 
                };
                foodItemsArr.push(foodItemObj);
            }
            console.log(foodItemsArr);

            //running through the foodItemsArr to populate the hTML TD element with the function createFoodItemTD
            for (let i = 0; i < foodItemsArr.length; i++) {
                var foodItem = foodItemsArr[i].foodItemdisplayName; //item name
                var foodPrice = foodItemsArr[i].foodItemPrice; //item price
                var foodOptionsArr = foodItemsArr[i].foodToppings; //item toppings --> used to create a dropdown of options available 
                console.log(createFoodItemTD(foodItem, foodPrice, foodOptionsArr));
                menuSecItem_tr.append(createFoodItemTD(foodItem, foodPrice, foodOptionsArr));
                var menuSecItem_td = document.createElement('td'); //table data entry for the items found in the selected menu section
            }

            parentNode.appendChild(tableNode);
        }




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

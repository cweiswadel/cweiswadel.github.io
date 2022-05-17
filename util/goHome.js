const homeLink = "./index.html"

function createHrefEle(linkStr, outPutEle){
    return `<a class="page-link" href=${linkStr}>${outPutEle}</a>`
    
}

function createW3HomeButton(homeText){
    return `<button class="w3-btn w3-orange w3-xlarge"; position="absolute"; bottom="0px";>${homeText}<i class="w3-margin-left fa fa-home"></i></button>`
}

const homeTextStr = `Home`;
document.getElementById('homeButton').innerHTML = createHrefEle(homeLink, createW3HomeButton(homeTextStr));

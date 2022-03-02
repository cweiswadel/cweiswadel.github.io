var linksArr = ['index.html','page1.html']; 

function getHtml(template) {
    return template.join('\n');
}

function listify(item){
    return `<li class="page-item"><a class="page-link" href="./${item}">${item}</a></li>`;
}

var mapLinksArr = linksArr.map(listify);
console.log(`mapLinksArr = ${mapLinksArr}`);

// const ulElement = document.createElement("ul");
const htmlOut = ['<ul>',mapLinksArr,'</ul>'];
console.log(htmlOut);

document.getElementById('linkList').innerHTML = getHtml(htmlOut);
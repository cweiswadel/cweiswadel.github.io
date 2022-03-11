var linksArr = ['index.html','page1.html']; 

function getHtml(template) {
    return template.join('\n');
}

function listify(item){
    return `<li class="page-item"><a class="page-link" href="./${item}">${item}</a></li>`;
}

var mapLinksArr = linksArr.map(listify);
console.log(`mapLinksArr = ${mapLinksArr}`);

var htmlOutArr = [];
htmlOutArr.push('<ul>');
for (let i=0;i<mapLinksArr.length;i++){
    htmlOutArr.push(mapLinksArr[i]);
}
htmlOutArr.push('</ul>');
console.log(`htmlOutArr = ${htmlOutArr}`);
console.log(`getHtml(htmlOutArr) = ${getHtml(htmlOutArr)}`);

document.getElementById('linkList').innerHTML = getHtml(htmlOutArr);
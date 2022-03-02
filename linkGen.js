var linksArr = ['index.html','page1.html']; 

function getHtml(template) {
    return template.join('\n');
}

function listify(item){
    return `<li class="page-item"><a class="page-link" href="./${item}">${item}</a></li>`;
}

function listLinks(inArr){
    var listArr = inArr.map(listify);
    var htmlOut = [`<ul>`,`<p> List of links </p>`,listArr,`</ul>`];
    console.log(htmlOut);
    document.getElementById('linkList').innerHTML = getHtml(htmlOut);
}
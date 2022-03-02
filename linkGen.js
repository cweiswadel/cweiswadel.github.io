var linksArr = ['index.html','page1.html']; 

function getHtml(template) {
    return template.join('\n');
}

function listify(item){
    return `<li class="page-item"><a class="page-link" href="./${item}">${item}</a></li>`;
}

function listLinks(inArr){
    var listArr = [];
    for (let i=0;i<inArr.length;i++){
        listArr.push(listify(inArr[i]));
    }
    var htmlOut = [`<ul>`,`<p> List of links </p>`,listArr,`</ul>`];
    console.log(htmlOut);
    document.getElementById('linkList') = getHtml(htmlOut);
}
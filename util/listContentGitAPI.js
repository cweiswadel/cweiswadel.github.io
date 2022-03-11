var scriptGHOwner = "cweiswadel", scriptGHRepo = "cweiswadel.github.io";
var outScript = `<script type="module" id="apiCallScript"> 
import { request } from "https://cdn.skypack.dev/@octokit/request"; 

const reqRes = await request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: ${scriptGHOwner},
    repo: ${scriptGHRepo}
})    

const outObj = reqRes.data;
var outStr = JSON.stringify(outObj, null, 2); // spacing level = 2 & pretty printing for JSON 

var arrNames = [];
var contentName = outObj.forEach(function(obj){
    arrNames.push(obj.name);
});


document.getElementById('listContent_outStr').innerHTML = outStr;
document.getElementById('listContent_arrNames').innerHTML = arrNames;
console.log(arrNames);

</script>`;
// return document.getElementById('listContent').innerHTML = returnScript();


console.log(outScript);
document.getElementById('scriptGitHub').innerHTML = outScript;


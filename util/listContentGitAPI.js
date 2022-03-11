//import { request } from "https://cdn.skypack.dev/@octokit/request";
// import request as myModule from "https://cdn.skypack.dev/@octokit/request";
// import request from 'https://cdn.skypack.dev/@octokit/request.js';

import("https://cdn.skypack.dev/@octokit/request")
  .then(module => {
    module.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: "cweiswadel",
        repo: "cweiswadel.github.io"
    })
  })
  .catch(err => {
    main.textContent = err.message;
  });

const ghOwner = "cweiswadel", ghRepo = "cweiswadel.github.io";
console.log(`ghOwner = ${ghOwner} \n ghRepo = ${ghRepo}`);

// var apiCall = await octokit.request(`GET /repos/${ghOwner}/${ghRepo}/contents/`);
//https://api.github.com/repos/cweiswadel/cweiswadel.github.io/contents/

const reqRes = await request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: ghOwner,
    repo: ghRepo
})

// console.log(`reqRes.data = ${reqRes.data}`);


// console.log(`apiCall = ${apiCall} \n typeof apiCall = ${typeof apiCall}`);
const outObj = reqRes.data;
console.log(`typeof outObj = \n ${typeof outObj}`);
var outStrJS = JSON.stringify(outObj, null, 2); // spacing level = 2 & pretty printing for JSON 
console.log(`outStrJS = \n ${outStrJS}`);

document.getElementById('listContentFromJS').innerHTML = outStrJS;

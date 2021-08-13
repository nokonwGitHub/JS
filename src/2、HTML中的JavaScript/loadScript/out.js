let outVal = "outVal";

function outFun() {
    console.log("outFun")
}

const app = document.querySelector("#app")

const outInterval = setInterval(() => {
    let div = document.createElement("div")
    div.innerText = new Date().toString();
    app.appendChild(div)
}, 1000)


module["out.js"] = {
    outVal,
    outFun,
    outInterval
}

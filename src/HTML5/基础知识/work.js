onmessage = async (event) => {
    console.log(event)
    let a = await fetch("http://localhost:63342/JavaScript%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/src/HTML5/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/index.html?_ijt=cgdt4vm7minebbrjndrh3l83e&_ij_reload=RELOAD_ON_SAVE")
    console.log((await a.blob()))
}


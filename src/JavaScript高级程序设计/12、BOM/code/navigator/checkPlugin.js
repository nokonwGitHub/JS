const hasPlugin = (name) => {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().includes(name)) {
            return true
        }
    }
    return false
}

const hasIEPlugin = (name) => {
    try {
        new ActiveXObject(name)
        return true
    } catch {
        return false
    }
}


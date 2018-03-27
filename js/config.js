function setConfig(){
    var texts = {
        "title":"Shop Center"
    };
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();
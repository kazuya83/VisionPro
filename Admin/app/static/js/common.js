function postConnect(data, url) {
    var response;
    var post = $.ajax({
        type: "POST",
        url,
        data,
        async: false,
        timeout: 5000,
        dataType: "json",
        success: function(_response) {
            response = _response;
            return _response;
        },
        error: function(error) {
            console.log("Error occurred in keyPressed().");
            console.log(error);
            return null;
        }
    })
    return response;
}

function removeAllChildren(parentElement) {
    while(parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function generateDiv(id, className, textContent) {
    const div = document.createElement('div');
    div.id = id;
    div.className = className;
    div.textContent = textContent;
    return div;
}

function IsEmpty(value) {
    return value === null || value === undefined || value.length === 0;
}
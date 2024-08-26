function fieldsNotEmpty(...fields) {
    return fields.every(field => {
        return Object.prototype.toString.call(field) === '[object String]'
            ? /[^\s]+/.test(field)
            : field === 0 ? true : !!field;
    })
}

function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return /^http(?:s){0,1}:$/.test(url.protocol);
    } catch (_) {
        return false;  
    }
}

function isValidImageUrl(string){
    if (isValidHttpUrl(string)) {
        var arr = [ "jpeg", "jpg", "gif", "png" ];
        var ext = string.substring(string.lastIndexOf(".")+1);
        
        return !!arr.find(item => item === ext);
    } else {
        return false;
    }
}

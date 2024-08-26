function fieldsNotEmpty(...fields) {
    return fields.every(field => {
        return Object.prototype.toString.call(field) === '[object String]'
            ? /[^\s]+/.test(field)
            : field === 0 ? true : !!field;
    })
}

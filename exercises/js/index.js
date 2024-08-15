function MAIOR_MENOR(formId) {
    const values = Array.from(
        document
            .querySelector(`#${formId}`)
            ?.querySelectorAll('input')
    )?.map((input) => input.valueAsNumber)?.filter(value => !isNaN(value)).sort((a, b) => a - b);

    console.log('values', values);

    if (!values) {
        alert('Formulário não encontrado.')
    } else if (values.length < 2) {
        alert('Insira pelo menos dois valores.')
    } else {
        alert(`Maior valor: ${values.pop()}\nMenor valor: ${values.shift()}`)
    }
}

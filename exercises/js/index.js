function MAIOR_MENOR(formId) {
    const values = Array.from(
        document
            .querySelector(`form#${formId}`)
            ?.querySelectorAll('input')
    )?.map((input) => input.valueAsNumber)?.filter(value => !isNaN(value)).sort((a, b) => a - b);

    if (!values) {
        alert('Formulário não encontrado.');
    } else if (values.length < 2) {
        alert('Insira pelo menos dois valores.');
    } else {
        alert(`Maior valor: ${values.pop()}\nMenor valor: ${values.shift()}`);
    }
}

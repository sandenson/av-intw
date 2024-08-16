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

function VOGAL(formId) {
    const letter = Array.from(
        document
            .querySelector(`form#${formId}`)
            ?.querySelectorAll('input[type=text]')
    )?.map((input) => input.value)?.shift()?.charAt(0);

    console.log("letter", letter);

    if (!letter) {
        alert('Preencha uma letra.');
    } else if (!/[a-z]{1}/i.test(letter)) {
        alert('Valor inserido não é uma letra');
    } else {
        const vowel = /[aeiou]{1}/i.test(letter);

        vowel ? alert(`"${letter}" é uma vogal`) : alert(`"${letter}" é uma consoante`);

        return Number(vowel);
    }
}

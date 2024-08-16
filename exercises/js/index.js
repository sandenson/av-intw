function MAIOR_MENOR(formId) {
    const values = Array.from(
        document
            .querySelector(`form#${formId}`)
            ?.querySelectorAll('input')
    )?.map((input) => input.valueAsNumber)?.filter(value => !isNaN(value))?.sort((a, b) => a - b);

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

function LIMITES(formId) {
    const values = Array.from(
        document
            .querySelector(`form#${formId}`)
            ?.querySelectorAll('input')
    )?.map((input) => input.valueAsNumber)
    ?.filter(value => !isNaN(value))
    ?.sort((a, b) => a - b)
    ?.map((value, i) => {
        if (value % 2 === 0) {
            return value;
        } else {
            return i === 0 ? value + 1 : value - 1
        }
    });

    console.log(values);

    if (!values) {
        alert('Formulário não encontrado.');
    } else if (values.length !== 2) {
        alert('Insira dois valores.');
    } else {
        const numbers = Array.from(
            { length: values[1] - values[0] + 1 },
            (_, index) => values[0] + index
        ).filter(value => value % 2 === 0);

        const sum = numbers.reduce((a, b) => a + b);

        console.log({ numbers, sum });

        alert('Resultados no console');
    }
}

function ORDEM(formId) {
    const values = Array.from(
        document
            .querySelector(`form#${formId}`)
            ?.querySelectorAll('input')
    )?.map((input) => input.valueAsNumber)?.filter(value => !isNaN(value))?.sort((a, b) => a - b);

    if (!values) {
        alert('Formulário não encontrado.');
    } else if (values.length < 2) {
        alert('Insira pelo menos dois valores.');
    } else {
        alert(`Valores em ordem: ${values.reduce((a, b) => `${a}, ${b}`)}`);
    }
}

function POSITIVO_NEGATIVO(formId) {
    const number = document
        .querySelector(`form#${formId}`)
        ?.querySelector('input[type=number]')
        ?.valueAsNumber;

    if (!number) {
        alert('Preencha um número inteiro diferente de 0.');

        return false;
    } else {
        number > 0
            ? alert('O número é positivo')
            : alert('O número é negativo');

        return number > 0;
    }
}

function PAR_IMPAR(formId) {
    const number = document
        .querySelector(`form#${formId}`)
        ?.querySelector('input[type=number]')
        ?.valueAsNumber;

    if (!number) {
        alert('Preencha um número inteiro diferente de 0.');

        return false;
    } else {
        number % 2 === 0
            ? alert('O número é par')
            : alert('O número é ímpar');

        return number % 2 === 0;
    }
}

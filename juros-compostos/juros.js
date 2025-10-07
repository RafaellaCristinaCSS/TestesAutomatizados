export function calcularMontante(capital, taxa, tempo) {
    if (capital < 0 || taxa < 0 || tempo < 0) {
        throw new Error('Os valores não podem ser negativos.');
    }
    return capital * Math.pow(1 + taxa, tempo);
}

export function calcularJuros(capital, taxa, tempo) {
    if (capital < 0 || taxa < 0 || tempo < 0) {
        throw new Error('Os valores não podem ser negativos.');
    }
    return calcularMontante(capital, taxa, tempo) - capital;
}

export function calcularTaxa(capital, montante, tempo) {
    if (capital <= 0 || montante <= 0 || tempo <= 0) {
        throw new Error('Os valores devem ser maiores que zero.');
    }
    return Number((Math.pow(montante / capital, 1 / tempo) - 1).toFixed(4));

}

export function calcularTempo(capital, montante, taxa) {
    if (capital <= 0 || montante <= 0 || taxa <= 0) {
        throw new Error('Os valores devem ser maiores que zero.');
    }
    return Math.log(montante / capital) / Math.log(1 + taxa);
}

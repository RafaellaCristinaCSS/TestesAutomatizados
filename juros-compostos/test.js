import test from 'ava';
import {
    calcularMontante,
    calcularJuros,
    calcularTaxa,
    calcularTempo
} from './juros.js';

// --- Testes de comportamento ---

test('Deve calcular o montante corretamente com taxa positiva', t => {
    const resultado = calcularMontante(1000, 0.05, 2);
    t.is(Number(resultado.toFixed(2)), 1102.50);
});

test('Deve calcular o montante corretamente com taxa negativa (desvalorização)', t => {
    const resultado = calcularMontante(1000, -0.05, 2);
    t.is(Number(resultado.toFixed(2)), 902.50);
});

test('Deve calcular corretamente apenas o valor dos juros acumulados', t => {
    const juros = calcularJuros(1000, 0.05, 2);
    t.is(Number(juros.toFixed(2)), 102.50);
});

test('Deve calcular corretamente a taxa de juros a partir do capital e montante', t => {
    const taxa = calcularTaxa(1000, 1102.5, 2);
    t.is(Number(taxa.toFixed(4)), 0.05);
});

test('Deve calcular corretamente o tempo necessário para atingir o montante', t => {
    const tempo = calcularTempo(1000, 1102.5, 0.05);
    t.true(Math.abs(tempo - 2) < 0.01);
});

// --- Testes de limites e erros ---

test('Deve lançar erro se o capital for zero em calcularTaxa', t => {
    const erro = t.throws(() => calcularTaxa(0, 1100, 2));
    t.is(erro.message, 'Os valores devem ser maiores que zero.');
});

test('Deve lançar erro se a taxa for zero em calcularTempo', t => {
    const erro = t.throws(() => calcularTempo(1000, 1100, 0));
    t.is(erro.message, 'Os valores devem ser maiores que zero.');
});

test('Deve lidar corretamente com taxa zero (nenhum crescimento)', t => {
    const resultado = calcularMontante(1000, 0, 5);
    t.is(resultado, 1000);
});

test('Deve lidar com montante igual ao capital (tempo zero)', t => {
    const tempo = calcularTempo(1000, 1000, 0.05);
    t.is(tempo, 0);
});

// --- Testes de borda ---

test('Deve lidar com capital muito grande', t => {
    const resultado = calcularMontante(1e9, 0.05, 1);
    t.is(Number(resultado.toFixed(2)), 1.05e9);
});

test('Deve lidar com tempo muito grande', t => {
    const resultado = calcularMontante(1000, 0.05, 100);
    t.is(Number(resultado.toFixed(2)), Number((1000 * Math.pow(1.05, 100)).toFixed(2)));
});

test('Deve lidar com taxa muito pequena', t => {
    const resultado = calcularMontante(1000, 0.0001, 100);
    t.is(Number(resultado.toFixed(2)), Number((1000 * Math.pow(1.0001, 100)).toFixed(2)));
});

test('Deve lançar erro se montante for zero em calcularTaxa', t => {
    const erro = t.throws(() => calcularTaxa(1000, 0, 2));
    t.is(erro.message, 'Os valores devem ser maiores que zero.');
});

test('Deve lançar erro se capital ou montante forem negativos em calcularMontante', t => {
    const erro1 = t.throws(() => calcularMontante(-1000, 0.05, 2));
    const erro2 = t.throws(() => calcularMontante(1000, 0.05, -2));
    t.is(erro1.message, 'O capital e o tempo não podem ser negativos.');
    t.is(erro2.message, 'O capital e o tempo não podem ser negativos.');
});

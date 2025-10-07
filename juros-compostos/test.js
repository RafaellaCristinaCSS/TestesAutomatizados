import test from 'ava';
import {
    calcularMontante,
    calcularJuros,
    calcularTaxa,
    calcularTempo
} from './juros.js';

test('calcula corretamente o montante', t => {
    const resultado = calcularMontante(1000, 0.05, 2);
    t.is(resultado, 1102.5);
});

test('lança erro se valores forem negativos em calcularMontante', t => {
    const erro = t.throws(() => calcularMontante(-100, 0.05, 2));
    t.is(erro.message, 'Os valores não podem ser negativos.');
});

test('calcula corretamente apenas o valor dos juros', t => {
    const juros = calcularJuros(1000, 0.05, 2);
    t.is(juros, 102.5);
});

test('calcula corretamente a taxa de juros', t => {
    const taxa = calcularTaxa(1000, 1102.5, 2);
    t.is(taxa, 0.05);
});

test('lança erro se valores inválidos forem passados em calcularTaxa', t => {
    const erro = t.throws(() => calcularTaxa(0, 1100, 2));
    t.is(erro.message, 'Os valores devem ser maiores que zero.');
});

test('calcula corretamente o tempo para atingir o montante', t => {
    const tempo = calcularTempo(1000, 1102.5, 0.05);
    t.true(Math.abs(tempo - 2) < 0.01);
});

test('lança erro se valores inválidos forem passados em calcularTempo', t => {
    const erro = t.throws(() => calcularTempo(1000, 0, 0.05));
    t.is(erro.message, 'Os valores devem ser maiores que zero.');
});

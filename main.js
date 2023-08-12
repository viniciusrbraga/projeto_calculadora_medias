/* criação da variavel FORM */
const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji selebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const mediaMinima = parseFloat(prompt("Digite o valor da noma mínima para aprovação .:"));

/* variável LINHAS que vai concatenar todas as linhas criadas dinamicamente */
let linhas = '';

/* criação do evento de SUBMIT */
/* FUNCTION remove o comportamento de atualizar a página */
form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

    /* mostra o conteúdo capturado */
    /* ${} aponta para a variável criada */
    /* alert(`Atividade: ${inputNomeAtividade.value} - Nota:${inputNotaAtividade.value}.`); */
});

function adicionaLinha() {
    /* captura o valor dos campos informados */
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    /* Valida se o que foi informado já está carregado na tabela */
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já está cadastrada na tabela`);
    } else {
        /* adiciona elemento ao array */
        atividades.push(inputNomeAtividade.value);

        /* adiciona elemento ao array convertendo a informação de STRING para DECIMAL */
        notas.push(parseFloat(inputNotaAtividade.value));

        /* variável LINHA vai receber o código HTML com string */
        let linha = '<tr>';

        /* coloca o valor do campo dentro de uma tag TD */
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;

        /* operador ternário valida o conteúdo, sendo ? para verdadeiro e : para falso */
        linha += `<td>${inputNotaAtividade.value >= mediaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</trd>`;

        /* Contatenas a linha criada */
        linhas += linha;
    };

    /* limpa os campos após adicionar o conteúdo na tabela */
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
};

function atualizaTabela() {
    /* recuperando o corpo da tabela */
    const corpoTabela = document.querySelector('tbody');

    /* inserindo um conteúdo dentro de uma TAG */
    corpoTabela.innerHTML = linhas;
};

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    /* TOFIXED limita o número de casas decimais */
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= mediaMinima ? spanAprovado : spanReprovado;

    /* exibe o conteudo na tela */
    /* console.log(atividades); */
    /* console.log(notas); */
};

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}; 
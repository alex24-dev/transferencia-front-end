document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const contaOrigem = document.getElementById('contaOrigem').value;
  const contaDestino = document.getElementById('contaDestino').value;
  const valor = document.getElementById('valor').value;
  const dataTransferencia = document.getElementById('dataTransferencia').value;
  const dataAgendamento = document.getElementById('dataAgendamento').value;

  const dados = {
    contaOrigem,
    contaDestino,
    valor,
    dataTransferencia,
    dataAgendamento
  };

  fetch('http://localhost:8080/api/conta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Sucesso:', data);
    // Aqui você pode exibir uma mensagem de sucesso para o usuário
  })
  .catch((error) => {
    console.error('Erro:', error);
    // Aqui você pode exibir uma mensagem de erro para o usuário
  });
});

function exibirContas(contas) {
  const lista = document.getElementById('lista-contas');
  if (!contas || contas.length === 0) {
    lista.innerHTML = '<div class="alert alert-info">Nenhuma conta encontrada.</div>';
    return;
  }
  lista.innerHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Conta Origem</th>
          <th>Conta Destino</th>
          <th>Valor</th>
          <th>Taxa</th>
          <th>Data Transferência</th>
          <th>Data Agendamento</th>
        </tr>
      </thead>
      <tbody>
        ${contas.map(conta => `
          <tr>
            <td>${conta.contaOrigem || ''}</td>
            <td>${conta.contaDestino || ''}</td>
            <td>${conta.valor || ''}</td>
            <td>${conta.taxa || ''}</td>
            <td>${conta.dataTransferencia || ''}</td>
            <td>${conta.dataAgendamento || ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function buscarContas() {
  fetch('http://localhost:8080/api/conta')
    .then(response => response.json())
    .then(data => exibirContas(data))
    .catch(() => {
      document.getElementById('lista-contas').innerHTML =
        '<div class="alert alert-danger">Erro ao buscar contas.</div>';
    });
}

// Chame ao carregar a página
document.addEventListener('DOMContentLoaded', buscarContas);

// No submit, após sucesso, chame buscarContas()
document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const contaOrigem = document.getElementById('contaOrigem').value;
  const contaDestino = document.getElementById('contaDestino').value;
  const valor = document.getElementById('valor').value;
  const taxa = document.getElementById('taxa').value;
  const dataTransferencia = document.getElementById('dataTransferencia').value;
  const dataAgendamento = document.getElementById('dataAgendamento').value;

  const dados = {
    contaOrigem,
    contaDestino,
    valor,
    taxa,
    dataTransferencia,
    dataAgendamento
  };

  fetch('http://localhost:8080/api/conta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Sucesso:', data);
    buscarContas(); // Atualiza a lista após enviar
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
});
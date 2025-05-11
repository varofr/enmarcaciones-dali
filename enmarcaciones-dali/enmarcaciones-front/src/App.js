import React from 'react';
import ClienteForm from './components/ClienteForm';
import PedidoForm from './components/PedidoForm';

function App() {
  return (
    <div>
      <h1>Enmarcaciones Dalí</h1>
      <h2>Registrar Cliente</h2>
      <ClienteForm />
      <h2>Registrar Pedido</h2>
      <PedidoForm />
    </div>
  );
}

export default App;

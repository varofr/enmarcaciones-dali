import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import ClienteForm from './ClienteForm';
import ListaClientes from './ListaClientes';
import PedidoForm from './PedidoForm';
import ListaPedidos from './ListaPedidos';
import InventarioForm from './InventarioForm';
import ListaInventario from './ListaInventario';
import FlujoCaja from './FlujoCaja';
import Facturacion from './Facturacion';
import EstadisticaInventario from './EstadisticaInventario';

function DashboardLayout() {
  const [activeView, setActiveView] = useState('clientes');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const handleNuevoCliente = (cliente) => {
    fetch('http://localhost:5000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    }).then(() => console.log('Cliente guardado'));
  };

  const handleNuevoPedido = (pedido) => {
    fetch('http://localhost:5000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    }).then(() => console.log('Pedido guardado'));
  };

  const handleNuevoItem = (item) => {
    fetch('http://localhost:5000/api/inventario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }).then(() => console.log('Ítem guardado'));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'clientes':
        return (
          <>
            <h2>Registrar Cliente</h2>
            <ClienteForm onSubmit={handleNuevoCliente} />
            <h2>Clientes Registrados</h2>
            <ListaClientes />
          </>
        );
      case 'pedidos':
        return (
          <>
            <h2>Registrar Pedido</h2>
            <PedidoForm onSubmit={handleNuevoPedido} clientes={clientes} />
            <h2>Pedidos Registrados</h2>
            <ListaPedidos />
          </>
        );
      case 'inventario':
        return (
          <>
            <h2>Agregar al Inventario</h2>
            <InventarioForm onSubmit={handleNuevoItem} />
            <h2>Inventario Actual</h2>
            <ListaInventario />
          </>
        );
      case 'flujo':
        return (
          <>
            <h2>Flujo de Caja</h2>
            <FlujoCaja />
          </>
        );
      case 'facturacion':
        return (
          <>
            <h2>Facturar Pedidos</h2>
            <Facturacion />
          </>
        );
      case 'estadisticas':
        return (
          <>
            <h2>Estadísticas de Inventario</h2>
            <EstadisticaInventario />
          </>
        );
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div id="dashboardMainContainer">
      <div className="dashboard_sidebar" id="dashboard_sidebar">
        <h3 className="dashboard_logo" id="dashboard_logo">IMS</h3>
        <div className="dashboard_sidebar_user">
          <img src="/Images/Molduras/Dalí.jpg" alt="user" id="userImage" />
          <span>Núñez</span>
        </div>
        <div className="dashboard_sidebar_menus">
          <ul className="dashboard_menu_list">
            <li className={activeView === 'clientes' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('clientes'); }}>
                <i className="fa-solid fa-address-book"></i>
                <span className="menuText">Clientes</span>
              </a>
            </li>
            <li className={activeView === 'pedidos' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('pedidos'); }}>
                <i className="fa-solid fa-person-chalkboard"></i>
                <span className="menuText">Gestionar Pedidos</span>
              </a>
            </li>
            <li className={activeView === 'inventario' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('inventario'); }}>
                <i className="fa-solid fa-boxes-stacked"></i>
                <span className="menuText">Inventario</span>
              </a>
            </li>
            <li className={activeView === 'flujo' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('flujo'); }}>
                <i className="fa-solid fa-coins"></i>
                <span className="menuText">Flujo de Caja</span>
              </a>
            </li>
            <li className={activeView === 'facturacion' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('facturacion'); }}>
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span className="menuText">Facturar Pedidos</span>
              </a>
            </li>
            <li className={activeView === 'estadisticas' ? 'menuActive' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('estadisticas'); }}>
                <i className="fa-solid fa-chart-bar"></i>
                <span className="menuText">Estadísticas</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard_content_container" id="dashboard_content_container">
        <div className="dashboard_topNav">
          <a href="#" id="toggleBtn"><i className="fa fa-navicon"></i></a>
         <a   //BOTÓN LOGOUT
  href="#"
  className="logoutBtn"
  onClick={() => {
    localStorage.removeItem('authenticated');
    window.location.href = '/';
  }}
>
  <i className="fa fa-power-off"></i> Log-out
</a>

        </div>
        <div className="dashboard_content">
          <div className="dashboard_content_main">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

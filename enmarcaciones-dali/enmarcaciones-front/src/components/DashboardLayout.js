import React, { useState } from 'react';
import '../css/dashboard.css';
import ClienteForm from './ClienteForm';
import ListaClientes from './ListaClientes';
import PedidoForm from './PedidoForm';
import ListaPedidos from './ListaPedidos';
import InventarioForm from './InventarioForm';
import ListaInventario from './ListaInventario';

function DashboardLayout() {
  const [activeView, setActiveView] = useState('clientes');

  const handleNuevoItem = (item) => {
    fetch('http://localhost:5000/api/inventario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).then(() => {
      console.log('Ítem guardado');
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case 'clientes':
        return (
          <>
            <h2>Registrar Cliente</h2>
            <ClienteForm />
            <h2>Clientes Registrados</h2>
            <ListaClientes />
          </>
        );
      case 'pedidos':
        return (
          <>
            <h2>Registrar Pedido</h2>
            <PedidoForm />
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
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div id="dashboardMainContainer">
      <div className="dashboard_sidebar" id="dashboard_sidebar">
        <h3 className="dashboard_logo" id="dashboard_logo">IMS</h3>
        <div className="dashboard_sidebar_user">
          <img src="/Images/User/Dalí.jpg" alt="user" id="userImage" />
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
          </ul>
        </div>
      </div>

      <div className="dashboard_content_container" id="dashboard_content_container">
        <div className="dashboard_topNav">
          <a href="#" id="toggleBtn"><i className="fa fa-navicon"></i></a>
          <a href="#" className="logoutBtn"><i className="fa fa-power-off"></i> Log-out</a>
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

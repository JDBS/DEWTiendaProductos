class HeaderComponent extends React.Component{
  render(){
    return(
      <div>
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand" href="index.html">
            <img src="./assets/images/eBest.svg" width="65" height="50" className="d-inline-block align-top" alt="Carrito"/>
            <h2>Aplicación de Venta</h2>
          </a>
        </nav>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <div className=" navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="index.html">Inicio <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" id="login">
                <LoginButtonComponent/>
              </li>
              <li className="nav-item" id="producto">
                <CartComponent/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
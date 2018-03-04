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
                <a className="nav-link" href="es/inicio">Inicio <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/es/categorias">Categorías</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/es/contacto">Contacto</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Idiomas
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Español</a>
                  <a className="dropdown-item" href="#">Inglés</a>
                </div>
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
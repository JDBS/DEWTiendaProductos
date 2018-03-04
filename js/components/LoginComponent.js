class LoginComponent extends React.Component{
  componentDidMount(){
    loadLogin();
  }
  render(){
    return(
      <div>
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand" href="index.html">
            <img src="./assets/images/eBest.svg" width="65" height="50" className="d-inline-block align-top" alt="Carrito"/>
            <h2>Aplicación de Venta</h2>
          </a>
        </nav>
        <hr/>
        <br/>
        <div className="container">
          <div className="jumbotron">
              <h1 className="display-5 text-center">iniciar sesión en
                  <strong> EBest</strong>
              </h1>
              <p className="lead text-center">Puede entrar con su cuenta de redes sociales</p>
              <hr className="my-4"/>
              <div className="row">
                <div className="col-12 mx-auto text-center">
                  <a className="btn btn-primary icon-google btn-lg my-1 mx-1" href="#" id="google" role="button">
                      Sign in with Google</a>
                  <a className="btn btn-primary icon-facebook btn-lg my-1 mx-1" href="#" id="facebook" role="button">
                      Sign in with Facebook</a>
                </div>
                <div className="col-12 mx-auto text-center">
                  <a className="btn btn-primary icon-github btn-lg my-1 mx-1" href="#" id="github" role="button">
                      Sign in with GitHub</a>
                  <a className="btn btn-primary icon-twitter btn-lg my-1 mx-1" href="#" id="twitter" role="button">
                      Sign in with Twitter</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
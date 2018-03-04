class LoginComponent extends React.Component{
  componentDidMount(){
    loadLogin();
  }
  render(){
    return(
      
      <div>
        <nav className="navbar navbar-dark bg-dark">
            <div className="logo my-2 ml-3">
                <img src="assets/images/eBest.svg" alt=""/>
            </div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link waves-effect waves-light ml-3" href="index.html">Inicio
                    </a>
                </li>
            </ul>
        </nav>
        <br/>
        <div className="container">
          <div className="jumbotron">
              <h1 className="display-5">Puedes iniciar sesión en
                  <strong>EBest</strong>
              </h1>
              <p className="lead">con su cuenta de redes sociales</p>
              <hr className="my-4"/>
              <div className="row">
                <div className="col-12 mx-auto text-center mt-2">
                  <a className="btn btn-primary btn-lg" href="#" id="google" role="button">
                      <i className="fa fa-google-plus-square"></i> Sign in with Google</a>
                  <a className="btn btn-primary btn-lg" href="#" id="facebook" role="button">
                      <i className="fa fa-facebook-square"></i> Sign in with Facebook</a>
                </div>
                <div className="col-12 mx-auto text-center mt-2">
                  <a className="btn btn-primary btn-lg" href="#" id="github" role="button">
                      <i className="fa fa-github-square"></i> Sign in with GitHub</a>
                  <a className="btn btn-primary btn-lg" href="#" id="twitter" role="button">
                      <i className="fa fa-twitter-square"></i> Sign in with Twitter</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
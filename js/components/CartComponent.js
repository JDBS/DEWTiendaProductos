const CART_SAVE_ID='cart';

class CartComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cart:[]
    }
    this.updateInterval=undefined;
  }

  componentDidMount(){
    this.cartUpdate();
    if(!this.updateInterval){
      this.updateInterval=setInterval(this.cartUpdate.bind(this),200);
    }
  }
  componentWillUnmount(){
    if(this.updateInterval){
      clearInterval(this.updateInterval);
    }
  }

  cartUpdate(){
    const cart=load('cart');
    if(cart){
      this.setState({
        cart:load('cart')
      })
    }else{
      this.setState({
        cart:[]
      })
    }
  }

  getProductsCount(){
    const cart=load('cart');
    if(cart){
      const count=cart.length;
      return count;
    }else{
      return 0;
    }
  }

  render(){
    return(
      <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-default" data-toggle="modal" data-target="#exampleModalCenter">
          <i className="fa fa-shopping-cart"></i>
          <span id="nav-bar-cart">Carrito ({this.getProductsCount()})</span>
        </button>
        
        {/* Modal  */}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.cart.map(
                  (product)=><CartProductComponent data={product}/>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
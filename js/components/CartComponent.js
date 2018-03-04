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
    const cart=load('cart')||[];
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

  getTotalPrice(){
    const cart=load('cart')||[];
    let price=0;
    cart.forEach(
      (element)=>{
        price+=element.price*element.count
      }
    );
    return price.toFixed(2);
  }

  getProductsCount(){
    const cart=load('cart')||[];
    if(cart){
      const count=cart.length;
      return count;
    }else{
      return 0;
    }
  }

  isLogged (){
    return load("userLogged") && true;
  }

  noProducts(){
    const cart=load('cart')||[];
    return cart.length===0;
  }

  buy(){
    if(!this.isLogged()){
      toastr.error("Debe identificarse para hacer la compra");
    }else{
      toastr.success("Ha realizado su compra con éxito");
      save([],CART_SAVE_ID);
    }
  }

  render(){
    return(
      <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-default" data-toggle="modal" data-target="#exampleModalCenter">
          <i className="icon-cart"></i>
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
                {
                  this.state.cart && this.state.cart.map(
                    (product)=><CartProductComponent key={product.id} data={product}/>
                  )
                }
              </div>
              <div className="modal-footer">
                <h5>Precio Total: {this.getTotalPrice()}€ </h5>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                {!this.noProducts() && <button type="button" className="btn btn-primary" onClick={this.buy.bind(this)}>Comprar</button>}
                {this.noProducts() && <button type="button" disabled="true" className="btn btn-primary btn-outline-secondary" onClick={this.buy.bind(this)}>Comprar</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
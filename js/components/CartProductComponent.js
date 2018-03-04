class CartProductComponent extends React.Component{
  getTotalPrice(){
    return (this.props.data.price*this.props.data.count).toFixed(2);
  }

  findIndex(){
    const cart = load(CART_SAVE_ID);
    cart.find(
      (element)=>element.id===this.props.data.id
    )
  }

  remove(){
    const cart = load(CART_SAVE_ID);
    const index=this.findIndex();
    cart.splice(index,1);
    save(cart,CART_SAVE_ID);
  }
  getName(){
    if (this.props.data.name.length>10) {
      return this.props.data.name.substring(0,16) + '...';
    } else {
      return this.props.data.name
    }
  }
  render(){
    return(
        <div className="row">
          <div className="col-2 ">
            <div className="image-container" style={{width:'50px',height:'50px'}}>
              <img style={{height:'100%'}} src={this.props.data.image}/>
            </div>
          </div>
          <div className="col-3 col-sm-5">
            <h5>{this.getName()}</h5>
          </div>
          <div className="col-1">
            <h5>{this.props.data.count}</h5>
          </div>
          <div className="col-3 col-sm-2">
            <h5>{this.getTotalPrice()}€</h5>
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-primary" onClick={this.remove.bind(this)}>X</button>
          </div>
        </div>
    );
  }
}
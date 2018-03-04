class ProductComponent extends React.Component {

    getCart(){
        return load(CART_SAVE_ID)||[];
    }

    findInCart(product){
        const cart=this.getCart();
        return cart.find(
            (element)=>element.id===product.id
        );
    }

    addToCart(){
        //CART_SAVE_ID
        const cart=this.getCart();
        let product=this.findInCart(this.props.data);
        if(!product){
            //hacer copia
            product={
                id:this.props.data.id,
                name:this.props.data.name,
                image:this.props.data.image,
                price:this.props.data.price,
                count:1
            };
            product.count=1;
            cart.push(product)//añadir
        }else{
            product.count++;
        }
        save(cart,CART_SAVE_ID)
    }

    render(){
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card" style={{margin:'4px'}} >
                    <div className="card-header image-container">
                        <img style={{height:'100%'}} src={this.props.data.image} alt="Card image cap"/>
                    </div>
                    <div className="card-body" style={{height:'210px'}}>
                        <h5 className="card-title max-2-lines">{this.props.data.name}</h5>
                        <p className="card-text max-3-lines">{this.props.data.description}</p>
                    </div>
                    <div className="card-footer card-footer-flex">
                        <p className="card-text">{`${this.props.data.price}€`}</p>
                        <p className="card-text">{`${this.props.data.platform}`}</p>
                        <button type="button" className="btn btn-primary" onClick={this.addToCart.bind(this)}>Carrito</button>
                    </div>
                </div>
            </div>
        );
    }
}
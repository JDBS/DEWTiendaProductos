class ProductComponent extends React.Component {
    render(){
        //Card Columns
        //https://getbootstrap.com/docs/4.0/components/card/#card-columns
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card" style={{margin:'4px'}} >
                    <img className="card-img-top" src={this.props.data.image} alt="Card image cap"/>
                    <div className="card-body" style={{height:'210px'}}>
                        <h5 className="card-title max-2-lines">{this.props.data.name}</h5>
                        <p className="card-text max-3-lines">{this.props.data.description}</p>
                    </div>
                    <div className="card-footer card-footer-flex">
                        <p className="card-text">{`${this.props.data.price}€`}</p>
                        <button type="button" className="btn btn-primary">Carrito</button>
                    </div>
                </div>
            </div>
        );
    }
}
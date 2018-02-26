class ProductComponent extends React.Component {
    render(){
        //Card Columns
        //https://getbootstrap.com/docs/4.0/components/card/#card-columns
        return (
            <div className="card" styles={'width:25px;'}>
                <img className="card-img-top" src={this.props.data.image} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.data.name}</h5>
                    <p className="card-text">{this.props.data.description}</p>
                    <p className="card-text">{`${this.props.data.price}€`}</p>
                    <button type="button" className="btn btn-primary">Carrito</button>
                </div>
            </div>
        );
    }
}
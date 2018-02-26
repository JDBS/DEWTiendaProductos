
class CatalogComponent extends React.Component  {
    constructor(props) {
        super(props);
        this.state={
            allProducts:[
                {
                    id:'2324',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'2323',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'2327',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'2364',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'2424',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'1324',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                },
                {
                    id:'2758',
                    platform:'ebay',
                    name:'Muñeco Hinchable',
                    img:'./assets/images/test2.png',
                    description:'¡Muñecos Hinchables que bailan y saludan como idiotas!',
                    price:50
                }
            ]
        };
    }

    filteredByMaxPrice(){

    }

    filteredByMinPrice(){

    }

    filteredByCategory(){

    }

    getFilteredProducts(){
        const products=this.state.allProducts;
        const minPriceFilter=this.filteredByMinPrice();
        const maxPriceFilter=this.filteredByMaxPrice();

        if(minPriceFilter){

        }

        if(maxPriceFilter){

        }

        return products;
    }


    render(){
        const products = this.getFilteredProducts();
        return(
            <div>
                {/*<Header/>*/}
                <div className="row">
                    <div className="col-sm-3 col-md-2">
                        <label htmlFor="categorySelect">
                            <h4>Categorías</h4>
                            <select id="categorySelect" className="form-control">
                                <option>TV & Health</option>
                                <option>Another action</option>
                                <option>Something else here</option>
                            </select>
                        </label>
                        <div className="form-group">
                            <h4>Filtros</h4>
                            <label htmlFor=""/>
                            <input type="number" min="0" placeholder="Prec. Min." className="form-control"/>
                            <input type="number" min="0" placeholder="Prec. Max." className="form-control"/>
                            <input type="text" placeholder="Prec. Min." className="form-control"/>
                            <input type="text" placeholder="Prec. Min." className="form-control"/>
                            <input type="text" placeholder="Prec. Min." className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-10">
                        <div className="catalog card-columns ">
                            {
                                products.map(
                                    (product)=><ProductComponent key={`${product.platform}${product.id}`} data={product}/>
                                )
                            }
                        </div>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    }
}
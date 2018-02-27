
class CatalogComponent extends React.Component  {
    constructor(props) {
        super(props);
        this.state={
            allProducts:load('productList'),
            searchRegExp:/.*/i,
            minPrice:0,
            maxPrice:Number.MAX_VALUE,
            productType:/.*/i,
        };
    }


    getAllTypes(){
        const allProducts=this.state.allProducts;
        const types=[];
        allProducts.forEach(
            (product)=>{
                if(!types.includes(product.productType.typeName)){
                    types.push(product.productType.typeName);
                }
            }
        );
        return types;
    }

    filterBySearch(productList){
        const regExp= this.state.searchRegExp;

        const filteredProductList = productList.filter(
            (product)=>regExp.test(product.name)
        );

        return filteredProductList;
    }

    filterByMinPrice(productList){
        const minPrice = this.state.minPrice;
        
        const filteredProductList=productList.filter(
            (product)=>minPrice <= product.price
        );

        return filteredProductList;
    }

    filterByMaxPrice(productList){
        if(this.state.maxPrice===0){
            return productList;
        }

        const maxPrice = this.state.maxPrice;
        
        const filteredProductList=productList.filter(
            (product)=>maxPrice >= product.price
        );

        return filteredProductList;
    }

    filterByType(productList){
        const regExp= this.state.productType;

        const filteredProductList=productList.filter(
            (product)=>regExp.test(product.productType.typeName)
        );

        return filteredProductList;
    }

    getFilteredProducts(){
        let products=this.state.allProducts;
        
        products=this.filterBySearch(products);
        products=this.filterByMinPrice(products);
        products=this.filterByMaxPrice(products);
        products=this.filterByType(products);

        return products;
    }

    doSearch(event){
        const target = event.target;
        const value = target.value
                            .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        
        if(value.length!==0){
            this.setState({
                searchRegExp:new RegExp(value,'i')
            });
        }else{
            this.setState({
                searchRegExp:/.*/i
            });
        }
    }

    setMinPrice(event){
        const target = event.target;
        const minPrice = parseFloat(target.value);
        
        if(Number.isNaN(minPrice) || minPrice<=0){
            this.setState({
                minPrice:0
            });
        }else{
            this.setState({
                minPrice:minPrice
            });
        }
    }    
    
    setMaxPrice(event){
        const target = event.target;
        let maxPrice = parseFloat(target.value);
        const minPrice = this.state.minPrice;

        if(Number.isNaN(maxPrice)){
            this.setState({
                maxPrice:Number.MAX_VALUE
            });
        }else if(maxPrice<=minPrice){
            maxPrice=minPrice+1;
            event.target.value=maxPrice;
            this.setState({
                maxPrice:minPrice+1
            });
        }else{
            this.setState({
                maxPrice:maxPrice
            });
        }
    }

    setCategory(event){
        const target = event.target;
        const productType = target.value;

        if(productType.length!==0){
            this.setState({
                productType:new RegExp(productType,'i')
            });
        }else{
            this.setState({
                productType:/.*/i
            });
        }
    }

    render(){
        const types = this.getAllTypes();
        const products = this.getFilteredProducts();
        return(
            <div>
                {/*<Header/>*/}
                <div className="input-group">    
                    <input type="text" onChange={this.doSearch.bind(this)} className="form-control" name="x" placeholder="Buscar..."/>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-2">
                        <label htmlFor="categorySelect">
                            <h4>Categorías</h4>
                            <select id="categorySelect" onChange={this.setCategory.bind(this)} className="form-control">
                                <option value={''}>Mostrar Todo</option>
                                {
                                    types.map(
                                        (type)=><option key={type} value={type}>{type}</option>
                                    )
                                }
                            </select>
                        </label>
                        <div className="form-group">
                            <h4>Filtros</h4>
                            <label htmlFor=""/>
                            <input type="number" onChange={this.setMinPrice.bind(this)} default={0} min="0" placeholder="Prec. Min." className="form-control"/>
                            <input type="number" onChange={this.setMaxPrice.bind(this)} default={0} min="0" placeholder="Prec. Max." className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-10">
                        <div className="catalog card-columns">
                            {
                                products.map(
                                    (product)=><ProductComponent key={`${product.platform}${product.productType.id}${product.name}`} data={product}/>
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
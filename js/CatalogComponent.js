const DELAY_BETWEEN_SEARCHS_MS=3000;

class CatalogComponent extends React.Component  {
    constructor(props) {
        super(props);
        this.state={
            productList:[],
            loading:false,
            errorLoad:undefined
        };
        
        this.search='';
        this.minPrice=0;
        this.maxPrice=Number.MAX_VALUE;
        this.productType='';
        this.changes=false;
        this.lastChangeTime=new Date();
    }

    componentDidMount(){
        this.load();
    }
    

    load() {
        if(this.state.loading){
            this.changes=true;
            return;
        }else{
            const now = new Date();
            const delay = now - this.lastChangeTime;
            if(delay<DELAY_BETWEEN_SEARCHS_MS){
                return;
            }
            else
            {
                this.lastChangeTime=now;
                setTimeout(this.load.bind(this),DELAY_BETWEEN_SEARCHS_MS-delay);
            }
            this.changes=false;
        }
        
        getCurrency(
            this.updateProducts.bind(this),
            this.requestError.bind(this),
            {
                search:this.search,
                minPrice:this.minPrice,
                maxPrice:this.maxPrice,
                categoria:this.productType
            }
        );
        $('.catalog').parent().addClass('spinner');
        this.setState({
            productList:[],
            loading:true
        });
    }

    unsetLoading(){
        $('.catalog').parent().removeClass('spinner');
        this.setState({loading:false});
    }

    updateProducts(){
        this.unsetLoading();
        this.setState({
            productList:load('productList')
        });
        if(this.changes){
            this.load();
        }
    }

    requestError(erroInfo){
        $('.catalog').parent().removeClass('spinner');
        console.log(errorInfo);
        this.setState({
            errorLoad:errorInfo
        });
    }


    doSearch(event){
        const target = event.target;
        const value = target.value;
        
        if(value.length!==0){
            this.searchRegExp=value;
        }else{
            this.searchRegExp='';
        }
        this.load();
    }

    setMinPrice(event){
        const target = event.target;
        const minPrice = parseFloat(target.value);
        
        if(Number.isNaN(minPrice) || minPrice<=0){
            this.minPrice=0;
        }else{
            this.minPrice=minPrice;
        }
        this.load();
    }    
    
    setMaxPrice(event){
        const target = event.target;
        let maxPrice = parseFloat(target.value);
        const minPrice = this.minPrice;

        if(Number.isNaN(maxPrice)){
            maxPrice=Number.MAX_VALUE;
        }else if(maxPrice<=minPrice){
            maxPrice=minPrice+1;
            event.target.value=maxPrice;

            this.maxPrice=minPrice+1;
        }else{
            this.maxPrice=maxPrice;
        }
        this.load();
    }

    setCategory(event){
        const target = event.target;
        const productType = target.value;

        if(productType.length!==0){
            this.productType=productType;
        }else{
            this.productType='';
        }
        this.load();
    }


    getCatalog(){
        const products = this.state.productList;
        return(
            <div className="catalog">
                <div className="row">
                {
                    products.map(
                        (product)=><ProductComponent key={`${product.id}${product.name}`} data={product}/>
                    )
                }
                </div>
            </div>
        );
    }

    getErrorMessage(errorMessage){
        return(
            <div className="card text-white bg-danger mb-3" style={{margin:'2vw'}}>
            <div className="card-header">Error {errorMessage}</div>
            <div className="card-body">
                <h5 className="card-title">Error de Carga</h5>
                <p className="card-text">Ha habido un error de carga en la API.</p>
            </div>
            </div>
        );
    }

    render(){
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
                                <option value={'all'}>Mostrar Todo</option>
                                <option value={'tv'}>{'TV & Health'}</option>
                                <option value={'health'}>{'Fitness & Beauty'}</option>
                                <option value={'phone'}>{'Smartphones'}</option>
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
                        {this.state.errorLoad && this.getErrorMessage(this.state.errorLoad)}
                        {!this.state.errorLoad && this.getCatalog()}
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    }
}
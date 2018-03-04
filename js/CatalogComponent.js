const DELAY_BETWEEN_SEARCHS_MS=2000;
const MAX_PRICE_VALUE=99999;
const ITEMS_PER_PAGE=9;

class CatalogComponent extends React.Component  {
    constructor(props) {
        super(props);
        this.state={
            productList:[],
            loading:false,
            errorLoad:undefined,
            pagesCount:0,
            page:0
        };
        this.search='';
        this.minPrice=0;
        this.maxPrice=MAX_PRICE_VALUE;
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
                setTimeout(this.load.bind(this),DELAY_BETWEEN_SEARCHS_MS-delay);
                return;
            }
            else
            {
                this.lastChangeTime=now;
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
                category:this.productType
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
        if(this.state.errorLoad){
            this.setState({
                errorLoad:undefined
            });
        }
        this.unsetLoading();
        this.setState({
            productList:load('productList')
        });

        if(this.changes){
            this.load();
        }
        this.updatePages();
    }

    requestError(errorInfo){
        $('.catalog').parent().removeClass('spinner');
        if(errorInfo){
            this.setState({
                loading:false,
                errorLoad:errorInfo
            });
        }else{
            this.setState({
                loading:false
            });
        }
        
        if(this.changes){
            this.load();
        }
    }


    doSearch(event){
        const target = event.target;
        const value = target.value;
        
        if(value.length!==0){
            this.search=value;
        }else{
            this.search='';
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
            maxPrice=MAX_PRICE_VALUE;
        }else if(maxPrice<=minPrice){
            maxPrice=MAX_PRICE_VALUE;
            this.maxPrice=maxPrice;
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

    updatePagination(){

    }



    goPage(event){
        let number = parseInt($(event.target).text())-1;
        const pagesCount  = this.state.pagesCount;
        if(number>=0 && number<pagesCount){
            this.setState({
                page:number
            });
        }
    }

    previousPage(){
        const number=this.state.page;
        if(number>0){
            this.setState({
                page:number-1
            });
        }
    }

    nextPage(){
        const pagesCount  = this.state.pagesCount-1;
        const number=this.state.page;
        if(number<pagesCount){
            this.setState({
                page:number+1
            });
        }
    }

    getPagesCount(){
        const productsCount = this.state.productList.length;
        let pagesCount = parseInt(productsCount/10);
        if(productsCount%10>0){
            pagesCount++;
        }
        return pagesCount;
    }
    updatePages(){
        const pagesCount  = this.getPagesCount();
        this.setState({
            pagesCount:pagesCount,
            page:0
        });
    }

    getPaginationButtons(){
        const pagesCount= this.state.pagesCount;
        
        if(this.state.pagesCount==0){
            return;
        }

        const pages=[];
        for(let i=1; i<=pagesCount;i++){
            pages.push(i);
        }
        return (
            <ul className="pagination mx-auto">
                <li className="page-item"><a className="page-link" onClick={this.previousPage.bind(this)}>Previous</a></li>
                {pages.map(
                    (page)=>{
                        if(page-1==this.state.page){
                            return <li key={page} className="page-item active"><a className="page-link" onClick={this.goPage.bind(this)} >{page}</a></li>
                        }else{
                            return <li key={page} className="page-item"><a className="page-link"  onClick={this.goPage.bind(this)} >{page}</a></li>
                        }
                    }

                )}
                <li className="page-item"><a className="page-link" onClick={this.nextPage.bind(this)}>Next</a></li>
            </ul>
        )
    }

    getCatalog(){
        const page = this.state.page;
        const startProduct=page*ITEMS_PER_PAGE;
        const endProduct=startProduct+ITEMS_PER_PAGE;
        const products = this.state.productList.slice(startProduct,endProduct);
        return(
            <div className="catalog">
                <div className="row">
                {
                    products.map(
                        (product)=><ProductComponent key={`${product.id}${product.name}`} data={product}/>
                    )
                }
                </div>
                <div className="row">
                    {this.getPaginationButtons()}
                </div>
            </div>
        );
    }

    getErrorMessage(errorMessage){
        return(
            <div className="card text-white bg-danger mb-3" style={{margin:'2vw'}}>
                <div className="card-header">Error de Carga</div>
                <div className="card-body">
                    <h5 className="card-title">Error: {errorMessage}</h5>
                    <p className="card-text">Ha habido un error de carga en la API.</p>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div>
                {/*<Header/>*/}
                <LoginButtonComponent/>
                <div className="input-group">    
                    <input type="text" onChange={this.doSearch.bind(this)} className="form-control" name="x" placeholder="Buscar..."/>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-2">
                        <label htmlFor="categorySelect">
                            <h4>Categorías</h4>
                            <select id="categorySelect" onChange={this.setCategory.bind(this)} className="form-control">
                                <option value={'all'}>Mostrar Todo</option>
                                <option value={'tv'}>{'TV'}</option>
                                <option value={'health'}>{'Health, Fitness & Beauty'}</option>
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
                        {this.state.errorLoad && this.getErrorMessage()}
                        {!this.state.errorLoad && this.getCatalog()}
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    }
}
class PaginationComponent extends React.Component{
  constructor(props){
    this.state={
      page:0,
      maxPages:this.props.elements
    }
  }
}
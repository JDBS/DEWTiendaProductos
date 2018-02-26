let user;
function getGreeting(user) {
    if(user){
        return <h1> Hello, {user}!</h1>
    }
    return <h1> Hello, Stranger!</h1>
}
const el = <h1 id="title">{getGreeting()}</h1>;
ReactDOM.render(el, document.getElementById('app'));
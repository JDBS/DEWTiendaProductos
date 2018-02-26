"use strict";

var user = void 0;
function getGreeting(user) {
    if (user) {
        return React.createElement(
            "h1",
            null,
            " Hello, ",
            user,
            "!"
        );
    }
    return React.createElement(
        "h1",
        null,
        " Hello, Stranger!"
    );
}
var el = React.createElement(
    "h1",
    { id: "title" },
    getGreeting()
);
ReactDOM.render(el, document.getElementById('app'));
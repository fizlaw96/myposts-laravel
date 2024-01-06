import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

function WelcomePage() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// function MainPage() {
//     return (
//         <div>
//             <h1>Welcome Home</h1>
//             <p className="lead">
//                 This app will do CRUD for Post model with Laravel.
//             </p>
//             <hr />

//             <Link to="/posts" className="btn btn-info me-2">
//                 View Posts
//             </Link>
//             <Link to="/create" className="btn btn-primary">
//                 Add New Post
//             </Link>
//         </div>
//     );
// }

export default WelcomePage;

const element = document.getElementById("WelcomePage");
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <HashRouter>
            <WelcomePage {...props} />
        </HashRouter>,
        element
    );
}

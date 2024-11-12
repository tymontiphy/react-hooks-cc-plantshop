import React from "react";

function ErrorPage({message}) {
    return (
        <div className="error-page">
        <h2>Ooops! 'Something went wrong</h2>
         <p >{message || "An unexpected error."}</p>  
        </div>
    );
}


export default ErrorPage;

import * as React from "react"


export const page = () => {
    console.warn('Page TSX Example Dama')
    return (<div>
        <h2>Welcome to React App</h2>
        <h3>Date : {new Date().toDateString()}</h3>
    </div>)
}


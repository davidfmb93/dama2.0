import * as React from "react"


export const component = () => {
    console.warn('Component TS Example Dama')
    return (<div>
        <h2>Welcome to React App</h2>
        <h3>Date : {new Date().toDateString()}</h3>
    </div>)
}


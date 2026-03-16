import React from "react";

function Navbar() {
  return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#333",
        color: "#fff",
    }}>
        <div className="logo">
            <h2 style={{ margin: 0 }}>My E-commerce</h2>
        </div>
        
        <ul style={{
            display: "flex",
            listStyle: "none",
            gap:"20px" 
        }}>
            <li> Home </li>
            <li> Products </li>
            <li> Cart </li>
            <li> Login </li>
        </ul>

    </nav> 
    );
}
export default Navbar;
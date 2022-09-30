import ProductContext from "./ProductContext";
import { useEffect, useState } from "react";

 const ProductState  = async () => {
    let host="http://localhost:5000/api/products/"
    const prd=[]
    const [products, setProducts] = useState(prd)
    const getProducts = async () => {
       const response= await fetch(`${host}allproducts`,
        { method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
     }// *GET, POST, PUT, DELETE, etc.
        );
         const json= await response.json() 
      console.log(json)
      setProducts(json)
      }
    
return (
<ProductContext.Provider value={{gpt:getProducts,prd: products,}}>
    {props.children}
</ProductContext.Provider>
)
}
export default ProductState
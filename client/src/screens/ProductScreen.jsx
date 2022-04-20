import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectCategory } from '../store/actions/product.action';
import Product from "../components/Product";


export default function ProductScreen({}) {
  const dispatch = useDispatch()
  const { products, productCategoryMap } = useSelector((state) => state)
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  
  const onSelectCategory = (event) => {
    dispatch(selectCategory(event.target.value))
  }


  return (
    <>
      <h2>Products</h2>

      {
        products.length > 0 && (
          <>
            <label>Filter by category:</label>
            <select name="categories" id="category-select" onChange={onSelectCategory} defaultValue="None">
                { 
                  Object.keys(productCategoryMap).map((category, i) => <option value={category} key={i}>{category}</option>) 
                }
            </select>

            <div className="container-row">
              {
                products.map((p) =>  
                <Product 
                  product={p}
                  key={p.id}
                />)
              }
            
            </div>
          </>
        )
      }
      
    </>
  )
}
     import React,{useContext, useEffect} from 'react'
     import ProductContext from 'src/context/products/ProductContext'
     import {
      CCard,
      CCardBody,
      CCardHeader,
      CCol,
      CRow,
      CTable,
      CTableBody,
      CTableCaption,
      CTableDataCell,
      CTableHead,
      CTableHeaderCell,
      CTableRow,
    } from '@coreui/react'
    import { DocsExample } from 'src/components'
     const Allproducts=()=> {
      const context = useContext(ProductContext)
      const { getProducts, products}= context
      useEffect(() => {
        getProducts()
      }, [])
      
       return (
        <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Desc</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price ($)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Image</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
       { products.map((product)=>{
        return (
           <CTableRow>
            <CTableHeaderCell scope="row">{product._id}</CTableHeaderCell>
            <CTableDataCell>{product.title}</CTableDataCell>
            <CTableDataCell>{product.desc}</CTableDataCell>
            <CTableDataCell>{product.price}</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>

          </CTableRow>
 )  } )  }
        </CTableBody>
      </CTable>
       )
     }
     export default Allproducts
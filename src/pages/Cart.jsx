import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

const Cart = () => {
  let ctx = useContext(CartContext)

  console.log(ctx)
  let arr =ctx.cartArr
   

    let sum = 0;
    arr.forEach((ele)=>{
      sum =sum+ele.price
    })

    console.log(sum)

 

    // const handleIncrement = (ele,index)=>{
    //   console.log(ele)
    //   console.log(index)

    //   let updatedObj = {...ele,quantity:ele.quantity+1,price:ele.price+(ele.price/ele.quantity)};
    //   console.log(updatedObj)

    //   let copyArr = [...props.cartArr]; //[{},{},{},{}]
    //   copyArr[index] = updatedObj
    //       console.log(copyArr)
    //   props.setcartArr(copyArr)
      
    // }


    // const handleDelete = (ele,index)=>{
    //   console.log(ele)
    //   console.log(index)
    //   let filteredArr = props.cartArr.filter((obj)=>obj.id != ele.id ) 
    //   console.log(filteredArr)
    //   props.setcartArr(filteredArr)
    // }

  return (
    <div>
      
{arr.length>0 &&

<div className="relative overflow-x-auto">
  <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Product 
        </th>
        <th scope="col" className="px-6 py-3">
          Title
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Quantity
        </th>
        <th scope="col" className="px-6 py-3">
         
        </th>
      </tr>
    </thead>
    <tbody>
     {
        arr.map((ele,index)=>{
            return  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 text-center  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <img className='h-36 w-36 mx-auto' src={ele.thumbnail} alt="" />
            </th>
            <td className="px-6 py-4">
              {ele.title}
            </td>
            <td className="px-6 py-4">
              {ele.price.toFixed(2)}
            </td>
            <td className="px-6 py-4">
              <button onClick={()=>ctx.updateItem(ele,index)} className='bg-blue-950 px-2 py-2 rounded-sm'>+</button> {ele.quantity} <button onClick={()=>ctx.updateDecrement(ele,index)} className='bg-blue-950 px-2 py-2 rounded-sm'>-</button>
            </td>
            <td className="px-6 py-4">
              <button onClick={()=>ctx.removeItem(ele,index)} className='bg-red-950 text-white px-2 py-2 rounded-sm'>Delete</button> 
            </td>
          </tr>
        })
     }
    
    </tbody>
  </table>
  <h1 className='text-center my-3 text-3xl'>Total = ${sum.toFixed(2)}</h1>
</div>}

{arr.length===0 && <h1 className='text-center text-4xl mt-28'>Please add some items in the cart</h1>}



    </div>
  )
}

export default Cart

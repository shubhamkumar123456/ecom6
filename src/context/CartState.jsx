import React, { useState } from 'react'
import CartContext from './CartContext';
import { toast } from 'react-toastify';

const CartState = (props) => {
    const [cartArr, setcartArr] = useState([]);
    const [searchValue, setsearchValue] = useState('');
    // console.log(searchValue)
    console.log(cartArr)

    function addItem(obj){
        console.log(obj)
        obj.quantity = 1
        let findObj  = cartArr.find((ele)=>ele.id === obj.id) 
        if(findObj){
          return toast.error('item already added in the cart',{position:"top-center",theme:'dark'})
        }
        else{
          
          toast.success('item added in the cart',{position:"top-center",theme:"dark"})
          setcartArr([...cartArr,obj])
        }
    }

    function updateItem(obj ,i){
        console.log(obj)
        console.log(i)
        let updatedObj = {
            ...obj,
            quantity:obj.quantity+1,
            price:obj.price + (obj.price/ obj.quantity)
        }
        console.log(updatedObj)
        let updatedArr = [...cartArr]
        updatedArr[i] = updatedObj
        setcartArr(updatedArr)
    }
    function updateDecrement(obj ,i){
        console.log(obj)
        console.log(i)
        let updatedObj = {
            ...obj,
            quantity:obj.quantity-1,
            price:obj.price - (obj.price/ obj.quantity)
        }
        if(updatedObj.quantity < 1){
          return
        }
        console.log(updatedObj)
        let updatedArr = [...cartArr]
        updatedArr[i] = updatedObj
        setcartArr(updatedArr)
    }

    function removeItem(ans,i){
      console.log(ans)
      console.log(i)
      let copyArr = [...cartArr];
      copyArr.splice(i,1);
      console.log(copyArr)
      setcartArr(copyArr)
    }


  return (
    <CartContext.Provider value={{cartArr,addItem,removeItem, updateItem, updateDecrement,searchValue, setsearchValue}}>
            {props.children}
    </CartContext.Provider>
  )
}

export default CartState

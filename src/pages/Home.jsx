import React, { useContext, useEffect, useState } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'antd';
import CartContext from "../context/CartContext";
import LoadingImage from '../assets/loadingImage.gif'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {

  let ctx = useContext(CartContext);
  console.log(ctx)
  let search  = ctx.searchValue
  console.log(search)
    let navigate = useNavigate();
  // ek function haiye hota h
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  console.log(products)

  let getAllData = async () => {
      setloading(true)
    //  Dummy json - Docs  product getall click krna h API copy karenge///
    let res = await fetch("https://dummyjson.com/products?limit=0");
    let data = await res.json();
    console.log(data);
      setloading(false)
    //       console.log(data.product)
    setproducts(data.products);

  };
  useEffect(() => {
    getAllData();
  }, []);

  const handleClick = (e)=>{
       console.log(e)                       
  }
// Anti Design Modal
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedobj, setselectedobj] =useState("");


const showModal = (ans) => {
  console.log(ans)
  setselectedobj(ans)
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};

//  let name = 'abacd';
//       age = 32;
//       console.log(delete name )
//       console.log(delete age)

// ********************pagination code starts from here**************;
    let filteredArr = products.filter((ele)=>ele.title.toLowerCase().includes(search) || ele.category.toLowerCase().includes(search) || ele.brand?.toLowerCase().includes(search)  )
    console.log(filteredArr)
      const [currentPage, setcurrentPage] = useState(1);
      let itemPerPage = 8;
      let lastIndex = currentPage * itemPerPage;
      let firstIndex = lastIndex - itemPerPage;
      let slicedArr = filteredArr.slice(firstIndex, lastIndex)
      console.log(slicedArr)
      let noOfButtons = Math.ceil(filteredArr.length / itemPerPage)
      console.log(noOfButtons)//25



      const handleNext = ()=>{
        if(currentPage < noOfButtons){
          setcurrentPage(currentPage+1)

        }
      }
      const handlePrev = ()=>{

        if(currentPage > 1){
          setcurrentPage(currentPage-1)
        }

        
      }

      let btnArr = []
      for(let i=1; i<=noOfButtons; i++){
            btnArr.push(i)
      }
      console.log(btnArr)


      const handleNumberClick = (ans)=>{
          console.log(ans)
          setcurrentPage(ans)
      }

      // arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// ************pagination part ends here


        // let arr = [];
        // let arr1 = new Array(10).fill('');
        // console.log(arr1)

  return (
   <div>
 

    {
      loading===true ?    
      <div className="w-[80%] m-auto grid grid-cols-12 gap-2 mt-32 ">
          {
            Array(8).fill(0).map((digits)=>{
                  return <div className=" h-[250px] lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
  <SkeletonTheme height={'100%'} baseColor="#202020" highlightColor="#444">
  
        <Skeleton />
      
    </SkeletonTheme>
                  </div>
            })
          }  
      </div> :  <div className=' p-5 w-[80%] m-auto'>
      {/* <h1>This is home page</h1> */}
     
 <Modal width ={990} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
<div>
  <div className='flex items-center gap-3 md:flex-row flex-col'> 
  <div><img className=''src={selectedobj.thumbnail} alt=""/></div>
<div>
  <h3 className='text-2xl'>Title: {selectedobj.title}</h3>
  <p className='my-1'><b>category:</b>{selectedobj.category}</p>
{selectedobj.brand &&  <p className='my-1'><b>Brand:</b>{selectedobj.brand}</p>}
  <p className='my-1'><b>Price:</b>{selectedobj.price} </p>
  <p className='my-1'><b>Rating:</b>{selectedobj.rating}</p> 
  <p className='my-1'><b>Description:</b>{selectedobj.description}</p> 
  <p className='my-1'><b>Discount:</b>{selectedobj.discount}%</p> 
  <p className='my-1'><b>Stock:</b>{selectedobj.stock}</p> 
    </div>
  </div>
</div>
<h3>Reviews</h3>
<div className='grid grid-cols-12 gap-2px my-3 '>
{selectedobj?.reviews?.map((ele)=>{

return <div className='bg-blue-300  lg:col-span-4 md:col-span-6 col-span-12 mx-auto p-6 rounded-lg'>
  <p><b>userename:</b>{ele.reviewerName}</p>
  <p><b>useremail:</b>{ele.reviewerEmail}</p>
  <p><b>rating:</b>{ele.rating}</p>
  <p><b>comment:</b>{ele.comment}</p>
</div> 

})}

</div>

 </Modal>



      <div className='grid grid-cols-12 gap-2 '>
      {
         slicedArr?.map((ele) => {
        return <Card  key={ele.id} className=' relative flex flex-col justify-between lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 ' sx={{backgroundColor:'#28282B'}}>
     <IoEyeOutline color="white" onClick={()=>showModal(ele)} size={30}  className='absolute right-4 top-4'/>
      {/* <CardMedia
      className="h-[30%]"
        component="img"
        alt="green iguana"
        height="20"
        image={ele.thumbnail}
      /> */}
      <img src={ele.thumbnail} className="w-[60%] h-[60%] m-auto"/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="text-white" >
          {ele.title}
        </Typography>
        {/* description show */}
     
      </CardContent>
      <CardActions>
        {/* <button onClick={()=>handleClick(ele)} className='bg-blue-500 text-white-50 py-2 px-4 rounded-md hover:bg-green-200' size="small">view product</button> */}
        <button size="small" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-200"onClick={()=>ctx.addItem(ele)}>Add to cart</button>
      </CardActions>
    </Card>   
      })
      }
      </div>
      <nav aria-label="Page navigation example" className=" mx-auto my-4">
  <ul className="flex justify-center flex-wrap text-wrap -space-x-px text-sm">
    <li onClick={handlePrev}>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
   {
    btnArr.map((nums)=>{
      return  <li onClick={()=>handleNumberClick(nums)}>
      <a href="#" className={nums===currentPage ? 'flex items-center justify-center px-3 h-8 leading-tight text-white bg-blue-950 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white' 
        : 
        'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}>{nums}</a>
    </li>
    })
   }
   
    <li onClick={handleNext}>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>

</div>
    }
   </div>

  )
}

export default Home;
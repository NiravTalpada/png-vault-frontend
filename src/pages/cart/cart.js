import './cart.css'
import { incrementQuantity, decrementQuantity, removeItem} from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './cartItem'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import cartIcon from '../../images/cart-icon.gif';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import {Razorpay} from 'razorpay';
import toast, { Toaster } from 'react-hot-toast';
import { FaCcAmazonPay,FaRupeeSign } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { SiRazorpay } from "react-icons/si";





function Cart() {
const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return {totalPrice, totalQuantity}
  }
  

  const handleCheckedout = async () => {
    const lineItems = await cart.map((item) => {
        return {
            "product_data" : {
                "name" : item.title
            },
            "amount": item.price * 100
        }
    })

    if(isAuthenticated){
        if(cart.length > 0){
            function loadScript(src) {
                return new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = src;
                    script.onload = () => {
                        resolve(true);
                    };
                    script.onerror = () => {
                        resolve(false);
                    };
                    document.body.appendChild(script);
                });
            }
                
            try{
                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );
                if (!res) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    return;
                }
                const orderURL = "http://localhost:8080/api/payment/order";
                const {data} = await axios.post(orderURL,lineItems,{headers:{"Content-Type" : "application/json"}})
                const options = {
                    key: "rzp_test_KuBIpixxRAhdkY", // Enter the Key ID generated from the Dashboard
                    amount: data.data.amount,
                    currency: data.data.currency,
                    name: user.name,
                    description: "Test Transaction",
                    order_id: data.data.id,
                    handler: async function (response) {
                        
                        const data = {
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        };
                        fetch('http://localhost:8080/api/payment/verify', requestOptions)
                        .then(response => response.json())
                        .then((responseMessage,index) => {
                            if(responseMessage.message == 'Payment verified successfully'){
                                toast.success("Payment Verified Successfully")
                                localStorage.setItem("No",index)
                                localStorage.setItem("razorpayPaymentId", response.razorpay_payment_id)
                                localStorage.setItem("razorpayOrderId", response.razorpay_order_id)
                                // window.location.replace('http://localhost:3000')
                                
                                const orderProduct = lineItems.map((data)=>{
                                    return {
                                        productName : data["product_data"]["name"],Amount : data.amount
                                       
                                    }
                                })

                                const objectData = {};

                                orderProduct.forEach(item => {
                                    objectData[item.productName] = item.Amount;
                                });

                                console.log(objectData,'objectData')
                                const emailObject = {
                                    to_name : "Nirav Talpada",
                                    from_name : user.name,
                                    from_email : user.email,
                                    order_id : response.razorpay_order_id,
                                    message :  objectData
                                }
                               
                                // console.log(emailObject,'emailObject')
                                emailjs
                                    .send('service_g6qftwl', 'template_x73vxz8', emailObject, {publicKey : 'osSr_n2tUqkfOSUaD'})
                                    .then(
                                        () => {
                                        console.log('SUCCESS!');
                                        },
                                        (error) => {
                                        console.log('FAILED...', error);
                                        },
                                    );
                            }else{
                                toast.error("Payment Failed")
                            }
                        });
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                    },
                    notes: {
                        address: "Soumya Dey Corporate Office",
                    },
                    theme: {
                        color: "#61dafb",
                    },
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();

                
            }catch(error){
                console.log(error)
            }
        }else{
            // toast.info("Please images add to cart")
            toast.error('Cart Is Empty')
        }
        
    }else{
        loginWithRedirect();
    } 
  }
  return (
    <Container>
        {isAuthenticated ? 
        <>
        <Toaster />
        <div className="card-details">
            {cart?.length == 0 ? 
                <div className="cartaddItem">
                    <img src={cartIcon} />
                    Cart is empty
                </div> :
                <div className="cartaddItem">
                    {cart?.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price} 
                            desc = {item.des}
                            quantity={item.quantity}
                            discount={item.discount}
                        />
                    ))}
                </div>
            }
            
            <div className='total-amount'>
            <h3>Checkout</h3>
            <TableContainer component={Paper} className='checkout-table'>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discount</TableCell>
                    </TableRow>
                    </TableHead>
                        {cart.length == 0 ? <TableBody><TableRow><TableCell>No Image Selected</TableCell></TableRow></TableBody> :
                            <TableBody>
                            {cart.map((row) => (
                                <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell>{row.title}</TableCell>
                                <TableCell><FaRupeeSign ></FaRupeeSign>{row.price}</TableCell>
                                <TableCell>{row.discount ? row.discount+'%' : '-'}</TableCell>
                                </TableRow>
                            ))}
                            
                            </TableBody>
                        }
                        {cart.length == 0 ? '' :
                        <TableHead>
                            <TableRow>
                                <TableCell>Total ({getTotal().totalQuantity} items) : </TableCell><TableCell><FaRupeeSign ></FaRupeeSign>{getTotal().totalPrice}</TableCell>
                            </TableRow>
                        </TableHead>}
                </Table>
                </TableContainer>
                <div className='pay-now-buttons'>
                    <Button variant="contained" type='button' color="success" onClick={handleCheckedout}><SiRazorpay  size={18}></SiRazorpay>Pay Now</Button>
                    {/* <Button type='button' onClick={() => dispatch(removeItem(id))} >Remove all items</Button> */}
                </div>
            </div>
        </div></>
        :
        <div className="card-details">
            <div className="cartaddItem">
                Please Login First
            </div>
        </div>
    }
    </Container>
    
  )
}

export default Cart
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import '../order/order.css'


function Order() {
    const no = localStorage.getItem("No");
    const razorpayPaymentId = localStorage.getItem("razorpayPaymentId");
    const razorpayOrderId = localStorage.getItem("razorpayOrderId");
    return(
       <div className='orderDetails'>
            <h2>My Order</h2>
            <TableContainer className='orderDetailstable'>
                
                <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Payment Id</TableCell>
                            <TableCell>Order Id</TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{no}</TableCell>
                            <TableCell>{razorpayPaymentId}</TableCell>
                            <TableCell>{razorpayOrderId}</TableCell>
                        </TableRow>  
                    </TableBody>
                </Table>
            </TableContainer> 
       </div> 
        
        
    )
}

export default Order;
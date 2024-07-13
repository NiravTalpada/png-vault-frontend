import './cart.css'
import { incrementQuantity, decrementQuantity, removeItem} from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { FaRecycle, FaRupeeSign } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";


function CartItem({id, image, title, price, desc, quantity=0, discount}) {
  const dispatch = useDispatch()


  return (
    <div className="cartItem">
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <FaRupeeSign></FaRupeeSign>{price}
                </Typography>
            </CardContent>
            <CardActions className='buttons'>
                {/* <Button size="small" onClick={() => dispatch(decrementQuantity(id))}>-</Button>
                    <p>{quantity}</p>
                <Button size="small" onClick={() => dispatch(incrementQuantity(id))}>+</Button> */}
                <Button
                    className='cartItem__removeButton' 
                    onClick={() => dispatch(removeItem(id))}>
                        <MdDelete size={18}></MdDelete > Remove
                </Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default CartItem
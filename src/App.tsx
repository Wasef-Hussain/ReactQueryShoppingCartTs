import { useState,useEffect } from "react";
import { useQuery } from "react-query";
import { StyledButton, Wrapper } from "./styles/App.style";
import  Grid from "@material-ui/core/Grid";
import  Drawer  from "@material-ui/core/Drawer";
import  LinearProgress  from "@material-ui/core/LinearProgress";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import  Badge  from "@material-ui/core/Badge";
import Item from './Item/item'
import Cart from "./Cart/Cart";


//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};



const getProducts = async ():Promise<CartItemType[]> => await(await fetch('https://fakestoreapi.com/products')).json()




function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

const {data,isLoading,error} = useQuery<CartItemType[]>('cart-item',getProducts)

 
const getTotalItems = (items: CartItemType[]) =>
items.reduce((ack: number, item) => ack + item.amount, 0);

const handleAddtoCart = (clickeditem:CartItemType) => 
setCartItems(prev => {
  // 1. Is the item already added in the cart?
  const isItemInCart = prev.find(item => item.id === clickeditem.id);

  if (isItemInCart) {
    return prev.map(item =>
      item.id === clickeditem.id
        ? { ...item, amount: item.amount + 1 }
        : item
    );
  }
  // First time the item is added
  return [...prev, { ...clickeditem, amount: 1 }];
});;

const handleRemoveFromCart = (id: number) => 
{
  setCartItems(prev =>
    prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack;
        return [...ack, { ...item, amount: item.amount - 1 }];
      } else {
        return [...ack, item];
      }
    }, [] as CartItemType[])
  );
};


if(isLoading) return <LinearProgress/>


if(error) return <div>Error..</div>



  return (
<Wrapper>
  <Drawer anchor="right" open={cartOpen} onClose={() =>setCartOpen(false)}>
  <Cart
          cartItems={cartItems}
          addToCart={handleAddtoCart}
          removeFromCart={handleRemoveFromCart}
        />
  </Drawer>
  <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
  <Grid container spacing={3}>
    {
      data?.map(item =>(
        <Grid item key={item.id} xs={12} sm={4}>
<Item item={item} handleAddToCart={handleAddtoCart} />


          </Grid>

      ))
    }
  </Grid>
</Wrapper>
  );
}

export default App;

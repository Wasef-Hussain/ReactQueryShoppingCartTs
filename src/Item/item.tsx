import  Button  from "@material-ui/core/Button";
import React from "react";
//Types
import { CartItemType } from "../App";

import { Wrapper } from "./item.style";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickeditem:CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  );
  
  export default Item;
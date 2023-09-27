import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import { useSelector } from 'react-redux';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from '../cart/cartSlice';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem type="small" pizzaId={pizzaId}>
          Delete
        </DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;

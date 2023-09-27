import { useSelector, useDispatch } from 'react-redux';
import Button from './../../ui/Button';
import LinkButton from './../../ui/LinkButton';
import CartItem from './CartItem';
import { getCart, clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function clearCartHandler() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y  divide-stone-200 border-b ">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={clearCartHandler}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

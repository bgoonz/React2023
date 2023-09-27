import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector((state) =>
    getCurrentQuantityById(state, id),
  );
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2" key={id}>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice)} {currentQuantity > 0 ? 'x' : ''}{' '}
              {currentQuantity > 0 ? currentQuantity : null}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && <DeleteItem pizzaId={id} />}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

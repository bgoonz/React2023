const Item = ({ item, onDeleteItem }) => {
  const description =
    item.quantity > 1 ? `${item.description}s` : item.description;

  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};
export default Item;

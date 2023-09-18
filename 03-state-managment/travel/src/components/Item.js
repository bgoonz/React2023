const Item = ({ item, onDeleteItem, onUpdateItem }) => {
  const description =
    item.quantity > 1 ? `${item.description}s` : item.description;

  return (
    <li key={item.id}>
      {/* <span>{item.packed ? "Packed" : "Unpacked"}</span> */}

      <input type="checkbox" onChange={() => onUpdateItem(item.id)} />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

export default Item;

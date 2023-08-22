import Item from "./Item";
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      {" "}
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />;
        })}
      </ul>
    </div>
  );
}
export default PackingList;

import Item from "./Item";
function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      {" "}
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}/>;
        })}
      </ul>
    </div>
  );
}
export default PackingList;

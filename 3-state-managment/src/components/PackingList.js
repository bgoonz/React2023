import Item from "./Item";
import { useState } from "react";

function PackingList({ items, onDeleteItem, onUpdateItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");

  const handleSelectChange = (event) => {
    setSortBy(event.target.value);
  };
  let sortedItems = [...items];
  if (sortBy === "input") {
    sortedItems.sort((a, b) => {
      return a.id - b.id;
    });
  } else if (sortBy === "description") {
    sortedItems.sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) => {
      return a.packed - b.packed;
    });
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
            />
          );
        })}
      </ul>
      <div className="actions">
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSelectChange}>
          <option value="input">Chronological Order</option>
          <option value="description">Description</option>
          <option value="packed">Packed Status</option>
        </select>
        <button className="full-width" onClick={onClear}>
          Clear List
        </button>
      </div>
    </div>
  );
}

export default PackingList;

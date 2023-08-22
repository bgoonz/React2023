import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, packed: true },
  { id: 4, description: "Phone charger", quantity: 1, packed: true },
  { id: 5, description: "Water bottle", quantity: 1, packed: false },
];
function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🚢✈️🧳 Far Away🌴🥥🏖️</h1>;
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    //guard clause against empty description
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);
    //reset the form
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧳</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
const Item = ({ item }) => {
  const description =
    item.quantity > 1 ? `${item.description}s` : item.description;

  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
};


function PackingList({ items }) {
  return (
    <div className="list">
      {" "}
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
export default App;

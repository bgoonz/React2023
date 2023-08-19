const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, packed: true },
  { id: 4, description: "Phone charger", quantity: 1, packed: true },
  { id: 5, description: "Water bottle", quantity: 1, packed: false },
];

function App() {
  return (
    <>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </>
  );
}

function Logo() {
  return <h1>🚢✈️🧳 Far Away🌴🥥🏖️</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip?🧳</h3>
    </div>
  );
}
const Item = ({ item }) => {
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
};

function PackingList() {
  return (
    <div>
      {" "}
      <ul className="list">
        {initialItems.map((item) => {
          return <Item item={item} />;
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

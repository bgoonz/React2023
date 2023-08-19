const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
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

function PackingList() {
  return <ul className="list">
    {initialItems.map((item)=>{
        return <li key={item.id}>{item.description}</li>
    })}
  </ul>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
export default App;

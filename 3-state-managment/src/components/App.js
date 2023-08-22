import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";

import PackingList from "./PackingList";
import Stats from "./Stats";
function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItems(prevItems =>
      prevItems.map(item => item.id === id ? { ...item, packed: !item.packed } : item)
    );
  }
  
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
      <Stats />
    </div>
  );
}

export default App;

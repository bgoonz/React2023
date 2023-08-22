function Stats({ items}) {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const unpackedItems = totalItems - packedItems;
    const percentage = (packedItems / totalItems) * 100;
  return (
    <footer className="stats">
      <em>You have {totalItems} items on your list and you already packed {packedItems} ({percentage}%)</em>
    </footer>
  );
}
export default Stats;

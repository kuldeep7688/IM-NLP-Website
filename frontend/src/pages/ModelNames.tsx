import React from "react";
import ItemList from "../components/ItemList";

const ItemListPage: React.FC = () => {
  const route = import.meta.env.VITE_API_URL + "/api/modelnames/";
  return (
    <div className="item-list-page">
      <h1>Integrated Models List</h1>
      <ItemList route={route} />
    </div>
  );
};

export default ItemListPage;

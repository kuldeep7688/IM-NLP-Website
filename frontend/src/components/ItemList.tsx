import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/ItemList.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface ItemListProps {
  route: string;
}

const ItemList: React.FC<ItemListProps> = ({ route }) => {
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(route);
        const data = response.data;
        setData(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <Table striped bordered hover style={{ maxWidth: "800px" }}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {headers.map((header) => (
                  <td key={header}>{item[header]}</td>
                ))}
                {/* <td>
                <button className="btn btn-sm btn-primary">
                  <AiFillEdit /> Edit
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemList;

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({

  productName: "",
  category: "",
  price: "",
  stock: ""
});

const [editId, setEditId] = useState(null);

const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://inventory-management-rho-0chre.vercel.app/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const addProduct = async () => {

  if (
  !formData.productName ||
  !formData.category ||
  !formData.price ||
  !formData.stock
) {
  alert("Please fill all fields");
  return;
}

  try {

    await axios.post(
      "https://inventory-management-rho-0chre.vercel.app/api/products",
      formData
    );

    const response = await axios.get(
      "https://inventory-management-rho-0chre.vercel.app/api/products"
    );

    setProducts(response.data);

    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: ""
    });

  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {

    const ok = window.confirm(
  "Are you sure you want to delete this product?"
);

if (!ok) return;

await axios.delete(
  `https://inventory-management-rho-0chre.vercel.app/api/products/${id}`
);
    

    const response = await axios.get(
      "https://inventory-management-rho-0chre.vercel.app/api/products"
    );

    setProducts(response.data);

  } catch (error) {
    console.log(error);
  }
};

const editProduct = (product) => {

  setEditId(product._id);

  setFormData({
    productName: product.productName,
    category: product.category,
    price: product.price,
    stock: product.stock
  });

};

const updateProduct = async () => {

  console.log("Update Button Clicked");

  console.log(editId);
console.log(`https://inventory-management-rho-0chre.vercel.app/api/products/${editId}`);

  try {

    await axios.put(
      `https://inventory-management-rho-0chre.vercel.app/api/products/${editId}`,
      formData
    );

    const response = await axios.get(
      "https://inventory-management-rho-0chre.vercel.app/api/products"
    );

    setProducts(response.data);

    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: ""
    });

    setEditId(null);

  } catch (error) {
    console.log(error);
  }
};

  return (
   <div className="container">
      <h1>Inventory Dashboard</h1>

      <div className="dashboard">

  <div className="card">
    <h3>Total Products</h3>
    <h2>{products.length}</h2>
  </div>

  <div className="card">
    <h3>Total Stock</h3>
    <h2>
      {
        products.reduce(
          (total, item) => total + Number(item.stock),
          0
        )
      }
    </h2>
  </div>

  <div className="card">
    <h3>Inventory Value</h3>
    <h2>
      ₹{
        products.reduce(
          (total, item) =>
            total + Number(item.price) * Number(item.stock),
          0
        )
      }
    </h2>
  </div>

</div>

<hr />


<input
  type="text"
  placeholder="🔍 Search Product"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="form-section">

      <input
  type="text"
  name="productName"
  placeholder="Product Name"
  value={formData.productName}
  onChange={handleChange}
/>


<input
  type="text"
  name="category"
  placeholder="Category"
  value={formData.category}
  onChange={handleChange}
/>


<input
  type="number"
  name="price"
  placeholder="Price"
  value={formData.price}
  onChange={handleChange}
/>


<input
  type="number"
  name="stock"
  placeholder="Stock"
  value={formData.stock}
  onChange={handleChange}
/>


<div className="button-group">

<button
  className={editId ? "update-btn" : "add-btn"}
  onClick={editId ? updateProduct : addProduct}
>
  {editId ? "Update Product" : "Add Product"}
</button>

<button
  className="clear-btn"
  onClick={() => {
    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: ""
    });

    setEditId(null);
  }}
>
  Clear
</button>

</div>
</div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products
  .filter((item) =>
    item.productName
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item) => (
            <tr key={item._id}>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>

              <td>
  <button
  className="edit-btn"
  onClick={() => editProduct(item)}
>
    Edit
  </button>

  {" "}

  <button
  className="delete-btn"
  onClick={() => deleteProduct(item._id)}
>
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}



export default App;
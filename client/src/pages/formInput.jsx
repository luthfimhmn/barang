import { useRef, useState } from "react";
import "../styles/global.css";

function FormInput(params) {
  const [product, setProduct] = useState({
    name: "",
    purchase_price: 0,
    selling_price: 0,
    stock: 0,
    photo: "",
  });

  function handleChange(e, key) {
    if (key === "photo") {
      setProduct({
        ...product,
        ["photo"]: e.target.files[0],
      });
    } else {
      const { value } = e.target;
      setProduct({
        ...product,
        [key]: value,
      });
    }
  }

  function handleChangeMoney(e, key) {
    let value = e.target.value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("id-ID", {
      style: "decimal",
    });
    setProduct({
      ...product,
      [key]: value,
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    const result = await postProduct(product);
    console.log(result);
  }

  async function postProduct(product) {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("purchase_price", product.purchase_price);
    formData.append("selling_price", product.selling_price);
    formData.append("stock", product.stock);
    formData.append("photo", product.photo);

    try {
      let dataPost = await fetch(`${process.env.REACT_APP_BASEURL}/products`, {
        method: "post",
        body: formData,
      });

      let dataProducts = await fetch(
        `${process.env.REACT_APP_BASEURL}/products?limit=100`,
        {
          method: "get",
        }
      );

      //update data products in parent
      dataProducts = await dataProducts.json();
      params.setProducts(dataProducts);

      dataPost = await dataPost.json();
      return dataPost;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="form" onSubmit={(e) => submitForm(e)}>
      <div className="form__title">Product Upload</div>
      <p className="form__desc">
        Welcome to the upload product section, Lets hop in !!
      </p>
      <div className="form__item">
        <label htmlFor="product.nama" className="form__label">
          Enter Product Name:
        </label>
        <input
          type="text"
          className="form__input"
          name="product.name"
          value={product.name}
          onChange={(e) => handleChange(e, "name")}
          id="product.name"
          placeholder="Enter Product Name"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.purchase_price" className="form__label">
          Enter Purchase Price:
        </label>
        <input
          type="Number"
          className="form__input"
          name="product.purchase_price"
          value={product.purchase_price}
          onChange={(e) => handleChange(e, "purchase_price")}
          id="product.purchase_price"
          placeholder="Enter Purchase Price"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.selling_price" className="form__label">
          Enter Selling Price:
        </label>
        <input
          type="number"
          className="form__input form__input--small"
          name="product.selling_price"
          value={product.selling_price}
          onChange={(e) => handleChange(e, "selling_price")}
          id="product.selling_price"
          placeholder="Enter Selling Price"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.stock" className="form__label">
          Enter Stock:
        </label>
        <input
          type="number"
          className="form__input"
          name="product.stock"
          value={product.stock}
          onChange={(e) => handleChange(e, "stock")}
          id="product.stock"
          placeholder="Enter Product Stock"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.photo" className="form__label">
          Upload Image:
        </label>
        <input
          type="file"
          className="form__input"
          id="product.photo"
          onChange={(e) => handleChange(e, "photo")}
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <button className="form__btn">Submit</button>
      </div>
    </form>
  );
}

export default FormInput;

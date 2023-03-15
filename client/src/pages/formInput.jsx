import { useRef, useState } from "react";
import "../styles/global.css";

function Contoh(params) {
  const [product, setProduct] = useState({
    nama: "",
    harga_jual: 0,
    harga_beli: 0,
    stok: 0,
    foto: "",
  });

  function handleChange(e, key) {
    if (key === "foto") {
      setProduct({
        ...product,
        ["foto"]: e.target.files[0],
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

    formData.append("nama", product.nama);
    formData.append("harga_jual", product.harga_jual);
    formData.append("harga_beli", product.harga_beli);
    formData.append("stok", product.stok);
    formData.append("foto", product.foto);

    try {
      let dataPost = await fetch("http://localhost:3000/goods", {
        method: "post",
        body: formData,
      });

      let dataProducts = await fetch("http://localhost:3000/goods?limit=100", {
        method: "get",
      });

      dataProducts = await dataProducts.json();
      dataPost = await dataPost.json();
      params.setGoods(dataProducts);

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
          name="product.nama"
          value={product.nama}
          onChange={(e) => handleChange(e, "nama")}
          id="product.nama"
          placeholder="Enter Nama Produk"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.harga_jual" className="form__label">
          Enter Sell Price:
        </label>
        <input
          type="number"
          className="form__input form__input--small"
          name="product.harga_jual"
          value={product.harga_jual}
          onChange={(e) => handleChangeMoney(e, "harga_jual")}
          id="product.harga_jual"
          placeholder="Enter Sell Price"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.harga_beli" className="form__label">
          Enter Buy Price:
        </label>
        <input
          type="Number"
          className="form__input"
          name="product.harga_beli"
          value={product.harga_beli}
          onChange={(e) => handleChange(e, "harga_beli")}
          id="product.harga_beli"
          placeholder="Enter Buy Price"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.stok" className="form__label">
          Enter Stock:
        </label>
        <input
          type="number"
          className="form__input"
          name="product.stok"
          value={product.stok}
          onChange={(e) => handleChange(e, "stok")}
          id="product.stok"
          placeholder="Enter Stock"
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <label htmlFor="product.foto" className="form__label">
          Upload Image:
        </label>
        <input
          type="file"
          className="form__input"
          id="product.foto"
          onChange={(e) => handleChange(e, "foto")}
        />
        <span className="form__error">A Sample Error Message</span>
      </div>
      <div className="form__item">
        <button className="form__btn">Submit</button>
      </div>
    </form>
  );
}

export default Contoh;

import { useState, useEffect } from "react";
import FormInput from "./FormInput.jsx";
import Popup from "reactjs-popup";

const Home = () => {
    const [products, setProducts] = useState(null);

    useEffect(()=> {
        async function fetchData () {
            let dataProducts = await fetch(`${process.env.REACT_APP_BASEURL}/products?limit=100`);
            dataProducts = await dataProducts.json();
            setProducts(dataProducts);
        }

        fetchData();
    }, [])


    async function uploadImage() {
        const link = `${process.env.REACT_APP_BASEURL}/products`
    }
    
    if(products) {
        return (
        <div>
            <FormInput setProducts={setProducts}/>

            {/* <Popup trigger={<button>MODAL</button>} modal nested>
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Modal Title </div>
                  <div className="content">
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                  </div>
                </div>
              )}          
            </Popup> */}

            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Purchase Price</th>
                        <th>Selling Price</th>
                        <th>Stock</th>
                        <th>Photo</th>
                    </tr>
                </thead>
            {
                products.map((element,i) => { return (
                <tbody key={element.id}>
                    <tr>
                        <td>{i + 1}</td>
                        <td>{element.name}</td>
                        <td>{element.purchase_price}</td>
                        <td>{element.selling_price}</td>    
                        <td>{element.stock}</td>    
                        <td>
                            <img src={`http://localhost:3000/${element.photo}`} alt={element.name}></img>
                        </td>  
                    </tr>
                </tbody>)})
            }
            </table>
        </div>
        )
    } else {
        return null;
    }
}

export default Home;
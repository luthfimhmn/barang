import { useState, useEffect } from "react";
import Contoh from "./formInput.jsx";
import Popup from "reactjs-popup";

const Home = () => {
    const [goods, setGoods] = useState(null);
    useEffect(()=> {
        async function fetchData () {
            const testing = await fetch("http://localhost:3000/goods?limit=100")
            const data = await testing.json();
            setGoods(data)
        }

        fetchData()
    }, [])


    async function uploadImage() {
        const link = "http://localhost:3000/goods"
    }
    
    if(goods) {
        return (
        <div>
            <Contoh setGoods={setGoods}/>

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
                        <th>Nama</th>
                        <th>Harga Jual</th>
                        <th>Harga Beli</th>
                        <th>Stok</th>
                        <th>Foto</th>
                    </tr>
                </thead>
            {
                goods.map((element,i) => { return (
                <tbody key={element.id}>
                    <tr>
                        <td>{element.nama}</td>
                        <td>{element.harga_jual}</td>
                        <td>{element.harga_beli}</td>    
                        <td>{element.stok}</td>    
                        <td>
                            <img src={`http://localhost:3000/${element.foto}`} alt={element.nama}></img>
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
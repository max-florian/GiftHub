import React from 'react';
import './App.css';
import {PagoTarjeta} from "./components/PagoTarjeta";

function App() {
  const total = 56.25;
  const carrito = [
    {
      "card_id":"5",
      "card_name":"Microsoft",
      "card_image":"https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1XIn1?ver=1a7a",
      "card_value":"25",
      "card_price":43.75
    },
    /*{
      "card_id":"3",
      "card_name":"Steam",
      "card_image":"https://mojolika.com/wp-content/uploads/2019/04/196.png",
      "card_value":"25",
      "card_price":27.5
    },
    {
      "card_id":"3",
      "card_name":"Steam",
      "card_image":"https://mojolika.com/wp-content/uploads/2019/04/196.png",
      "card_value":"25",
      "card_price":27.5
    },*/
    /*{
      "card_id":"2",
      "card_name":"PlayStation",
      "card_image":"https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
      "card_value":"10",
      "card_price":12.5
    },
    {
      "card_id":"2",
      "card_name":"PlayStation",
      "card_image":"https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
      "card_value":"10",
      "card_price":12.5
    },*/
    {
      "card_id":"2",
      "card_name":"PlayStation",
      "card_image":"https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
      "card_value":"10",
      "card_price":12.5
    }
  ]
  return (
    <div>
      <PagoTarjeta total={total} carrito={carrito}/>
    </div>
  );
}

export default App;

import {Card} from './index'

export const card: Card = {
    id: "1",
    name: "Google Play",
    image: "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    chargeRate: 1,
    active: true,
    availability: [1,2,3,4],
    value:50
}

export const API_Card = [
    {
      "id": "1",
      "name": "Google Play",
      "image": "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
      "chargeRate": 1,
      "active": false,
      "availability": [
        1,
        2,
        4
      ]
    },
    {
      "id": "2",
      "name": "PlayStation",
      "image": "https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
      "chargeRate": 0.25,
      "active": true,
      "availability": [
        1,
        3
      ]
    }]

export const API_Value = [
    {
      "id": "1",
      "total": "10"
    },
    {
      "id": "2",
      "total": "25"
    },
    {
      "id": "3",
      "total": "50"
    },
    {
      "id": "4",
      "total": "100"
    }
  ]

export const fetchMock = jest.fn<any, any>((input) => {
    if(input.toString() == "https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card"){
        return Promise.resolve({
            json: () => Promise.resolve(API_Card)
        })
    }
    else if(input.toString() == "https://my-json-server.typicode.com/CoffeePaw/AyD1API/Value"){
        return Promise.resolve({
            json: () => Promise.resolve(API_Value)
        })
    }
    else{
        return Promise.reject("Bad endpoint");
    }
})

global.fetch = fetchMock;

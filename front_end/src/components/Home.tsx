import { useState } from 'react';
import Modal from  "./Modal"
import { createBasketName, isValidBasketName } from "../utils/basketUtilities";
import type { BasketUrls } from "../types/BasketUrls";

function BasketNameError({error}: {error: string}) {
  return (
    <div id="basket-name-error">{error}</div>
  );
}

export default function Home() {
  const [basketName, setBasketName] = useState(createBasketName());
  const [visibleModal, setVisibleModal] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<BasketUrls>({viewBasket: '', sendToBasket: ''});

  async function handleCreateBasket(e: React.SyntheticEvent) {
    e.preventDefault();
    setError('');
    
    if (!isValidBasketName(basketName)) {
      // alert user of problem with name
      setError('Basket name must be 8-25 chars, and can only include letters and numbers');
      
      return;
    }
    let options = {
      method: 'POST'
    }

    try {
      // let response = await fetch(`http://localhost:3000/${basketName}`, options);
      // if (response.ok) {
      //   let urls = await response.json();
      //   setUrls(urls);
      //   setVisibleModal(true);
      // } else {
      //   let message = await response.json(); // or are they sending the error as text?
      //   setError(message);
      // }

      // TEST MODAL:
      let urls: BasketUrls = {
        viewBasket: `http://localhost:3000/baskets/${basketName}`,
        sendToBasket: `http://localhost:3000/${basketName}`
      };
      setUrls(urls);
      setVisibleModal(true);
      setBasketName(createBasketName());
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
  
  return (
    <>
      {visibleModal && <Modal urls={urls}
                              setVisibleModal={setVisibleModal}/>}
      {error && <BasketNameError error={error}/>}     
      <form onSubmit={handleCreateBasket}>
        Basket Name:<input type="text"
          value={basketName}
          onChange={(e) => setBasketName(e.target.value)}></input>
        <button type="submit">Create Basket</button>
      </form>
    </>
  )
}
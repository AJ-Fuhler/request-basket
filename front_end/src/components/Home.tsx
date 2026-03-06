import { useState } from 'react';
import Modal from  "./Modal"

export default function Home() {
  const [basketName, setBasketName] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  async function handleCreateBasket(e: React.SyntheticEvent) {
    e.preventDefault();
    
    // if basketname's length is less than ..., alert the user of the length requirement and return
    let options = {
      method: 'POST'
    }

    try {
      let response = await fetch(`http://localhost:3000/${basketName}`, options);
      if (response.ok) {
        // extract both URLs from response? generate them programatically?
        // display instructions to user (as a modal)
        // LATER: update the list of baskets on the page?
        setToggleModal(true);
      } else if (response.status === 408){
        // tell user to pick a different basket name
      } else {
        // are there any other error messages? if not, fold this into the 
        // previous branch
      }
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    // if (validName()) {
    //   POST logic
    // } else {
    //   alert user of problem
    // }
    // POST logic
  }
  
  return (
    <>
      {toggleModal && <Modal />}
      <form onSubmit={handleCreateBasket}>
        <input type="text"
          value={basketName}
          onChange={(e) => setBasketName(e.target.value)}></input>
        <button type="submit"></button>
      </form>
    </>
  )
}
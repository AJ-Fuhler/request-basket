import type { SyntheticEvent } from "react";
import type { BasketUrls } from "../types/BasketUrls";
import { Link } from 'react-router-dom';

// export default function Modal({urls, setVisibleModal}:
//   { urls: BasketUrls,
//     setVisibleModal: (value: React.SetStateAction<boolean>) => void
//   }) {
  
//     // 'http://localhost:3000/mybasketname'
//     const basketName = urls.sendToBasket.split('/').slice(-1)[0];

//     // function handleHideModal(event: SyntheticEvent) {
//     //   let target = event.target as HTMLElement;
//     //   console.log(target);
//     //   console.log(document.getElementById('modal'))

//     //   if (!document.getElementById('modal')?.contains(target)) {
//     //     setVisibleModal(false);
//     //   }
//     // }

//   return (
//     <>
//       <main>
//         <p>Congratulations! Your basket has been created.</p>
//         <ul>
//           <li>To look at the contents of your basket, visit <Link to={`/baskets/${basketName}`}>{urls.viewBasket}</Link></li>
//           <li>To send an HTTP request to your basket, use {urls.sendToBasket}</li>
//         </ul>
//         <button onClick={() => setVisibleModal(false)}>Dismiss</button>
//       </main>
//     </>
//   );
// }


export default function Modal({urls, setVisibleModal}:
  { urls: BasketUrls,
    setVisibleModal: (value: React.SetStateAction<boolean>) => void
  }) {

    const basketName = urls.sendToBasket.split('/').slice(-1)[0];
  return (
    <div id="overlay"
         onClick={() => setVisibleModal(false)}>
      <main id="modal"
            onClick={e => e.stopPropagation()}>
        <p>Congratulations! Your basket has been created.</p>
        <ul>
          <li>To look at the contents of your basket, visit <Link to={`/baskets/${basketName}`}>{urls.viewBasket}</Link></li>
          <li>To send an HTTP request to your basket, use {urls.sendToBasket}</li>
        </ul>
      </main>
    </div>
  );
}
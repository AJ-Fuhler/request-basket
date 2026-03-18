import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RequestList from './RequestList.tsx';
import type { Request } from '../types/Request';
import { useSSE } from '../hooks/useSSE';

export default function Basket() {
  const [requests, setRequests] = useState<Array<Request>>([]);
  let { url } = useParams();
  const { newRequest } = useSSE(`https://aj-fuhler.com/api/${url}`);


  useEffect(() => {
    if (newRequest !== null) setRequests((prev) => [...prev, newRequest]);
  }, [newRequest]);

  function getRequests() {
    (async () => {
      try {
        let response = await fetch(`https://aj-fuhler.com/api/baskets/${url}/`);
        if (response.ok) {
          setRequests(await response.json());
        } else {
          let { error } = await response.json();
          console.error(error);
        }
      } catch (e: Error | unknown) {
        if (e instanceof Error) {
          console.error(e)
        }
      }
    })();
  }

  useEffect(getRequests, [url]);
  
  async function handleClearBasket() {
    let options = {
      method: 'PUT'
    };

    try {
      const response = await fetch(`https://aj-fuhler.com/api/${url}/clear`, options);
      if (!response.ok) {
        const { error } = await response.json();
        console.error(error);
        return;
      } 
      
      const { deletedCount } = await response.json();
      console.log(`Deleted ${deletedCount} responses`);
      setRequests([]);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  } 
  

  return (
    <div className="basket-container" id="basket">
      <h1 className="basket-title">Basket Name: {url}</h1>
      <div className="basket-list-wrapper">
        <RequestList requests={requests} />
      </div>
      <button onClick={handleClearBasket}
              style={{"backgroundColor": 'red'}}>
                Clear Basket
      </button>
      <Link className="back-link" to="/">Back</Link>
    </div>
  )
}
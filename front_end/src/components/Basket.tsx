import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestList from './RequestList.tsx';
import type { Request } from '../types/Request.ts'

const DUMMY_DATA: Array<Request> = [
  {
    "method": "GET",
    "headers": {

    },
    "body": "THIS IS THE PAYLOAD?",
    "timestamp": "Monday the whatever"
  },

  {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "name": "I DON'T KNOW",
      "reason": "THIS IS MY FIRST TIME BEING ALIVE GIVE ME A SECOND"
    },
    "timestamp": "I don't know what format these will arrive in"
  },

    {
    "method": "PUT",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {
        "randomKey": "RandomValue"
    },
    "timestamp": "Monday the whatever"
  }
]

export default function Basket() {
  const [requests, setRequests] = useState([]);
  let { url } = useParams();
  console.log(url);

  function getRequests() {
    (async () => {
      try {
        let response = await fetch(`http://localhost:3000/baskets/${url}/`);
        if (response.ok) {
          setRequests(await response.json());
        } else {
          // handle error
        }
      } catch (e: Error | unknown) {
        if (e instanceof Error) {
          console.log(e)
        }
      }
    })()
  }

  useEffect(getRequests, []);
  

  return (
  <>
    <h1>Basket Name: {url}</h1>
    <RequestList requests={DUMMY_DATA}/>
  </>)
}
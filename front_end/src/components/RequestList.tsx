import type { Request } from '../types/Request.ts';

export default function RequestList({requests}: {requests: Array<Request>}) {
  let nextKey = 0;
  return <>
    {requests.map((request) => {
    return  <ul key={nextKey++}>
                <li key={nextKey++}>Method: {request.method}</li>
                <li key={nextKey++}>Timestamp: {request.timestamp}</li>
                <li key={nextKey++}>Body:<br/>
                  {typeof request.body !== 'string' ? JSON.stringify(request.body) : request.body}
                </li>
                <li key={nextKey++}>Headers:<br/>
                  {JSON.stringify(request.headers)}
                </li>
            </ul>
    })}
  </>
}

/*

const DUMMY_REQUESTS

*/
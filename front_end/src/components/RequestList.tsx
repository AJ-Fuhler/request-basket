import type { Request }  from '../types/Request.ts';
import SingleRequest from './SingleRequest.tsx';

export default function RequestList({requests}: {requests: Array<Request>}) {
  let nextKey = 0;

  return (
    <div className="request-list">
      {requests.map((request) => (
        <ul className="request-list-item" key={nextKey++}>
          <SingleRequest request={request} />
        </ul>
      ))}
    </div>
  );
}
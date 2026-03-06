export interface Request {
  method: string,
  headers: Headers,
  body: string | {},
  timestamp: string,
}

interface Headers {
  [key: string]: string,
}

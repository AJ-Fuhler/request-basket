const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function createBasketName() {
  let result = '';

  for (let count = 0; count < 8; count++) {
    let randomIndex = Math.floor(Math.random() * 62);
    result += BASE62[randomIndex];
  }
  
  return result;
}

export function isValidBasketName(name: string) {
  // name must be between 8-25 chars and be alphanumeric
  const regex = /^[a-zA-Z0-9]{8,25}$/;
  return regex.test(name);
}

/* TESTS FOR REGEX
let valid1 = 'asdfasdfjh4455';
let valid2 = '2345236896jlkasdfnasdflkn';
let invalid1 = '23452368966jlkasdfnasdflkn';
let invalid2 = '+4598naefldfn';

console.log(isValidBasketName(valid1))
console.log(isValidBasketName(valid2))
console.log(isValidBasketName(invalid1))
console.log(isValidBasketName(invalid2))
*/
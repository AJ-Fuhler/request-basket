import mongoose from 'mongoose';
const { Schema } = mongoose;

const basketSchema = new Schema({
  endpoint: String,
  payload: Object, 
});

export const basketModel = {
  getBasketRequests(endpoint: string) {
    // logic
  },

  getExistingBaskets() {
    // logic
  }
}

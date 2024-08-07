import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: `mongodb+srv://eshop:nikola232@eshop.xzbq9bb.mongodb.net/?retryWrites=true&w=majority`, // heroku DB
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

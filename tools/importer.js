import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc} from 'firebase/firestore/lite';
import 'dotenv/config'
import * as fs from 'fs';

const firebaseConfig = {
  apiKey: process.env['API_KEY'] || 'API_KEY_VACIA',
  authDomain: process.env['AUTH_DOMAIN'] || 'AUTH_DOMAIN_VACIO',
  projectId: process.env['PROJECT_ID'] || 'PROJECT_ID_VACIO'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let data = null;

fs.readFile("./tools/movies.json", "utf8", (err, response) => {

  if (err) {
    console.error(err);
    return;
  }

  // En data tenemos los objetos del JSON de películas
  data = JSON.parse(response);
  data = data.movies;
  /**
   * Los parámetros de doc pueden ser multi nivel (ej "movies", "2020", ... , objecto (o { atributos: valores })) STRING!
   * El último parámetro, antes de los valores del objeto, es la referencia del objeto (el id)
   */
  for(let movie of data){
    const title = movie.title;
    delete movie.title;
    setDoc(doc(db, "movies", title), movie);
  }

});

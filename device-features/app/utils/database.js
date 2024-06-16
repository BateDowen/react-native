



// import * as SQLite from "expo-sqlite";

// const dataBase = SQLite.openDatabaseAsync("places.db");

// export async function init() {
//   try {
//     const promise = (await dataBase).withTransactionAsync(async () => {
//       (await dataBase).execAsync(
//         `CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL,imageUri TEXT NOT NULL,lat REAL NOT NULL,lng REAL NOT NULL)`
//       );
//     });
//     console.log("db");
//     console.log(promise);
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function insertPlace(place) {
//   try {
//     const promise = (await dataBase).runAsync(
//       `INSERT INTO places ( title, imageUri, lat, lng ) VALUES (?,?,?,?)`,
//       [place.title, place.imageUri, place.lat, place.lng]
//     );
    
  
//   } catch (error) {
//     console.log(error);
//   }
// }

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const getDb = async () => {
console.log('GET from the database');
const jateDB = await openDB('jate', 1);
const tx = jateDB.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.get(1);
const result = await request;
console.log('result.value', result);
return result?.value;
};


export const putDb = async (content) => { 
  console.log('PUT to database');
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, id: content });
  const result = await request;
  console.log('added to the database', result);
  
};

initdb();

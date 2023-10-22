import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const jateData = jateDB.transaction('jate', 'readwrite');
  const storeData = jateData.objectStore('jate');
  const request = storeData.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// Get all content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const jateData = jateDb.transaction('jate', 'readonly');
  const storeData = jateData.objectStore('jate');
  const request = storeData.getAll();
  const result = await request;
  console.log("Data read from db", result);
  return result?.value;
};

initdb();

export default class FirebaseTokenManager {
  constructor(keyPath) {
    this.accessToken = null;
    this.request = indexedDB.open('firebaseLocalStorageDb', 1);
    this.keyPath = keyPath;
  }

  async getToken() {
    const { keyPath } = this;
    return new Promise((resolve, reject) => {
      this.request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
      };

      this.request.onsuccess = (event) => {
        console.log(event);
        const db = event.target.result;
        resolve(this.getData(db, this.keyPath));
      };

      // create the Contacts object store and indexes
      this.request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const txn = db.transaction('firebaseLocalStorage', 'readonly');
        const store = txn.objectStore("firebaseLocalStorage");

        // get the index from the Object Store
        const query = store.get(keyPath);

        // return the result object on success
        query.onsuccess = () => {
          const { result } = query;

          console.log(result.value);
          const key = result.value.stsTokenManager.accessToken;

          console.log(key);
          resolve(key);
        };

        query.onerror = (e) => {
          console.log(e.target.errorCode);
          reject(e);
        };

        // close the database connection
        txn.oncomplete = () => {
          db.close();
        };
      };
    });
  }

  async getData(db, keyPath) {
    console.log(this.keyPath);
    console.log(keyPath);

    return new Promise((resolve, reject) => {
      const txn = db.transaction('firebaseLocalStorage', 'readonly');
      const store = txn.objectStore("firebaseLocalStorage");

      // get the index from the Object Store
      const query = store.get(keyPath);

      // return the result object on success
      query.onsuccess = () => {
        console.log(query.result); // result objects
        const { result } = query;

        console.log(result.value);
        const key = result.value.stsTokenManager.accessToken;
        resolve(key);
      };

      query.onerror = (event) => {
        console.log(event.target.errorCode);
        reject(event.target.errorCode);
      };

      // close the database connection
      txn.oncomplete = () => {
        db.close();
      };
    });
  }
}

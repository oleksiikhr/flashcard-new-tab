export default (event: IDBVersionChangeEvent): Promise<void> =>
  new Promise((resolve, reject) => {
    const db = (event.target as IDBOpenDBRequest).result;

    db.onerror = reject;

    db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });

    db.createObjectStore('decks', {
      keyPath: 'id',
      autoIncrement: true,
    });

    db.createObjectStore('labels', {
      keyPath: 'id',
      autoIncrement: true,
    });

    db.createObjectStore('card_label', {
      keyPath: ['card_id', 'label_id'],
    });

    resolve();
  });

export default (event: IDBVersionChangeEvent): Promise<void> =>
  new Promise((resolve, reject) => {
    const db = (event.target as IDBOpenDBRequest).result;

    db.onerror = reject;

    const decks = db.createObjectStore('decks', {
      keyPath: 'id',
      autoIncrement: true,
    });

    decks.createIndex('name', 'name');
    decks.createIndex('is_active', 'is_active');

    const cards = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });

    cards.createIndex('question', 'question');
    cards.createIndex('next_at', 'next_at');

    const labels = db.createObjectStore('labels', {
      keyPath: 'id',
      autoIncrement: true,
    });

    labels.createIndex('is_active', 'is_active');

    db.createObjectStore('card_label', {
      keyPath: ['card_id', 'label_id'],
    });

    db.createObjectStore('feed', {
      keyPath: ['card_id'],
    });

    resolve();
  });

export default (event: IDBVersionChangeEvent): Promise<void> =>
  new Promise((resolve, reject) => {
    const db = (event.target as IDBOpenDBRequest).result;

    db.onerror = reject;

    const cards = db.createObjectStore('cards', {
      keyPath: 'id',
    });

    cards.createIndex('status_idx', 'status');
    cards.createIndex('is_feed_idx', 'is_feed');
    cards.createIndex('next_at_idx', 'next_at');
    cards.createIndex('question_idx', 'question');

    resolve();
  });

export default (event: IDBVersionChangeEvent): Promise<void> =>
  new Promise((resolve, reject) => {
    const db = (event.target as IDBOpenDBRequest).result;

    db.onerror = reject;

    const cards = db.createObjectStore('cards', {
      keyPath: 'id',
    });

    cards.createIndex('is_feed_is_active_idx', ['is_feed', 'is_active']);
    cards.createIndex('is_active_idx', 'is_active');
    cards.createIndex('question_idx', 'question');

    resolve();
  });

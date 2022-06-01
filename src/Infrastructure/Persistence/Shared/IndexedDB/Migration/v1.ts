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
    decks.createIndex('generate_at', 'generate_at');

    const cards = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });

    cards.createIndex('question', 'question');
    cards.createIndex('next_at', 'next_at');

    const tags = db.createObjectStore('tags', {
      keyPath: 'id',
      autoIncrement: true,
    });

    tags.createIndex('deck_id_and_is_active', ['deck_id', 'is_active']);

    db.createObjectStore('card_tag', {
      keyPath: ['card_id', 'tag_id'],
    });

    const feed = db.createObjectStore('feed', {
      keyPath: 'card_id',
    });

    feed.createIndex('deck_id', 'deck_id');

    resolve();
  });

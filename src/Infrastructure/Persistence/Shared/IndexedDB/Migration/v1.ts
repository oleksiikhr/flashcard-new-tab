export default (event: IDBVersionChangeEvent): Promise<void> =>
  new Promise((resolve, reject) => {
    const db = (event.target as IDBOpenDBRequest).result;

    db.onerror = reject;

    const decks = db.createObjectStore('decks', {
      keyPath: 'id',
      autoIncrement: true,
    });

    decks.createIndex('generate_at_idx', 'generate_at');

    const cards = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });

    cards.createIndex('deck_id_and_is_active_idx', ['deck_id', 'is_active']);
    cards.createIndex('question_idx', 'question');

    const tags = db.createObjectStore('tags', {
      keyPath: 'id',
      autoIncrement: true,
    });

    tags.createIndex('deck_id_idx', 'deck_id');
    tags.createIndex('deck_id_and_name_idx', ['deck_id', 'name'], {
      unique: true,
    });

    const cardTag = db.createObjectStore('card_tag', {
      keyPath: ['card_id', 'tag_id'],
    });

    cardTag.createIndex('card_id_idx', 'card_id');
    cardTag.createIndex('tag_id_idx', 'tag_id');
    cardTag.createIndex('deck_id_idx', 'deck_id');

    const feed = db.createObjectStore('feed', {
      keyPath: 'card_id',
    });

    feed.createIndex('deck_id_idx', 'deck_id');

    const statistics = db.createObjectStore('statistics', {
      keyPath: 'id',
      autoIncrement: true,
    });

    statistics.createIndex('deck_id_idx', 'deck_id');
    statistics.createIndex('card_id_idx', 'card_id');

    resolve();
  });

import {
  createVocabularyCard,
  createDeck,
  createTag,
  syncTagsToCard,
} from '../bootstrap/bus';
import { random } from '../../Domain/Shared/Util/number';
import { log } from '../../Domain/Shared/Util/logger';

export default async () => {
  const decksCount = 50;
  const cardsCount = 1000;
  const tagsCount = 300;

  let promises = [];

  for (let i = 1; decksCount >= i; i += 1) {
    promises.push(createDeck(`Deck: ${i}`, !!random(0, 1), {}));
  }

  await Promise.all(promises);
  promises = [];
  log('Decks created');

  for (let i = 1; cardsCount >= i; i += 1) {
    promises.push(
      createVocabularyCard(
        random(1, decksCount),
        `Question: ${i}`,
        `Answer: ${i}`,
        '/transcription/',
      ),
    );
  }

  await Promise.all(promises);
  promises = [];
  log('Cards created');

  for (let i = 1; tagsCount >= i; i += 1) {
    promises.push(createTag(random(1, decksCount), `Tag: ${i}`));
  }

  await Promise.all(promises);
  promises = [];
  log('Tags created');

  for (let i = 1; cardsCount >= i; i += random(1, 10)) {
    const tagIds = [
      ...new Set(
        [...Array(random(1, 10)).keys()].map(() => random(1, tagsCount)),
      ),
    ];

    promises.push(syncTagsToCard(i, tagIds));
  }

  await Promise.all(promises);
  log('CardTag created');
};

import { findRandomActiveCardByDeckIdRequest } from '../../card/database/requests/findRandomActiveCardByDeckIdRequest';
import { updateDeckRequest } from '../../deck/database/requests/updateDeckRequest';
import { deleteFeedByDeckRequest } from '../database/requests/deleteFeedByDeckRequest';
import { createFeedRequest } from '../database/requests/createFeedRequest';
import { Deck, nextGenerateDeck } from '../../deck/model/deck';
import { Card } from '../../card/model/card';

export const feedGenerator = (
  deck: Deck,
): Promise<{ deck: Deck; cards: Card[] }> => {
  nextGenerateDeck(deck);

  if (!deck.isActive || !deck.metadata.activeCardsCount) {
    return updateDeckRequest(deck).then(() => ({ deck, cards: [] }));
  }

  return findRandomActiveCardByDeckIdRequest(
    deck.id,
    deck.settings.recalculate.count,
  )
    .then((cards) => deleteFeedByDeckRequest(deck).then(() => cards))
    .then((cards) =>
      Promise.all(cards.map((card) => createFeedRequest(card))).then(
        () => cards,
      ),
    )
    .then((cards) => updateDeckRequest(deck).then(() => ({ deck, cards })));
};

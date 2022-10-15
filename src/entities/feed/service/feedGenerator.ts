import Deck from '../../deck/model/Deck';
import Card from '../../card/model/Card';
import { findRandomActiveCardByDeckIdRequest } from '../../card/database/requests/findRandomActiveCardByDeckIdRequest';
import { updateDeckRequest } from '../../deck/database/requests/updateDeckRequest';
import { deleteFeedByDeckRequest } from '../database/requests/deleteFeedByDeckRequest';
import { createFeedRequest } from '../database/requests/createFeedRequest';

export const feedGenerator = (
  deck: Deck,
): Promise<{ deck: Deck; cards: Card[] }> => {
  deck.nextGenerateAt();

  if (!deck.getIsActive() || !deck.getActiveCardsCount()) {
    return updateDeckRequest(deck).then(() => ({ deck, cards: [] }));
  }

  return findRandomActiveCardByDeckIdRequest(
    deck.getId(),
    deck.getSettings().recalculate.count,
  )
    .then((cards) => deleteFeedByDeckRequest(deck).then(() => cards))
    .then((cards) =>
      Promise.all(cards.map((card) => createFeedRequest(card))).then(
        () => cards,
      ),
    )
    .then((cards) => updateDeckRequest(deck).then(() => ({ deck, cards })));
};

import Deck from '../../Domain/Modules/Deck/Deck';
import Card from '../../Domain/Modules/Card/Card';

export type ServiceWorkerRequest = {
  command: SWGenerateFeedRequest;
};

export type ServiceWorkerResponse = {
  result: 'success' | 'error';
  response: SWGenerateFeedResponse | unknown;
};

export type SWGenerateFeedRequest = {
  action: 'generateFeed';
  limit: number;
};

export type SWGenerateFeedResponse = {
  deck: Deck;
  cards: Card[];
}[];

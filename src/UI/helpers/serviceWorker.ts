import Deck from '../../Domain/Deck/Deck';
import Card from '../../Domain/Card/Card';

export type ServiceWorkerRequest = {
  command: SWGenerateFeedRequest;
};

export type ServiceWorkerResponse = {
  result: 'success' | 'error';
  response: SWGenerateFeedResponse;
};

export type SWGenerateFeedRequest = {
  action: 'generateFeed';
  limit: number;
};

export type SWGenerateFeedResponse = {
  deck: Deck;
  cards: Card[];
}[];

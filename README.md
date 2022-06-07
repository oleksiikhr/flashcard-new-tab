Set up the project

```shell
$ make up
```

- repeat push notification

# PAGES

- home page
- create card
- decks with cards
- statistics
- global settings

# ___

- CREATE DECK: -
- CREATE TAG:  decks.decks_count [inc]
- CREATE CARD: decks.cards_count [inc] | assign tag

- DELETE DECK: cards.deck_id [del] | tags.deck_id [del]
- DELETE TAG:  card_tag.tag_id [del] | decks.tags_count [sub]
- DELETE CARD: feed.card_id [del] | card_tag.card_id [del] | decks.cards_count [sub]

-------------------
-------------------
-------------------


> Delete card ID = 2 [1]
> BUS: cards.delete=2 [1]
> UpdateDeckOnCardDeleteListener: decks.cards_count-- [1]
> BUS: decks.update=2 [2]
> RefreshFeedOnDeckUpdateListener: remove/add all feed table [2]


# DATABASE

> global
- theme (dark, light, blue)

> decks
- id
- name
- is_active
- cards_count
- active_cards_count
- tags_count
- settings ({ count: 1000, recalculate: 'day/week/month', algorithm: 'random/sm2/leitner' })
- generate_at
- updated_at
- created_at

> cards
- id
- deck_id
- question
- content ({ answer: '' })
- template_type (question-answer, select, multi-select, etc)
- statistics ({ views: 0 })
- is_active
- next_at
- seen_at
- updated_at
- created_at

> tags
- id
- deck_id
- name
- is_active
- updated_at
- created_at

> card_tag
- card_id
- tag_id
- deck_id

> feed
- card_id
- deck_id

https://www.gettyimages.com/

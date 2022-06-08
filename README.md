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

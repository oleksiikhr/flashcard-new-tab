Set up the project

```shell
$ make up
```

# DATABASE

> global
- theme (dark / light)

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
- template_type (default, select, multiSelect, vocabulary)
- statistics ({ views: 0 })
- is_active
- seen_at
- updated_at
- created_at

> tags
- id
- deck_id
- name
- updated_at
- created_at

> card_tag
- card_id
- tag_id
- deck_id

> feed
- card_id
- deck_id

> statistics
- id
- deck_id
- card_id
- action
- created_at

https://www.gettyimages.com/

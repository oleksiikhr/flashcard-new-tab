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
- next_at
- seen_at
- updated_at
- created_at

> tags
- id
- deck_id
- name
- cards_count
- is_active
- updated_at
- created_at

> card_tag
- card_id
- tag_id

> feed
- card_id

https://www.gettyimages.com/



# Generate feed (every day/week/month OR on user request)

- search **N** decks `true === is_active AND cards_count > 0`
- search **N** tags `true === is_active AND cards_count > 0 AND in_decks`
- search **N** cards `in_decks AND in_tags`

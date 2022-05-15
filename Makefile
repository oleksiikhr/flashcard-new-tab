up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down && docker-compose build && docker-compose up -d

logs:
	docker-compose logs -f app

lint:
	docker-compose exec app pnpm lint:fix

eslint:
	docker-compose exec app pnpm eslint:fix

prettier:
	docker-compose exec app pnpm prettier:fix

stylelint:
	docker-compose exec app pnpm stylelint:fix

tests:
	docker-compose exec app pnpm test

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f app

sh:
	docker-compose exec app sh

build:
	docker-compose run app pnpm run build

typescript:
	docker-compose exec app pnpm typescript

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

tests-coverage:
	docker-compose exec app pnpm test:coverage

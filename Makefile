up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f app

build:
	docker-compose run app pnpm run build

lint:
	docker-compose run app pnpm lint:fix

eslint:
	docker-compose run app pnpm eslint:fix

prettier:
	docker-compose run app pnpm prettier:fix

stylelint:
	docker-compose run app pnpm stylelint:fix

tests:
	docker-compose run app pnpm test

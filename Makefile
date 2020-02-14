lerna-build:
	npm run build
build-common:
	cd ./src/extension-common && npm run build
	make lerna-build
dev-extension:
	cd ./src/calendar-extension && npm run dev
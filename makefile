.PHONY: build
build:
	@emcc src/main.cpp src/max.cpp -o ./dist/index.js

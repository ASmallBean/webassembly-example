.PHONY: build.wasm
build.wasm:
	@emcc src/main.cpp src/max.cpp -o ./dist/index.js


.PHONY: build.cpp
build.wasm:
	@g++ src/main.cpp -o ./dist/run

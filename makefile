SORT_DIR=src/sort
ADD_DIR=src/add
DIST_DIR=dist
WASI_SDK=/root/wasi-sdk-12.0


.PHONY: build.emcc.wasm
build.wasm:
	@emcc ${SORT_DIR}/main.cpp ${SORT_DIR}/max.cpp -o ${DIST_DIR}/index.js

.PHONY: build.sort.html
build.html:
	@emcc ${SORT_DIR}/main.cpp -s WASM=1 -o helloworld.html


.PHONY: build.wasi-app.clang
build.wasi-app:
	@clang  src/wasi-app/main.cpp -o wasi-app


.PHONY: build.wasi-app.g++
build.wasi-app.g++:
	@g++  src/wasi-app/main.cpp -o wasi-app



.PHONY: build.wasmtime.wasm
build.wasmtime:
	@${WASI_SDK}/bin/clang --target=wasm32-wasi --sysroot=${WASI_SDK}/share/wasi-sysroot src/wasmtime/main.c -o wasmtime-app.wasm


SORT_DIR=src/sort
ADD_DIR=src/add
DIST_DIR=dist
WASI_SDK=/root/wasi-sdk-12.0


.PHONY: build.emcc.wasm
build.wasm:
	@emcc ${ADD_DIR}/main.cpp ${ADD_DIR}/max.cpp -o ${ADD_DIR}/index.js

.PHONY: build.sort.js
build.sort.js:
	@emcc ${SORT_DIR}/main.cpp --std=c++11 -s WASM=1 -o ${SORT_DIR}/js/index.js --post-js ${SORT_DIR}/post-script.js --pre-js ${SORT_DIR}/pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

.PHONY: build.sort.html
build.sort.html:
	@emcc ${SORT_DIR}/main.cpp --std=c++11 -s WASM=1 -o ${SORT_DIR}/html/index.html --post-js ${SORT_DIR}/post-script.js --pre-js ${SORT_DIR}/pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"




.PHONY: build.wasi.g++
build.wasi.g++:
	@g++  src/wasi-app/main.cpp -o wasi-app


.PHONY: build.wasi.clang
build.wasi.clang:
	@clang  src/wasi-app/main.cpp -o wasi-app


.PHONY: build.wasi.wasm
 build.wasi.wasm:
	@${WASI_SDK}/bin/clang --target=wasm32-wasi --sysroot=${WASI_SDK}/share/wasi-sysroot src/wasi-app/main.cpp -o wasmtime-app.wasm

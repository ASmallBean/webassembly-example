DIST_DIR=dist
SORT_DIR=src/sort
ADD_DIR=src/add
DIP_DIR=src/dip
FIB_DIR=src/fib
GO_DIR=src/go
WASI_APP_DIR=src/wasi-app
WASI_SDK=/root/wasi-sdk-12.0


# add
.PHONY: build.add.js
build.add.js:
	@emcc ${ADD_DIR}/main.cpp -o ${ADD_DIR}/js/index.js

.PHONY: build.add.wasm
build.add.wasm:
	@emcc ${ADD_DIR}/main.cpp -o ${ADD_DIR}/index.js


# fib
.PHONY: build.fib.clang
build.fib.clang:
	@clang  ${FIB_DIR}/main.cpp -o fib_app


.PHONY: build.fib.wasm
build.fib.wasm:
	@emcc ${FIB_DIR}/fib.cpp --no-entry -o ${FIB_DIR}/dist/fib.wasm


.PHONY: build.fib.html
build.fib.html:
	@emcc ${FIB_DIR}/main.cpp -o ${FIB_DIR}/html/index.html


.PHONY: build.fib.js
build.fib.js:
	@emcc ${FIB_DIR}/main.cpp -o ${FIB_DIR}/js/index.js



# go
.PHONY: build.go.wasm
build.go.wasm:
	@cd ${GO_DIR} && GOOS=js GOARCH=wasm go build -o main.wasm && cd -




# dip
.PHONY: build.dip.dist
build.dip.dist:
	@emcc ${DIP_DIR}/main.cpp -s WASM=1 -O1 -o ${DIP_DIR}/dist/dip.js --post-js ${DIP_DIR}/post-script.js -s "EXPORTED_FUNCTIONS=['_malloc','_free']"






# sort
.PHONY: build.sort.js
build.sort.js:
	@emcc ${SORT_DIR}/main.cpp --std=c++11 -s WASM=1 -o ${SORT_DIR}/js/index.js --post-js ${SORT_DIR}/post-script.js --pre-js ${SORT_DIR}/pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

.PHONY: build.sort.html
build.sort.html:
	@emcc ${SORT_DIR}/main.cpp --std=c++11 -s WASM=1 -o ${SORT_DIR}/html/index.html --post-js ${SORT_DIR}/post-script.js --pre-js ${SORT_DIR}/pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"





# wasi
.PHONY: build.wasi.g++
build.wasi.g++:
	@g++  ${WASI_APP_DIR}/main.cpp -o wasi-app


.PHONY: build.wasi.clang
build.wasi.clang:
	@clang++  ${WASI_APP_DIR}/main.cpp -o wasi-app


.PHONY: build.wasi.wasm
 build.wasi.wasm:
	@${WASI_SDK}/bin/clang --target=wasm32-wasi --sysroot=${WASI_SDK}/share/wasi-sysroot src/wasi-app/main.cpp -o wasmtime-app.wasm

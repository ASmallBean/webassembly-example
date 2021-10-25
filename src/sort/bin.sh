emcc main.cpp --std=c++11 -s WASM=1 -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

emcc main.cpp -O3 --std=c++11 -s WASM=1 -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

emcc main.cpp -O3 --closure 1  --std=c++11 -s WASM=1 -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

EMCC_DEBUG=1 emcc main.cpp -O3 --std=c++11 -s WASM=1 --no-entry -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

EMCC_DEBUG=2 emcc main.cpp -O3 --std=c++11 -s WASM=1 --no-entry -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

EMCC_DEBUG=2 emcc main.cpp -g4 -O3 --std=c++11 -s WASM=1 --no-entry -o main.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

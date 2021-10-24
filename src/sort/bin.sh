emcc index.cc --std=c++11 -s WASM=1 -o index.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

emcc index.cc -O3 --std=c++11 -s WASM=1 -o index.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

emcc index.cc -O3 --closure 1  --std=c++11 -s WASM=1 -o index.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"

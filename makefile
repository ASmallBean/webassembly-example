CppDir=src/cpp
CcDir=src/cc
DistDir=dist



.PHONY: build.wasm
build.wasm:
	@emcc ${CppDir}/main.cpp ${CppDir}/max.cpp -o ${DistDir}/index.js


.PHONY: build.cpp
build.cpp:
	@g++ ${CppDir}/main.cpp -o ${DistDir}/run


.PHONY: build.html
build.html:
	@emcc ${CppDir}/main.cpp -s WASM=1 -o helloworld.html


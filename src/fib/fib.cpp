#include <iostream>
#include <ctime>
#include <emscripten.h>
using namespace std;

extern "C" { // 避免 Name Mangling
   // 宏参数 避免DCE
  int EMSCRIPTEN_KEEPALIVE fib(int x){
    if(x <= 0){
      return 0;
    }
    if(x<=2){
      return 1;
    }
    return fib(x-1) + fib(x-2);
  }
}

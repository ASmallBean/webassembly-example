#include <iostream>
#include <vector>
#include <emscripten.h>

using namespace std;

int g_int = 42;
double g_double = 3.1415926;

extern "C"
{
  EMSCRIPTEN_KEEPALIVE int *get_int_ptr()
  {
    return &g_int;
  }

  EMSCRIPTEN_KEEPALIVE double *get_double_ptr()
  {
    return &g_double;
  }

  EMSCRIPTEN_KEEPALIVE void print_data()
  {
    printf("C{g_int:%d}\n", g_int);
    printf("C{g_double:%lf}\n", g_double);
  }

  EMSCRIPTEN_KEEPALIVE void print_int(int a)
  {
    printf("C{print_int() a:%d}\n", a);
  }

  EMSCRIPTEN_KEEPALIVE void printfloat(float a)
  {
    printf("C{print_float() a:%f}\n", a);
  }

  EMSCRIPTEN_KEEPALIVE void print_double(double a)
  {
    printf("C{print_double() a:%lf}\n", a);
  }
}

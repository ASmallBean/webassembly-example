#include <iostream>
#include <ctime>
#include <emscripten.h>

using namespace std;

extern "C"
{
  EMSCRIPTEN_KEEPALIVE int fib(int x)
  {
    if (x <= 0)
    {
      return 0;
    }
    if (x <= 2)
    {
      return 1;
    }
    return fib(x - 1) + fib(x - 2);
  }
}

int main()
{
  clock_t t1, t2;
  t1 = clock();
  cout << t1 << endl;
  int result = fib(40);
  // for (int a = 10; a < 35; a = a + 1)
  // {
  //   fib(40);
  // }
  t2 = clock();
  cout << t2 << endl;
  cout << result << endl;
  cout << (t2 - t1) / 1000 << "ms" << endl;
  return 0;
}

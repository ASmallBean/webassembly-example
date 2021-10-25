#include <iostream>
#include <emscripten.h>

using namespace std;

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int add(int x, int y) {
    return x + y;
  }
}


int main()
{

  std::cout << "Hello World!" << std::endl;


	int max_self(int x, int y);//调用前声明一下max函数
	int a = 13, b = 130;
	cout << "最大值为：" << max(a, b) << endl;
	// system("pause");

  std::cout << add(10, 20) << std::endl;

	return 0;
}

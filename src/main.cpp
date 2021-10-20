#include<iostream>
using namespace std;

int main()
{

  std::cout << "Hello World!" << std::endl;

	int max(int x, int y);//调用前声明一下max函数
	int a = 13, b = 130;
	cout << "最大值为：" << max(a, b) << endl;
	// system("pause");
	return 0;
}

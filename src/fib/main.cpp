#include <iostream>
#include <ctime>
using namespace std;

int fib(int x){
  if(x <= 0)
    return 0;

  if(x <= 2)
    return 1;

  return fib(x-1) + fib(x-2);
}


int main(){
  int t1,t2;
  t1 = clock();

  // for( int a = 10; a < 35; a = a + 1 )
  // {
      fib(40);
  // }
  t2 = clock();
  cout<< (t2 - t1)/1000 <<"ms"<<endl;
	return 0;
}

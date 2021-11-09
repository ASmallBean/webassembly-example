#include <iostream>
#include <vector>
#include <cmath>
#include <emscripten.h>
using namespace std;

void swap(char *a, char *b)
{
    char t = *a;
    *a = *b;
    *b = t;
}

void printArr(char arr[], char length)
{
    vector<char> t(arr, arr + length);
    cout << "C++执行过程打印"
         << " ";
    for (auto &e : t)
    {
        cout << (int)e << " ";
    }
    cout << endl;
}
char partition(char arr[], char low, char high)
{
    char pivot = arr[high];
    char i = (low - 1);
    for (char j = low; j <= high - 1; j++)
    {
        if (arr[j] <= pivot)
        {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

extern "C"
{
    char *EMSCRIPTEN_KEEPALIVE quickSort(char arr[], char low, char high)
    {
        if (low < high)
        {
            printArr(arr, high + 1);
            char pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
        return arr;
    }

    double EMSCRIPTEN_KEEPALIVE doubleSqrt(double x)
    {
        return sqrt(x);
    }
}

int main()
{
    std::cout << "Hello World!" << std::endl;
}

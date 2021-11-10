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
    EMSCRIPTEN_KEEPALIVE char *quickSort(char arr[], char low, char high)
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

    EMSCRIPTEN_KEEPALIVE double doubleSqrt(double x)
    {
        return sqrt(x);
    }

    EMSCRIPTEN_KEEPALIVE unsigned char *doubleStr(unsigned char *string)
    {
        int i = 0;
        int count = 0;
        while (1)
        {
            //获取每个位置字符的ASCII编码值
            char _current_pos = *(string + i);

            //如果处理到字符串结尾，则退出循环
            if (_current_pos == '\0')
            {
                break;
            }
            else
            {
                *(string + i) = _current_pos - 1;
            }
            i++;
        }

        return string;
    }

    //参数为C-style字符串
    EMSCRIPTEN_KEEPALIVE unsigned char *capitalize(unsigned char *string)
    {
        int i = 0;
        while (1)
        {
            //获取每个位置字符的ASCII编码值
            char _current_pos = *(string + i);
            //转换为大写形式
            if (_current_pos >= 0x61 && _current_pos <= 0x7a)
            {
                *(string + i) = _current_pos - 32;
            }
            //如果处理到字符串结尾，则退出循环
            if (_current_pos == '\0')
            {
                break;
            }
            i++;
        }
        return string;
    }

    // 将数组所有元素值增加1
    EMSCRIPTEN_KEEPALIVE char *increment(char array[], int length)
    {
        for (int i = 0; i < length; i++)
        {
            // std::cout << array[i] << std::endl;
            array[i] = 1;
        }
        return array;
    }
}

int main()
{
    std::cout << "C++ Main" << std::endl;
}

#include <iostream>
#include <vector>
#include <cmath>
#include <emscripten.h>
using namespace std;

extern "C"
{
    EMSCRIPTEN_KEEPALIVE int multiple(double m[], int mr, int mc, double n[], int nr, int nc, double result[])
    {
        if (mc != nr)
        {
            return -1;
        }
        for (int y = 0; y < mr; y++)
        {
            for (int x = 0; x < nc; x++)
            {
                double sum = 0;
                for (int k = 0; k < mc; k++)
                {
                    sum += m[y * mc + k] * n[k * nc + x];
                }
                result[y * nc + x] = sum;
            }
        }
        return 0;
    }
}

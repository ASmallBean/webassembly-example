# 优化Wasm应用

[![img](https://upload.jianshu.io/users/upload_avatars/12058546/560c140c-259c-40fd-a746-038c22516c4e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp)](https://www.jianshu.com/u/ba316aea6e34)

[爱笨笨的阿狸](https://www.jianshu.com/u/ba316aea6e34)关注

0.1162019.12.30 16:22:19字数 518阅读 527

#### 当在浏览器中运行一个完整的`WebAssembly`应用时，

需要经历:**从远程位置下载模块二进制文件、下载用于连接上层JavaScript环境与模块实例的“胶水”脚本文件、初始化模块需要使用的内存和变量资源等环节。**
而一旦其中某个环节消耗的时间过长，`WebAssembly`本身所带来的性能优势便无法得到完全体现，甚至应用的整体运行效率可能还会低于具有同样功能但完全基于JavaScript 语言编写的应用。
因此：**我们可以从减小生成模块的文件体积、模块对象的加载与重用以及“胶水”脚本文件的代码压缩**等多个方面来优化并提高Wasm应用的整体运行效率。

### 快排例子

##### index.cc

```cpp
#include <iostream>
#include <vector>
#include <emscripten.h>
using namespace std;
void swap(char* a,char* b){
    char t =*a;
    *a=*b;
    *b=t;
}
void printArr(char arr[],char length){
    vector<char> t(arr,arr+length);
    for(auto &e:t){
        cout<<(int)e<<" ";
    }
    cout<<endl;
}
char partition (char arr[],char low,char high){
    char pivot = arr[high];
    char i =(low-1);
    for(char j=low;j<=high-1;j++){
        if(arr[j]<=pivot){
            i++;
            swap(&arr[i],&arr[j]);
        }
    }
    swap(&arr[i+1],&arr[high]);
    return (i+1);
}
extern "C" char* EMSCRIPTEN_KEEPALIVE quickSort(char arr[],char low,char high){
    if(low<high){
        printArr(arr,high+1);
        char pi = partition(arr,low,high);
        quickSort(arr,low,pi-1);
        quickSort(arr,pi+1,high);
    }
    return arr;
}
```

##### 附加post-script.js代码



```php
__ATPOSTRUN__.push(() =>{
    //创建一个WebIDL对象
    var array = [11,24,36,42,4,25,9,1,0];
    var arrayPointer = Module['cwrap']('quickSort','number',['array','number','number'])(array,0,array.length-1);
    var clearArrResult = [];
    for(let i =0;i<array.length;i++){
        clearArrResult.push(Module['getValue'](arrayPointer+i,'i8'));
    }
    console.log(clearArrResult);
});
```

##### 命令

```
emcc index.cc --std=c++11 -s WASM=1 -o index.js --post-js post-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"
```

##### 运行结果

![img](https://upload-images.jianshu.io/upload_images/12058546-e0884aec3a5669e8.png?imageMogr2/auto-orient/strip|imageView2/2/w/796/format/webp)

### 加入性能测试代码

##### 附件在胶水代码最前面的pre-script.js代码



```csharp
var startTimestamp = performance.now();
```

##### 修改附加post-script.js代码



```jsx
__ATPOSTRUN__.push(() =>{
    //创建一个WebIDL对象
    var array = [11,24,36,42,4,25,9,1,0];
    var arrayPointer = Module['cwrap']('quickSort','number',['array','number','number'])(array,0,array.length-1);
    var clearArrResult = [];
    for(let i =0;i<array.length;i++){
        clearArrResult.push(Module['getValue'](arrayPointer+i,'i8'));
    }
    console.log(clearArrResult);
    var time = performance.timing;
    var loadingTime = time.loadEventStart - time.navigationStart;
    var executionTime = performance.now() - startTimestamp;
    var totalTime = new Date().getTime() - time.navigationStart;
    //打印应用的脚本执行时间
    console.log("Application ET:",Math.round(executionTime),"ms");
    //打印应用的脚本下载时间和初始化时间
    console.log("Application LT:",loadingTime,"ms");
    //打印应用的整体时间
    console.log("Application TT:",totalTime,"ms");
});
```

**再次运行结果**

![img](https://upload-images.jianshu.io/upload_images/12058546-70b5efc4398489d8.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)



### 1.使用编译器代码优化策略

一般是`-O3`这个选项

##### 命令

```
emcc index.cc -O3 --std=c++11 -s WASM=1 -o index.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"
```

**文件大小**

![img](https://upload-images.jianshu.io/upload_images/12058546-8f903444145033df.png?imageMogr2/auto-orient/strip|imageView2/2/w/657/format/webp)



**性能时间**

![img](https://upload-images.jianshu.io/upload_images/12058546-e4b363d028c37029.png?imageMogr2/auto-orient/strip|imageView2/2/w/820/format/webp)

O3优化



![img](https://upload-images.jianshu.io/upload_images/12058546-034471ce2ccd0a4a.png?imageMogr2/auto-orient/strip|imageView2/2/w/753/format/webp)



### 2.使用GCC压缩代码

这里我遇到ES6语法不支持，所以把它修改成了ES5 在线修改地址
[https://babeljs.io/repl](https://links.jianshu.com/go?to=https%3A%2F%2Fbabeljs.io%2Frepl)



```jsx
__ATPOSTRUN__.push(function () {
    //创建一个WebIDL对象
    var array = [11,24,36,42,4,25,9,1,0];
    var arrayPointer = Module['cwrap']('quickSort','number',['array','number','number'])(array,0,array.length-1);
    var clearArrResult = [];
    for(var i =0;i<array.length;i++){
        clearArrResult.push(Module['getValue'](arrayPointer+i,'i8'));
    }
    console.log(clearArrResult);
    var time = performance.timing;
    var loadingTime = time.loadEventStart - time.navigationStart;
    var executionTime = performance.now() - startTimestamp;
    var totalTime = new Date().getTime() - time.navigationStart;
    //打印应用的脚本执行时间
    console.log("Application ET:",Math.round(executionTime),"ms");
    //打印应用的脚本下载时间和初始化时间
    console.log("Application LT:",loadingTime,"ms");
    //打印应用的整体时间
    console.log("Application TT:",totalTime,"ms");
});
```

由于GCC本身是基于Java语言编写的，因此在使用该优化器前，请确认本机已经预装了JRE (Java 运行时环境)，并确保可以在命令行的全局环境下直接调用`java` 命令。

![img](https://upload-images.jianshu.io/upload_images/12058546-715726ebb0987dac.png?imageMogr2/auto-orient/strip|imageView2/2/w/458/format/webp)


相比于我们常用的`UglifyJS`压缩库，GCC在JavaScript代码的压缩优化策略上会显得更加激进，在某种程度上可能会具有一-定的破坏性，即在压缩过程中破坏了原始代码的可读性结构。但也正是由于这种对源代码的“分析破坏”和“再重构”过程，使得GCC成为压缩率最高的JavaScript代码优化工具。
如果想要使用GCC对当前的Wasm应用进行优化，则需要对上层的JavaScript 脚本代码做出一些改变。在调用Emscripten运行时环境所提供的cwarp方法时，是通过`Module[cwrap]`这种**字面量属性值的方式**来调用的。而这就是专门为使用GCC而做出的改变。实际上，在使用GCC压缩代码时，它会将所有`Module.cwrap`这种属性值形式的函数调用过程进行重构，并压缩属性名的字符串长度。而以字面量属性值形式表示的调用过程则会被**原封不动**地保留下来。因此，这里需要与Emscripten “胶水”脚本内部的函数



##### 通过添加参数`--closure 1`

##### 命令

```
emcc index.cc -O3 --closure 1 --std=c++11 -s WASM=1 -o index.js --post-js post-script.js --pre-js pre-script.js -s EXPORTED_RUNTIME_METHODS="['cwrap','getValue']"
```

![img](https://upload-images.jianshu.io/upload_images/12058546-6275a29e426543e0.png?imageMogr2/auto-orient/strip|imageView2/2/w/820/format/webp)



![img](https://upload-images.jianshu.io/upload_images/12058546-57a06eefa1e94c34.png?imageMogr2/auto-orient/strip|imageView2/2/w/704/format/webp)

只有28.7KB

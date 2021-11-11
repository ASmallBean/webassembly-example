__ATPOSTRUN__.push(() => {
  console.log("-------------------- quickSort ----------------------------------")
  //创建一个WebIDL对象
  var array = [11, 24, 36, 42, 4, 25, 9, 1, 0];

  console.log("Module对象:%o", Module);
  console.log("原数组:%o", array);

  var incrementPointer = Module['cwrap']('quickSort', 'number', ['array', 'number', 'number'])(array, 0, array.length - 1);
  // var arrayPointer = Module._quickSort(array, 0, array.length - 1)

  var arrResult = [];
  console.log("arrayPointer:%o", incrementPointer);
  for (let i = 0; i < array.length; i++) {
    arrResult.push(Module['getValue'](incrementPointer + i, 'i8'));
  }

  console.log("排序结果:%o", arrResult);
  var time = performance.timing;
  var loadingTime = time.loadEventStart - time.navigationStart;
  var executionTime = performance.now() - startTimestamp;
  var totalTime = new Date().getTime() - time.navigationStart;

  //打印应用的脚本下载时间和初始化时间
  console.log("Application LT:", loadingTime, "ms");
  //打印应用的脚本执行时间
  console.log("Application ET:", Math.round(executionTime), "ms");
  //打印应用的整体时间
  console.log("Application TT:", totalTime, "ms");

  console.log("-------------------- doubleSqrt ----------------------------------")
  // 兼容
  const resultNum = Module._doubleSqrt(3)
  // const resultNum = Module['cwrap']('doubleSqrt', 'number', ['number'])(3);
  console.log("Module._doubleSqrt(3) ==>" + resultNum)


  console.log("-------------------- doubleStr ----------------------------------")
  // const resultStr = Module._doubleStr("efg")
  const resultStr = Module['cwrap']('doubleStr', 'string', ['string'])("efg");
  console.log("Module.doubleStr('efg') ==>" + resultStr)

  console.log("-------------------- capitalize ----------------------------------")
  const capitalizeResult = Module["ccall"]('capitalize', 'string', ['string'], ["abcdefg"]);
  console.log("Module._capitalizeResult('abcdefg') ==>" + capitalizeResult)

  console.log("-------------------- increment ----------------------------------")
  const incrementArray = [1, 2, 10, 4];
  //返回数组首地址
  var incrementPointer = Module["ccall"]('increment', 'number', ['array', 'number'], [array, array.length]);

  //定义一个结果集容器
  let clearArrResult = [];
  for (let i = 0; i < incrementArray.length; i++) {
    //通过Emscripten运行时环境的Module.getValue函数从模块共享线性内存中提取数据
    clearArrResult.push(Module['getValue'](incrementPointer + i, 'i8'));
  }
  console.log("Module._increment([1, 2, 3, 4],3) ==>" + clearArrResult)

});

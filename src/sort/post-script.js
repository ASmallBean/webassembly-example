__ATPOSTRUN__.push(() => {
  //创建一个WebIDL对象
  var array = [11, 24, 36, 42, 4, 25, 9, 1, 0];

  console.log("Module对象:%o", Module);
  console.log("原数组:%o", array);

  var arrayPointer = Module['cwrap']('quickSort', 'number', ['array', 'number', 'number'])(array, 0, array.length - 1);
  // var arrayPointer = Module._quickSort(array, 0, array.length - 1)

  var arrResult = [];
  console.log("arrayPointer:%o", arrayPointer);
  for (let i = 0; i < array.length; i++) {
    arrResult.push(Module['getValue'](arrayPointer + i, 'i8'));
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


  console.log("------------------------------------------------------")
  console.log("Module._doubleSqrt(3)==>" + Module._doubleSqrt(3))

});

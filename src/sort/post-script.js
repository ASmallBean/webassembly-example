__ATPOSTRUN__.push(() => {
  //创建一个WebIDL对象
  var array = [11, 24, 36, 42, 4, 25, 9, 1, 0];
  var arrayPointer = Module['cwrap']('quickSort', 'number', ['array', 'number', 'number'])(array, 0, array.length - 1);
  var clearArrResult = [];
  for (let i = 0; i < array.length; i++) {
    clearArrResult.push(Module['getValue'](arrayPointer + i, 'i8'));
  }
  console.log(clearArrResult);
});

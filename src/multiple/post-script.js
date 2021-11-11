__ATPOSTRUN__.push(() => {

  const assemblyMatrixMultiple = function (mr, mc, nr, nc) {
    // 分配内存空间
    const mPtr = Module._malloc(Float64Array.BYTES_PER_ELEMENT * mr * mc);
    const nPtr = Module._malloc(Float64Array.BYTES_PER_ELEMENT * nr * nc);
    const result = Module._malloc(Float64Array.BYTES_PER_ELEMENT * mr * nc);
    return function (m, n) {
      // 填充数据
      Module.HEAPF64.set(m, mPtr / Float64Array.BYTES_PER_ELEMENT);
      Module.HEAPF64.set(n, nPtr / Float64Array.BYTES_PER_ELEMENT);
      // 调用wasm中的multiple函数
      Module._multiple(mPtr, mr, mc, nPtr, nr, nc, result);
      // 取出结果
      return Module.HEAPF64.subarray(result / 8, result / 8 + mr * nc);
    };
  };

  const matMultipleWasm = assemblyMatrixMultiple(20, 20, 20, 20);

  function jsMultiple(m, mr, mc, n, nr, nc, result) {
    if (mc !== nr) {
      return -1;
    }

    for (let y = 0; y < mr; y++) {
      for (let x = 0; x < nc; x++) {
        let sum = 0;
        for (let k = 0; k < mc; k++) {
          sum += m[y * mc + k] * n[k * nc + x];
        }
        result[y * nc + x] = sum;
      }
    }
    return 0;
  }


  function test(loop = 1000) {
    const result = new Array(400);
    console.time("js");
    for (let i = 0; i < loop; i++) {
      const m = [];
      const n = [];
      for (let i = 0; i < 400; i++) {
        m.push(Math.random());
        n.push(Math.random());
      }

      jsMultiple(m, 20, 20, n, 20, 20, result);
    }
    console.timeEnd("js");

    console.time("asm");
    for (let i = 0; i < loop; i++) {
      const m = [];
      const n = [];
      for (let i = 0; i < 400; i++) {
        m.push(Math.random());
        n.push(Math.random());
      }
      matMultipleWasm(m, n);
    }
    console.timeEnd("asm");
  }

  test()
});

__ATPOSTRUN__.push(function () {

  // 全局状态；
  const STATUS = ['STOP', 'JS', 'WASM'];
  // 当前状态；
  let GLOBAL_STATUS = 'STOP';
  // 监听用户点击事件；
  const eles = document.getElementsByClassName("radio-div")
  for (let i = 0; i < eles.length; i++) {
    eles[i].onclick = (e) => {
      GLOBAL_STATUS = STATUS[
        Number(
          document.querySelector("input[name='options']:checked").value
        )
      ];
      start()
    };
  }

  // variable and parameters;
  var fpsNumDisplayElement = document.querySelector('.fps-num');
  var jsTimeRecords = [], wasmTimeRecords = [];
  var clientX, clientY;

  // filters related stuff;
  var kernel = [
    [-1, -1, 1],
    [-1, 14, -1],
    [1, -1, -1]
  ];
  var divisor = 4;


  // convex function (JS version);
  function jsConvFilter(data, width, height, kernel, divisor) {
    const w = kernel[0].length;
    const h = kernel.length;
    const half = Math.floor(h / 2);
    // picture iteration;
    for (var y = 1; y < height - 1; y += 1) {
      for (var x = 1; x < width - 1; x += 1) {
        const px = (y * width + x) * 4;  // pixel index
        var r = 0, g = 0, b = 0;
        // core iteration;
        for (var cy = 0; cy < h; ++cy) {
          for (var cx = 0; cx < w; ++cx) {
            // dealing edge case;
            const cpx = ((y + (cy - half)) * width + (x + (cx - half))) * 4;
            r += data[cpx + 0] * kernel[cy][cx];
            g += data[cpx + 1] * kernel[cy][cx];
            b += data[cpx + 2] * kernel[cy][cx];
          }
        }

        data[px + 0] = ((r / divisor) > 255) ? 255 : ((r / divisor) < 0) ? 0 : r / divisor;
        data[px + 1] = ((g / divisor) > 255) ? 255 : ((g / divisor) < 0) ? 0 : g / divisor;
        data[px + 2] = ((b / divisor) > 255) ? 255 : ((b / divisor) < 0) ? 0 : b / divisor;
      }
    }
    return data;
  }


  // filters functions;
  function filterWASM(pixelData, width, height) {

    const arLen = pixelData.length;

    const memData = Module['_malloc'](arLen * Uint8Array.BYTES_PER_ELEMENT);
    // fill data into buffer;
    HEAPU8.set(pixelData, memData / Uint8Array.BYTES_PER_ELEMENT);

    const flatKernel = kernel.reduce(function (acc, cur) {
      return acc.concat(cur)
    });

    const memKernel = Module['_malloc'](9 * Int8Array.BYTES_PER_ELEMENT);

    // fill data into buffer;
    HEAP8.set(flatKernel, memKernel / Int8Array.BYTES_PER_ELEMENT);

    // core;
    Module['_convFilter'](memData, width, height, memKernel, 3, 3, divisor);

    // retrieve data;
    const filtered = HEAPU8.subarray(memData / Uint8Array.BYTES_PER_ELEMENT, memData / Uint8Array.BYTES_PER_ELEMENT + arLen);

    // clean;
    Module['_free'](memData);
    Module['_free'](memKernel);
    return filtered;
  }


  // fileters (JS polyfill);
  function filterJS(pixelData, width, height) {
    return jsConvFilter(pixelData, width, height, kernel, divisor);
  }

  function calcFPS(vector) {
    // 提取容器中的前 20 个元素来计算平均值；
    const AVERAGE_RECORDS_COUNT = 20;
    if (vector.length > AVERAGE_RECORDS_COUNT) {
      vector.shift(-1);  // 维护容器大小；
    } else {
      return 'NaN';
    }
    // 计算平均每帧在绘制过程中所消耗的时间；
    let averageTime = (vector.reduce((pre, item) => {
      return pre + item;
    }, 0) / Math.abs(AVERAGE_RECORDS_COUNT));
    // 估算出 1s 内能够绘制的帧数；
    return (1000 / averageTime).toFixed(2);
  }

  // drawing function;
  function draw() {
    // render the first frame from the top-left of the canvas;
    context.drawImage(video, 0, 0);

    // get current video data;
    pixels = context.getImageData(0, 0, video.videoWidth, video.videoHeight);

    // record performance;
    const timeStart = performance.now();

    switch (GLOBAL_STATUS) {
      case 'JS':
        pixels.data.set(filterJS(pixels.data, clientX, clientY));
        var timeUsed = Math.round(1000 / (performance.now() - timeStart));
        // push new time record into vector;
        jsTimeRecords.push(timeUsed);
        // calculate and update display;
        fpsNumDisplayElement.innerHTML = calcFPS(jsTimeRecords);
        break;
      case 'WASM':
        pixels.data.set(filterWASM(pixels.data, clientX, clientY));
        var timeUsed = Math.round(1000 / (performance.now() - timeStart));
        wasmTimeRecords.push(timeUsed);
        fpsNumDisplayElement.innerHTML = calcFPS(wasmTimeRecords);
        break;
      default:
        fpsNumDisplayElement.innerHTML = 'NaN';
        return
    }

    // append image onto the canvas;
    context.putImageData(pixels, 0, 0);
    // continue;
    requestAnimationFrame(draw);
  }


  // the main process;
  var video = document.querySelector('.video');
  var canvas = document.querySelector('.canvas-scenery');

  // get a canvas context;
  var context = canvas.getContext('2d');

  function start() {
    console.log("start")
    if (GLOBAL_STATUS === "JS" || GLOBAL_STATUS === "WASM") {
      // set the size of current stage;
      canvas.setAttribute('height', video.videoHeight);
      canvas.setAttribute('width', video.videoWidth);

      // get the drawing size of the stage;
      clientX = canvas.clientWidth;
      clientY = canvas.clientHeight;

      // start drawing!
      draw(context);
    }
    console.log("stop")
  }

  // init canvas;
  video.addEventListener("loadeddata", function () {
    start()
  });
});

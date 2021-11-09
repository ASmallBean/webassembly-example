__ATPOSTRUN__.push(() => {
  console.log(Module)
  var int_ptr = Module._get_int_ptr();
  console. log ("int_ptr:" + int_value);
  var int_value = Module.HEAP32[int_ptr>> 2];
  console. log ("JS{int_value:" + int_value + "}");

  var double_ptr = Module._get_double_ptr();
  console. log ("double_ptr:" + double_ptr);

  var double_value = Module.HEAPF64[double_ptr>> 3];
  console. log ("JS{double_value:" + double_value + "}");

  Module.HEAP32[int_ptr >> 2]= 13;
  Module .HEAPF64[double_ptr >> 3]= 123456.789
  Module._print_data();
});

// 上述代码中，按照两个C函数各自的声明定义了两个对象js_add以及js_console_log_int，并将其合并到LibraryManager.library中——在JavaScript中，
// 方法（或者说函数）也是对象。提示LibraryManager.library可以简单地理解为JavaScript注入C环境的库，即3.2.1节中所说的“模块B”。虽然事实上它远比这要复杂，但这种简单的类比足以应对大部分常规应用。
mergeInto(LibraryManager.Library, {
  js_add: function (a, b) {
    console.log("js_add")
    return a + b
  },
  js_console_log_int: function (param) {
    console.log("js_console_log_int" + param)
  }
})

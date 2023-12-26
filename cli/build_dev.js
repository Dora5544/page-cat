const webpack = require('webpack');
const chokidar = require('chokidar');

const webpackConfig = require('../webpack.config.js'); // 替换为你的 webpack 配置文件路径

// 创建一个 webpack 编译器
const compiler = webpack(webpackConfig);

// 编译函数
function compile() {
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stats.toString({ colors: true }));

    // 在这里可以添加额外的任务，例如拷贝静态文件等
  });
}

// 初始编译
compile();

// 使用 chokidar 监听文件变化，一旦文件发生变化就重新编译
const watcher = chokidar.watch('src/**/*.*'); // 监听 src 文件夹下所有的 .js 文件，根据你的实际情况调整

watcher.on('change', (path) => {
  console.log(`File ${path} changed. Recompiling...`);
  compile();
});
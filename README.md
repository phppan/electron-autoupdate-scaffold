# 在Mac下生成 Windows 架构的支持自动更新的 Electron 应用脚手架

调整了一些版本的依赖，在mac 10.11.6下可以运行 xcode8.2.1

Electron 在Mac下可以编译生成 Win32 的安装包


## 使用

1. 下载应用

	```bash
	# 工作目录下，比如 d/workspace
	git clone https://github.com/phppan/electron-autoupdate-scaffold.git
	npm i
	```

2. 运行应用

	```bash
	cd electron-autoupdate-scaffold
	npm start
	```

3. 打包应用

	```bash
	# 在 electron-autoupdate-scaffold 目录下
	npm run build
	```

	执行后会在控制台输入打包进度的日志：
	
	```bash
	npm run build
	```

	第一次运行会比较慢，运行结束后会在当前目录下新增一个 dist 文件夹，dist 的目录结构如下：

	```bash
	|- dist
	  |- win-unpacked
	  |- hello.1.0.0.exe
	  |- hello.1.0.0.exe.blockmap
	  |- electron-builder-effective-config.yaml
	  |- latest.yml
	```

	win-unpacked 下是可执行文件。

4. 自动更新后台

	```bash
    这里我是直接把 生成的latest.yml和exe安装包扔到一台装有nginx的机器，访问目录为：windemo/v2
	```

	将之前打包出来的 dist 目录下的 4 个文件（除了 win-unpacked）拷贝到这边的 packages/win32 下（需要手动新建目录 packages/win32）。

5. 测试自动更新
	- 进入 electron-autoupdate-scaffold/dist/win-unpacked 找到可执行文件，双击运行，看到打开窗口的控制台中依次输出：

		```
		checking-for-update
		update-not-available
		```

	- 进入 electron-autoupdate-scaffold，打开 package.json，把版本号改小，重新打包后再次进入 dist/win-unpacked 目录，运行 exe，看到打开窗口的控制台中依次输出：

		```
		checking-for-update
		update-available
		```
		并且出现弹窗提示「现在更新？」。
        如果网速慢的话，这里会有等候，可以看到devtools里面有进度的打印

## 基于脚手架开发

该脚手架的自动更新实现基于 electron-builder，需要了解更多功能的请点[这里](https://github.com/electron-userland/electron-builder)。

从 github 下载后文件夹目录如下：

```bash
|- electron-autoupdate-scaffold
  |- main.js
  |- src
    |- index.html
  |- package.json
  |- package-lock.json
  |- README.md
  |- .gitignore
```

其中 main.js 为主进程文件，src 中为渲染进程文件。

## 支持

任何使用问题请戳[这里](https://github.com/phppan/electron-autoupdate-scaffold/issues)。

# sd-webui-anima-camera-tool
Anima Camera Tool (独立版 / WebUI 插件版)


项目简介：
本项目是基于 xunying7860/Comfyui-Anima_camera_angle 插件理念开发的独立网页/WebUI 提示词生成工具。
它的核心功能是通过直观的 3D 空间操作，生成精确权重的 Stable Diffusion 相机视角提示词。界面完全脱离后端模型束缚，专注于“相机参数映射”与“标签输出”。


项目状态：
本项目已完成且不再维护。
作者已停止对项目的更新、维护和 Bug 修复。
本项目完全开源，并接受任何人克隆、Fork、阅读源码或自由更改代码用于任何用途。

功能特性：

3D 交互式视角控制
镜头提示词智能生成
根据相机的位置自动生成对应的 (tag:权重) 格式。

支持将所有的提示词标签剥离到同目录下的 tags.txt 文件中。
提供自动读取、浏览器缓存，以及一键保存到本地文件的功能。

WebUI 悬浮窗显示
专为 WebUI - Forge Neo / Forge / A1111 打造，采用 iframe srcdoc 隔离加载技术，
彻底规避跨域报错、404 以及与其他大型插件（如 prompt-all-in-one）的 DOM 冲突。

安装与运行 (WebUI 插件版)：
文件结构要求：
extensions/sd-webui-anima-camera-tool/
├── scripts/
│ └── main.py (后台接口)
├── javascript/
│ └── injector.js (悬浮窗逻辑)
└── html/
├── camera-tool.html (核心 UI)
├── tags.txt (标签配置)
└── img.png (可选，默认纸片人)

安装后重启 WebUI，在页面右下角会生成一个橙色悬浮按钮，点击即可弹窗使用。

tags.txt 格式示例：
front: from front
back: from behind
left: facing right
right: facing left
high: high angle
eye: eye-level
low: low angle
ecu: extreme close-up
cu: close-up
medium: medium shot
cowboy: cowboy shot
full: full body
wide: wide shot
dutch: dutch angle

另：项目文件夹/html/camera-tool.html 能独立打开，若 WebUI 报错，可以只保存这个核心文件，拷贝到别的地方，并用浏览器打开运行。

已知问题 (Known Issues)：
Anima 模型 BUG：Anima 模型对 "right"（右侧）方向的参数映射存在 Bug，这是 Anima 模型本身的问题。
光辉系 模型兼容性：光辉系系模型不受上述 Bug 影响。但使用光辉系模型时，提示词权重的具体数值可能需要您自行测试微调，整体影响不大。

感谢开源社区的灵感与支持。

开发：Deepseek/A.S.(许愿式编程)

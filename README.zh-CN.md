# pi-web2

[English](./README.md)

[Pi 编程智能体](https://github.com/badlogic/pi-mono) 的本地网页界面。它会读取本机的 Pi 会话文件，在浏览器里提供会话管理、实时对话、模型配置、技能管理和项目文件预览。

## 快速开始

**这个包在 NPM Registry 上不可用，请用 Git 拉取项目运行。**

```bash
git clone https://github.com/wtonychen/pi-web2
cd pi-web2
npm install
npm run start
```

**也可从 [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) 上安装（如果你不嫌麻烦的话）**

启动后打开 `http://localhost:30141`。命令行版本会在服务就绪后尝试自动打开浏览器。

**可选参数：**

```bash
pi-web2 --port 8080              # 自定义端口
pi-web2 --hostname 127.0.0.1     # 仅本机访问
pi-web2 -p 8080 -H 127.0.0.1     # 组合使用

PORT=8080 pi-web2                # 也支持环境变量
```

## 功能介绍

- **把历史工作接回来**：打开网页就能按项目找到以前的 Pi 对话，不必在终端里翻文件或记住会话路径。
- **放心试不同方向**：可以从某条历史消息重新开始，也可以复制出一条独立的新路线，探索方案时不怕弄乱原来的对话。
- **边聊边看项目文件**：左侧浏览项目文件，右侧打开源码、文档、图片、音频和 PDF；文件变化会自动刷新，适合边让智能体改边检查结果。
- **随时掌握会话状态**：在顶部就能看到上下文占用、花费、压缩结果和系统提示，长会话不再像黑箱。
- **少离开当前界面**：模型、登录/API 密钥、模型测试和技能开关都能在网页里处理，配置智能体时不用在多个工具之间来回切换。

## 相比源项目的改进

基于 [@agegr/pi-web](https://github.com/agegr/pi-web) 的分支，专注于一些细节优化与移动端体验优化（主要是自己用）。

### 更好的移动设备视图
为小屏幕设备优化的 Web 体验，手机、平板上也能获得良好的 Pi 编程智能体体验。

### 鼠标中键快速操作
在文件列表中使用鼠标中键可快速插入项目文件，预览时可通过鼠标中键快速关闭打开的预览标签页。

### 智能体给用户的快捷交互链接
智能体可以通过发送 `#view`、`#fill`、`#jumpto`、`#speak`、`#javascript` 的链接来让你与智能体更便捷地交互。只需安装一个 SKILL，便可让 Agent 自动生成：

- **`#view`** — 快速在页面上预览文件
- **`#fill`** — 快速填充文本框
- **`#jumpto`** — 快速进行私有 Protocol URI 跳转
- **`#speak`** — 使用本地 TTS 进行文本朗读
- **`#javascript`** — 快速在浏览器中运行 JavaScript 脚本，并将结果输出到文本框

### 其他细节优化

- 文件列表里的项目文件下载
- 本地语音听写输入支持
- 文件预览大小限制放宽
- 内置纯连字符号字体（不含文字，`Fira Code` 连字符号子集，可通过环境变量开关）
- 小地图滚动条的对话预览优化（长对话不再挤在一起）
- 触屏设备专属换行按钮
- 一键聊天置底和锁定置底（非底部返回底部，处在底部则锁定置底）
- 文本清空按钮
- 快速聊天内容引用
- 聊天本地 TTS 语音
- 预览工具栏支持快速下载或新窗口预览文件
- 少量性能优化与交互细节打磨

### 环境变量

| 变量 | 说明                  |
|------|---------------------|
| `ALLOW_FULL_FS_ACCESS=true` | 允许访问完整文件系统（默认`false`） |
| `ENABLE_SYM_LIGATURE_FONT=true` | 启用连字符号字体（默认`false`） |



## 注意事项

- **数据目录**：默认读取 `~/.pi/agent/sessions` 下的会话文件。可通过环境变量 `PI_CODING_AGENT_DIR` 指定其他 Pi 目录。
- **会话文件**：路径形如 `~/.pi/agent/sessions/<编码后的工作目录>/<时间戳>_<uuid>.jsonl`。
- **模型配置**：Models 面板读写 Pi 目录下的 `models.json`，模型列表和默认模型由 Pi 的配置解析得到。
- **文件访问**：文件浏览和预览面向当前选择的项目目录，以及会话中已出现过的工作目录。
- **Fork 与会话内分支不同**：Fork 会创建新的 `.jsonl` 文件；“Edit” 是同一会话文件里的分支。

## 开发

```bash
npm install
npm run dev
```

本地开发服务地址为 `http://localhost:30141`。

常用检查：

```bash
node_modules/.bin/tsc --noEmit
npm run lint
```

开发时不要运行 `next build` / `npm run build`，它会写入 `.next/`，容易影响正在运行的开发服务。发布流程再执行构建。

## 项目结构

```
app/
  api/
    agent/          # 创建/驱动 AgentSession，提供 SSE 事件流
    auth/           # OAuth 和 API 密钥管理
    cwd/validate/   # 自定义工作目录校验
    default-cwd/    # 获取 Pi 默认工作目录
    files/          # 文件列表、读取、预览、文件变更监视
    home/           # 当前用户主目录
    models/         # 可用模型、默认模型、思考级别
    models-config/  # 读写 models.json、测试模型
    sessions/       # 会话读取、重命名、删除、上下文、HTML 导出
    skills/         # SKILL 列表、搜索、安装、启停
components/
  AppShell.tsx        # 主布局、URL 状态、顶部面板、文件标签
  SessionSidebar.tsx  # 项目选择、会话树、文件树
  ChatWindow.tsx      # 消息区、SSE、拖拽图片、小地图滚动条
  ChatInput.tsx       # 输入栏、模型/工具/思考/压缩/斜杠命令操作
  MessageView.tsx     # 消息、思考、工具调用/结果渲染
  ModelsConfig.tsx    # 模型和认证配置面板
  SkillsConfig.tsx    # 技能管理面板
  FileExplorer.tsx    # 文件树
  FileViewer.tsx      # 源码、Diff、图片、音频、PDF、DOCX 预览
lib/
  rpc-manager.ts      # AgentSessionWrapper 生命周期和全局 registry
  session-reader.ts   # 解析 .jsonl 会话文件和分支上下文
  normalize.ts        # 规范化 toolCall 字段名
  file-access.ts      # 文件读取安全边界
  file-paths.ts       # 文件路径编码/相对路径工具
  markdown.ts         # Markdown/Mermaid/KaTeX 插件配置
  pi-types.ts         # Pi 相关类型
hooks/
  useAgentSession.ts  # 会话加载、发送命令、SSE 状态机
  useAudio.ts         # 完成提示音
  useDragDrop.ts      # 图片拖拽
  useTheme.ts         # 主题切换
bin/
  pi-web.js           # NPM CLI 入口
```

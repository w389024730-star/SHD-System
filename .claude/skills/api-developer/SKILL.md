---
name: api-developer
description: 为广告数据报告分析平台实现或修改 API / Netlify Functions，遵守 Firebase + Netlify 架构、权限边界、环境变量与前后端分层
disable-model-invocation: true
---

# API Developer — 广告数据报告分析平台

请实现或修改以下 API / 后端能力：

$ARGUMENTS

本项目当前阶段没有独立 Python 后端。凡是“后端接口”需求，默认优先判断是否应使用：

1. Firebase SDK 客户端直接读写
2. Netlify Functions（仅在需要保护密钥或做服务端中转时使用）

不要擅自引入 Express、Nest、FastAPI、Server 容器化部署等新后端架构。

## 项目固定上下文

- 前端部署在 Netlify
- 受保护的服务端逻辑放在 /netlify/functions
- AI API Key 只能放在 Netlify 环境变量中
- 普通业务数据默认通过 Firebase SDK + RTDB 读写
- 用户认证来自 Firebase Authentication
- 权限核心来自 RTDB 的 users/{uid}.role 与 users/{uid}.brands
- 普通用户只读，admin 才能写入管理数据
- 当前阶段不提前开发未来 Render / Python 抓取能力

## API 设计原则

- 先判断该需求是否真的需要 Function
- 如果只是读取 RTDB 且受 Rules 保护，优先走前端 + Firebase SDK
- 如果涉及密钥、AI 中转、敏感服务端逻辑，使用 Netlify Function
- 输入必须校验
- 返回结构必须统一
- 错误信息必须明确，但不能暴露敏感信息
- service 层与页面层分离
- 前端调用封装进 /src/services，不在页面里直接堆 fetch

## Netlify Function 约束

默认文件路径：

- /netlify/functions/<name>.js

默认考虑：

- event.body 解析
- method 校验
- 必要参数校验
- 错误码与错误信息
- 环境变量读取
- 超时与第三方请求失败处理
- CORS（如确实需要）
- 不在响应中返回敏感配置

## 若 API 涉及品牌数据或用户权限，必须评估

- 这个操作是否只允许 admin
- 是否需要读取 users/{uid} 获取 role / brands
- 是否应该完全依赖 RTDB Rules，而不是前端假判断
- 是否需要传入 brandId / platform / 时间范围
- 是否会越权访问其他品牌数据

## 若 API 涉及 AI 对话

必须遵守：

- 前端只调用 Netlify Function
- API Key 不可出现在 VITE_ 前缀环境变量里
- system prompt 与品牌数据上下文在 Function 内部组装
- 若要流式返回，说明采用的 streaming 实现方式
- 错误时返回可前端展示的友好消息

## 输出要求

如果用户要你直接开发，请按顺序：

1. 判断是否真的需要 Netlify Function
2. 说明将修改哪些文件
3. 先写 Function / service / 调用层代码
4. 最后总结请求参数、返回结构、环境变量和验证方式

如果用户要方案，请按以下格式：

### 1. 是否需要 API / Function
### 2. 接口目标
### 3. 请求与响应契约
### 4. 权限与安全考虑
### 5. 文件改动建议
### 6. 实施步骤
### 7. 验证方式

## 推荐文件落点

- /netlify/functions/*.js
- /src/services/*.js
- /src/hooks/*.js（如需封装调用状态）
- /src/pages/*.jsx（仅接 UI，不堆业务细节）

## 禁止事项

- 不要擅自新增独立 Node 后端或 Python 后端
- 不要把密钥写进前端
- 不要把所有逻辑堆进页面组件
- 不要跳过参数校验
- 不要用未定义的新权限模型
- 不要提前实现规格外功能
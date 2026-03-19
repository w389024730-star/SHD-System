---
name: feature-planner
description: 为广告数据报告分析平台的新功能做分阶段规划、影响分析、文件拆分、权限评估和验收标准，先规划再开发
disable-model-invocation: true
---

# Feature Planner — 广告数据报告分析平台

请为以下需求做实现规划：

$ARGUMENTS

你的职责是：先基于当前项目规格做规划，再给出最小可行实施路径，不能跳过分析直接大段写代码。

## 项目固定上下文

- 前端固定：React + Vite
- UI 固定：shadcn/ui + Tailwind CSS
- 图表固定：Recharts
- 认证固定：Firebase Authentication（Google OAuth）
- 数据库固定：Firebase Realtime Database（RTDB）
- 当前阶段不引入 Python 后端
- AI Key 不允许暴露前端，只能通过 Netlify Functions 中转
- 状态管理仅使用 React hooks + Firebase SDK
- 页面、组件、services、hooks 必须分离
- 不允许一次性生成整个项目
- 不允许实现规格文档未定义的新功能
- 必须遵守“开发阶段划分”，不提前实现后续阶段内容

## 目录约定

默认目录结构：

- /src/pages
- /src/components
- /src/services
- /src/routes
- /src/hooks
- /src/lib
- /netlify/functions

规划时优先沿用下列已定义文件模式：

- pages：页面级组件
- components：复用 UI 组件
- services：Firebase / 数据读取 / 写入 / 业务服务
- hooks：通用状态逻辑
- routes：路由配置
- lib：工具函数

## 工作原则

- 先判断该需求属于哪个开发阶段
- 如果需求跨多个阶段，必须拆成“当前阶段可做”和“后续阶段再做”
- 优先最小闭环，不要大而全
- 优先复用现有页面结构、服务层和 hooks
- 先分析页面、路由、权限、数据路径，再决定实现方式
- 不要引入新框架、新状态库、新后端

## 必做分析

1. 需求归类
   - 属于第一阶段、第二阶段，还是明确属于“暂不实现”
   - 属于登录、权限、品牌页、仪表盘、导入、AI、资料库、设置中的哪一类

2. 现状判断
   - 该功能可能依赖哪些现有页面、组件、service、hook、route
   - 是否依赖 Firebase Auth、RTDB、Netlify Functions、Recharts、SheetJS/PapaParse

3. 影响范围
   - 页面
   - 路由
   - 权限控制
   - Firebase 数据结构
   - Security Rules
   - 导入流程
   - 环境变量
   - 部署配置（如 netlify.toml）

4. 实施方案
   - 前端页面层怎么拆
   - services 如何组织
   - hooks 是否需要新增
   - 是否需要新增 Netlify Function
   - 是否涉及 RTDB 读写路径

5. 验收标准
   - 登录态
   - 权限正确性
   - 页面可访问性
   - 数据读写闭环
   - 错误态 / 空态 / 加载态

## 输出格式

请严格按下面结构输出：

### 1. 需求归类
### 2. 当前阶段是否应实现
### 3. 现状与依赖
### 4. 影响范围
### 5. 实施方案
### 6. 文件变更清单
### 7. 风险与注意事项
### 8. 验收标准
### 9. 推荐实施顺序

## 禁止事项

- 不要直接把后续阶段功能塞进当前阶段
- 不要建议引入 Redux、Zustand、MobX、Python 后端
- 不要绕开 Firebase Auth / RTDB / Netlify Functions 既定架构
- 不要输出“整个项目一次性完成”的方案
- 不要脱离既定目录结构瞎起新架构
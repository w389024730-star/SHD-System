---
name: frontend-page-builder
description: 为广告数据报告分析平台开发页面或模块，遵守 React + Vite、shadcn/ui、Tailwind、Recharts、Firebase SDK 与既定目录结构
disable-model-invocation: true
---

# Frontend Page Builder — 广告数据报告分析平台

请开发以下页面 / 模块 / 组件：

$ARGUMENTS

你的目标是做出“结构清晰、状态完整、符合现有规范、便于继续迭代”的页面，而不是只把 UI 拼出来。

## 项目固定上下文

- React + Vite
- shadcn/ui + Tailwind CSS
- Recharts
- Firebase Authentication + RTDB
- React hooks + Firebase SDK
- 不使用 Redux / Zustand / MobX
- 页面、组件、service、hook 必须分层
- 只实现当前阶段允许的内容

## 页面结构原则

优先按以下目录组织：

- /src/pages：页面容器
- /src/components：通用 UI 组件
- /src/services：数据服务
- /src/hooks：状态逻辑
- /src/routes：路由
- /src/lib：工具函数

## UI 风格约束

- 整体风格改为偏 Claude 官网风格：温暖、中性、简洁、高级
- 主背景使用暖白 / 米白色，不使用纯白高亮背景
- 卡片使用浅米色或极浅暖灰底，配合细边框与极轻阴影
- 主文字使用深灰黑色，弱化纯黑带来的生硬感
- 主强调色不再使用高饱和蓝色，改为低饱和暖橙 / 棕橙 / 沙色系
- 页面避免大面积高饱和颜色，整体保持克制、柔和、专业
- 图表颜色也应降低饱和度，避免传统广告后台那种很“亮”的科技蓝风格
- 指标卡建议使用更柔和的区分方式，而不是强烈撞色：
  - SALES：暖棕 / 焦糖色系
  - ROAS：柔和绿色系
  - ORDERS：灰紫 / 烟紫色系
  - VISITOR：沙色 / 浅棕色系
  - SPEND：偏橙棕色系
- 数值强调仍使用 `text-2xl font-bold`，但颜色以深灰为主，不要全部高亮着色
- 圆角适中偏大，整体更柔和
- 阴影要非常轻，优先依靠边框、留白和层级区分模块
- 组件优先使用 shadcn/ui：Button、Card、Select、Tabs、Dialog、Table、Badge 等
- 按钮风格以克制为主：
  - 主按钮使用暖深色底 + 浅色文字
  - 次按钮使用浅底 + 细边框
  - 避免高饱和纯蓝按钮
- 表格、筛选器、Tab、Badge 都应保持低饱和中性色体系，风格统一
- 采用 Claude 官网风格的浅暖色主题，而不是传统蓝色 SaaS 后台风格
- 背景以暖白、米白、浅灰米色为主
- 卡片以浅色底 + 细边框 + 极轻阴影表达层级
- 主色采用低饱和暖橙、棕橙、沙色体系，避免高饱和蓝色主导视觉

## 开发流程

1. 先判断所属阶段
   - 第一阶段：登录、路由守卫、品牌页、用户权限管理
   - 第二阶段：基础导入页、基础仪表盘
   - 后续阶段：AI 对话、产品资料库、周月报导出、抓取等，不提前实现

2. 先识别页面类型
   - 登录页
   - 品牌选择页
   - 仪表盘
   - 设置页
   - Admin 用户权限页
   - Admin 导入页

3. 再设计页面结构
   - 页面容器负责数据获取
   - 子组件负责展示
   - service 负责 Firebase / 数据逻辑
   - hook 负责复用状态逻辑

4. 必须补全页面状态
   - loading
   - empty
   - error
   - success

5. 必须考虑路由与权限
   - 未登录跳转 /
   - 非 admin 禁止访问 /admin/*
   - 非授权品牌禁止访问 /dashboard/:brandId

## 仪表盘页面特别要求

如果需求是 Dashboard，默认遵守：

- 顶栏：品牌 + 时间筛选 + 同步状态
- 指标卡片：SALES / SPEND / ROAS / ORDERS / AVG PRICE / VISITOR
- 图表：
  - 折线图：趋势
  - 柱状图：周期对比
- 第二阶段仅做基础版，不提前做高级分析和复杂多维筛选

## 输出要求

如果直接开发：

1. 先说明会改哪些文件
2. 再写代码
3. 最后说明页面结构、数据流和验证方式

如果只出方案：

### 1. 页面目标
### 2. 所属阶段
### 3. 页面结构
### 4. 数据来源与状态设计
### 5. 文件拆分建议
### 6. 交互与权限说明
### 7. 验收点

## 禁止事项

- 不要把 UI、数据、权限、路由逻辑塞进一个大文件
- 不要引入新的 UI 库或图表库
- 不要跳过 loading / empty / error 状态
- 不要超前实现未到阶段的功能
- 不要违背现有目录规范
---
name: bug-triage
description: 排查广告数据报告分析平台中的登录、权限、路由、RTDB、Netlify Functions、导入和仪表盘异常，先定位证据链再修复
disable-model-invocation: true
---

# Bug Triage — 广告数据报告分析平台

请排查以下问题：

$ARGUMENTS

你的目标不是盲改，而是建立“现象 → 复现 → 范围 → 根因 → 修复 → 验证”的证据链。

## 项目固定上下文

- 前端：React + Vite
- Auth：Firebase Authentication（Google OAuth）
- 数据库：Firebase RTDB
- AI 中转：Netlify Functions
- 导入：浏览器端 SheetJS / PapaParse
- 图表：Recharts
- 状态：React hooks + Firebase SDK
- 权限核心：admin / user + brands 授权
- 普通用户默认只读，写入仅 admin
- /admin/* 只有 admin 可访问
- /dashboard/:brandId 需要品牌权限或 admin

## 优先排查域

遇到问题时优先判断属于以下哪类：

1. Firebase 配置 / 环境变量错误
2. Google 登录状态异常
3. users/{uid} 数据缺失或角色字段异常
4. 路由守卫逻辑异常
5. 品牌权限 brands 映射异常
6. RTDB Security Rules 导致读写失败
7. RTDB 路径写错 / 读错
8. Netlify Function 环境变量或请求格式错误
9. 导入解析字段错误 / 合并逻辑错误
10. Recharts 数据格式错误导致图表不显示
11. 页面、组件、services、hooks 职责混乱导致状态异常

## 工作流程

1. 复述问题
   - 明确预期结果
   - 明确实际结果
   - 明确发生页面 / 路由 / 操作步骤 / 报错信息

2. 复现路径
   - 给出最小复现步骤
   - 如果无法复现，列出当前能确认的线索

3. 缩小范围
   - 从路由、hook、service、Firebase 数据、Rules、Netlify Function 逐层缩小
   - 找出真正的数据入口和状态来源
   - 不要跳过 Auth 和权限判断链路

4. 根因候选
   - 按概率排序给出 1~3 个根因
   - 每个根因必须附上代码证据或行为证据
   - 明确哪些是已证实，哪些是待验证

5. 修复建议
   - 优先给最小修复方案
   - 如有必要再给“更稳健但改动更大”的方案
   - 说明会影响哪些文件

6. 验证步骤
   - 正常路径验证
   - 异常路径验证
   - 权限边界验证
   - 部署后验证（如 Netlify / Firebase）

## 输出格式

### 1. 问题复述
### 2. 复现路径
### 3. 排查范围
### 4. 最可能的根因
### 5. 修复建议
### 6. 需要补的日志或断点
### 7. 验证步骤
### 8. 回归风险

## 常见高风险点

重点留意：

- 登录后 currentUser 有值，但 users/{uid} 未初始化
- role 缺失导致 admin 判断失败
- brands 为空导致被错误重定向
- targetRoute brandId 解析错误
- RTDB rules 允许 read 但实际路径不匹配
- admin/import 页面前端可进，但写入因 rules 被拒
- Netlify Functions 中意外在前端暴露 API Key
- Google Ads 与 UTM 合并时 campaign 键不一致
- Recharts 传入字符串数值未转 number

## 禁止事项

- 不要一上来就“重写”
- 不要只说“可能是权限问题”这种空话
- 不要绕过 Security Rules 解决问题
- 不要为了修一个 bug 顺带把无关模块改一遍
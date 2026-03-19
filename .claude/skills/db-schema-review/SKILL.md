---
name: db-schema-review
description: 审查广告数据报告分析平台的 Firebase RTDB 数据结构、访问路径、权限规则、查询模式和后续扩展风险
disable-model-invocation: true
---

# DB Schema Review — 广告数据报告分析平台（Firebase RTDB）

请审查以下数据结构 / 数据路径 / 规则设计：

$ARGUMENTS

注意：本项目数据库不是关系型数据库，而是 Firebase Realtime Database。你的审查必须以 RTDB 的读写路径、权限规则、查询方式和扁平化结构为中心，不能套用纯 SQL 视角机械评判。

## 项目固定上下文

核心数据节点包括：

- users/{uid}
- brands/{brandId}
- ad_data/{brandId}/{platform}/{year}_{month}/{adId}

权限模型包括：

- users：本人可读，admin 可读写全部
- brands：登录用户可读，admin 可写
- ad_data：admin 全读写；普通用户仅可读自己授权品牌

## 审查原则

- 先从真实访问路径出发审查结构是否合理
- 先看前端怎么读，再看结构怎么存
- RTDB 允许适度冗余和按读场景组织
- 不要拿“必须严格范式化”去否定合理的 RTDB 结构
- 同时检查 Security Rules 与 schema 是否一致

## 审查重点

1. 路径设计是否合理
   - users、brands、ad_data 是否清晰分层
   - brandId / platform / year_month 分层是否利于读取
   - 是否适合当前按品牌、平台、月份读取数据的方式

2. 权限兼容性
   - 当前路径是否便于 Security Rules 表达
   - 是否存在越权风险
   - admin / user / brands 授权模型是否能自然落到路径上

3. 查询模式适配
   - 仪表盘按 brandId / platform / 日期范围读数据是否方便
   - 导入时按 month 分桶写入是否方便
   - 是否会因为路径设计导致跨月聚合困难
   - 是否需要额外汇总节点或缓存节点（只在明确必要时建议）

4. 字段合理性
   - campaign / ad_type / sku / spend / impressions / clicks / conversions / revenue / orders / visitors / date 是否足够支撑当前阶段
   - 是否缺少 createdAt / updatedAt / importBatchId / sourceFile 之类辅助字段
   - 数值字段类型与日期字段格式是否统一

5. 性能与索引
   - 当前读法是否需要 .indexOn
   - 若使用 orderByChild 查询，应指出建议索引字段
   - 是否存在单节点过大风险
   - 月度分桶是否足够避免数据过重

6. 演进性
   - 第二阶段导入与仪表盘是否能直接用
   - 后续 AI 对话、产品资料库、周月报是否可能需要额外聚合层
   - 若后续要接社媒抓取，当前 ad_data 结构是否应保持独立，不要过早耦合

## 输出格式

### 1. 当前 RTDB 结构概览
### 2. 设计优点
### 3. 主要问题
### 4. 权限与 Rules 适配性
### 5. 查询与性能建议
### 6. 是否需要 indexOn / 汇总节点 / 辅助字段
### 7. 推荐调整方案
### 8. 迁移风险与兼容性说明

## 审查结论要求

给出的建议必须明确区分：

- 现在就要改
- 现在可不改，但后面会痛
- 当前阶段不用动，后续再说

## 禁止事项

- 不要按 SQL 教条去否定 RTDB 结构
- 不要建议直接换数据库
- 不要脱离真实查询路径谈 schema
- 不要忽略 Security Rules 的可表达性
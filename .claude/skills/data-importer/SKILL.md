---
name: data-importer
description: 为广告数据报告分析平台设计或实现管理员报表导入流程，负责浏览器端解析、字段映射、标签配置、Google+UTM 合并、RTDB 写入与错误反馈
disable-model-invocation: true
---

# Data Importer — 广告数据报告分析平台

请为以下导入需求提供方案或实现：

$ARGUMENTS

本项目的导入流程固定为：管理员在前端 /admin/import 页面中完成上传、解析、预览、标签配置、确认导入，然后浏览器端直接写入 Firebase RTDB。

## 项目固定上下文

- 导入页路由：/admin/import
- 仅 admin 可访问
- 数据来源：Facebook Ads / Google Ads / TikTok Ads
- 解析方式：浏览器端 SheetJS / PapaParse
- 数据库：Firebase RTDB
- 当前阶段不引入 Python 后端
- 第二阶段只做“基础可用版”，不提前做复杂高级校验

## 导入流程固定步骤

1. 选择品牌
2. 选择平台（FB / GG / TK）
3. 选择数据类型 / 文件
4. 解析文件并预览前 5 行
5. 配置批量标签（如 ad_type、sku）
6. 如果平台为 GG，可额外上传 UTM 报告并按 campaign 合并
7. 确认导入
8. 写入 RTDB
9. 显示成功条数 / 失败条数 / 错误信息

## 标签体系

以下字段应优先支持：

- platform：FB / GG / TK
- ad_type：KOL速推 / CPAS广告 / 社媒速推 / 线下速推
- sku：产品 SKU
- product_stage：新品 / 主推 / 清仓（可选）
- campaign_period：大促 / 日常 / 节假日（可选）
- ad_goal：品牌 / 效果 / 再营销（可选）

## RTDB 目标结构

导入数据默认写入：

ad_data/{brandId}/{platform}/{year}_{month}/{adId}

每条记录至少围绕以下字段组织：

- campaign
- ad_type
- sku
- spend
- impressions
- clicks
- conversions
- revenue
- orders
- visitors
- date

## Google + UTM 合并规则

若平台为 Google Ads 且有 UTM 报告：

- 优先按 campaign / utm_campaign 做映射
- 合并 revenue / conversions / sessions 等站内表现数据
- 自动计算 ROAS / CPA / CVR（如果当前导入流程需要）
- 映射失败的行要明确标记，而不是静默跳过

## 工作原则

- 先识别表头和字段含义
- 先输出字段映射，再写导入逻辑
- 所有数字字段必须标准化为 number
- 日期必须标准化
- 对空值、非法值、重复值要有策略
- 导入结果要可追踪、可解释
- 不要默认高级功能，先保证最小闭环

## 必做分析

1. 输入识别
   - 文件类型
   - 表头
   - 是否多 sheet
   - 是否存在说明行/空行/格式行

2. 字段映射
   - 源字段 → 目标字段
   - 必填 / 可选 / 计算字段
   - 站内数据与广告平台数据来源区分

3. 清洗规则
   - 去空格
   - 数值转换
   - 日期格式统一
   - 空值处理
   - campaign 键统一规则

4. 写入策略
   - adId 如何生成或选取
   - 是追加、覆盖还是 upsert
   - month key 如何计算
   - 是否保留导入批次信息

5. 错误反馈
   - 解析失败
   - 字段缺失
   - campaign 合并失败
   - 写入失败
   - 成功/失败统计

## 输出格式

如果出方案：

### 1. 导入目标
### 2. 所属阶段
### 3. 输入识别
### 4. 字段映射表
### 5. 清洗与合并规则
### 6. RTDB 写入方案
### 7. 错误处理机制
### 8. 验证与对账方式

如果直接开发：

1. 先说明修改哪些文件
2. 先给字段映射与清洗规则
3. 再写解析 / 预览 / 合并 / 写入代码
4. 最后给验证步骤

## 禁止事项

- 不要把导入逻辑放到 Python 后端
- 不要跳过预览步骤
- 不要直接把原始表格裸写进 RTDB
- 不要静默忽略异常行
- 不要默认实现规格外的高级校验系统
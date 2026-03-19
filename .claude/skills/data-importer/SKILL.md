# Data Importer

你是数据导入专家，帮助实现广告报表导入功能。

## 支持格式

- CSV
- XLSX (Excel)

## 数据源

| 平台 | 代码 | 说明 |
|------|------|------|
| Facebook Ads | FB | Facebook 广告数据 |
| Google Ads | GG | Google 广告 + UTM 合并 |
| TikTok Ads | TK | TikTok 广告数据 |

## 导入流程

1. 管理员选择：品牌 + 平台 + 数据类型
2. 上传文件（浏览器端 SheetJS 解析）
3. 预览前 5 行
4. 配置批量标签（ad_type, sku 等）
5. 确认导入 → 写入 Firebase RTDB

## 标签字段

| 字段 | 必填 | 枚举值 |
|------|------|--------|
| platform | ✅ | FB / GG / TK |
| ad_type | ✅ | KOL速推 / CPAS广告 / 社媒速推 / 线下速推 |
| sku | ✅ | 产品 SKU 编号 |

## 使用方式

用户输入: `/data-importer 导入需求描述`
# Frontend Page Builder

你是前端页面构建专家，基于规格文档创建 React 页面。

## 技术栈

- React + Vite
- shadcn/ui + Tailwind CSS
- Recharts (图表)
- React Router

## 目录结构

```
/src
  /pages        # 页面组件
  /components   # UI 组件
  /services     # 业务逻辑
  /hooks        # 状态管理
  /routes       # 路由配置
```

## 开发约束

1. 页面、组件、服务逻辑必须分离
2. 不使用 Redux/Zustand 等复杂状态管理
3. 使用 React hooks + Firebase SDK 管理状态
4. 遵循 UI 规范（参考规格文档第4节）

## 页面清单

| 页面 | 路由 | 说明 |
|------|------|------|
| LoginPage | `/` | Google OAuth 登录 |
| BrandsPage | `/brands` | 品牌选择 |
| DashboardPage | `/dashboard/:brandId` | 数据仪表盘 |
| SettingsPage | `/settings` | 设置 |
| AdminUsersPage | `/admin/users` | 用户权限管理 |

## 使用方式

用户输入: `/frontend-page-builder 页面名称`
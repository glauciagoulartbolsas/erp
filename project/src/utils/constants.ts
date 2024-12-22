// Menu items configuration
export const MENU_ITEMS = [
  { 
    path: '/dashboard/sales',
    label: 'Vendas',
    icon: 'BarChart3',
    subItems: [
      {
        path: '/dashboard/sales/orders',
        label: 'Lista de Pedidos'
      },
      {
        path: '/dashboard/sales/customers',
        label: 'Clientes'
      },
      {
        path: '/dashboard/sales/payments',
        label: 'Confirmação de Pagamento'
      },
      {
        path: '/dashboard/sales/reports',
        label: 'Relatórios'
      }
    ]
  },
  {
    path: '/dashboard/products',
    label: 'Produtos',
    icon: 'Package',
    subItems: [
      {
        path: '/dashboard/products/list',
        label: 'Lista de produtos'
      },
      {
        path: '/dashboard/products/kits',
        label: 'Kit de produtos'
      },
      {
        path: '/dashboard/products/categories',
        label: 'Categorias'
      },
      {
        path: '/dashboard/products/brands',
        label: 'Marcas'
      },
      {
        path: '/dashboard/products/characteristics',
        label: 'Características'
      },
      {
        path: '/dashboard/products/batch-update',
        label: 'Atualização em lote'
      },
      {
        path: '/dashboard/products/reports',
        label: 'Relatórios'
      }
    ]
  },
  {
    path: '/dashboard/finances',
    label: 'Finanças',
    icon: 'DollarSign'
  },
  {
    path: '/dashboard/shipping',
    label: 'Expedição',
    icon: 'Truck'
  }
] as const;
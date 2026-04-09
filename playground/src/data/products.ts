// Mock product data for the e-commerce playground

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  sales: number;
  shop: string;
  badge?: string;
  tags: string[];
  rating: number;
}

// Generate placeholder image URLs using picsum.photos
function getProductImage(id: number, width = 400, height = 400): string {
  return `https://picsum.photos/seed/product${id}/${width}/${height}`;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Apple iPhone 15 Pro Max 256GB 原色钛金属 5G手机',
    price: 9999,
    originalPrice: 13999,
    image: getProductImage(1),
    sales: 52800,
    shop: 'Apple 官方旗舰店',
    badge: '自营',
    tags: ['新品', '24期免息'],
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Sony WH-1000XM5 无线降噪头戴式耳机 黑色',
    price: 2299,
    originalPrice: 2999,
    image: getProductImage(2),
    sales: 18600,
    shop: 'Sony 官方旗舰店',
    badge: '自营',
    tags: ['热卖', '满减'],
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Nike Air Force 1 07 男子运动鞋 白色经典款',
    price: 599,
    originalPrice: 899,
    image: getProductImage(3),
    sales: 96300,
    shop: 'Nike 官方旗舰店',
    tags: ['爆款'],
    rating: 4.7,
  },
  {
    id: 4,
    title: '戴森 Dyson V15 Detect 无绳吸尘器 智能激光检测',
    price: 4490,
    originalPrice: 5999,
    image: getProductImage(4),
    sales: 12400,
    shop: '戴森官方旗舰店',
    badge: '自营',
    tags: ['限时特惠'],
    rating: 4.9,
  },
  {
    id: 5,
    title: 'MacBook Pro 14英寸 M3 Pro芯片 18GB 512GB 深空黑',
    price: 14999,
    originalPrice: 17999,
    image: getProductImage(5),
    sales: 8900,
    shop: 'Apple 官方旗舰店',
    badge: '自营',
    tags: ['新品', '教育优惠'],
    rating: 4.9,
  },
  {
    id: 6,
    title: '海蓝之谜 精华面霜 60ml 修护保湿滋润',
    price: 2680,
    originalPrice: 3150,
    image: getProductImage(6),
    sales: 34200,
    shop: 'LA MER 官方旗舰店',
    tags: ['美妆节', '赠小样'],
    rating: 4.8,
  },
  {
    id: 7,
    title: 'Samsung Galaxy S24 Ultra 12GB+256GB 钛灰色',
    price: 8999,
    originalPrice: 11999,
    image: getProductImage(7),
    sales: 28700,
    shop: 'Samsung 官方旗舰店',
    badge: '自营',
    tags: ['AI手机', '以旧换新'],
    rating: 4.8,
  },
  {
    id: 8,
    title: 'Lego 乐高 机械组 42151 布加迪 Bolide 跑车模型',
    price: 399,
    originalPrice: 599,
    image: getProductImage(8),
    sales: 45600,
    shop: '乐高官方旗舰店',
    tags: ['热卖', '儿童节'],
    rating: 4.9,
  },
  {
    id: 9,
    title: '小米14 Ultra 徕卡光学 Summilux 镜头 16GB+512GB',
    price: 5999,
    originalPrice: 6999,
    image: getProductImage(9),
    sales: 67800,
    shop: '小米官方旗舰店',
    badge: '自营',
    tags: ['影像旗舰'],
    rating: 4.7,
  },
  {
    id: 10,
    title: 'AirPods Pro 2 USB-C 主动降噪 无线蓝牙耳机',
    price: 1599,
    originalPrice: 1999,
    image: getProductImage(10),
    sales: 89200,
    shop: 'Apple 官方旗舰店',
    badge: '自营',
    tags: ['爆款', '学生优惠'],
    rating: 4.9,
  },
  {
    id: 11,
    title: '优衣库 男装 圆领T恤 纯棉舒适 多色可选',
    price: 79,
    originalPrice: 99,
    image: getProductImage(11),
    sales: 156000,
    shop: '优衣库官方旗舰店',
    tags: ['热卖'],
    rating: 4.6,
  },
  {
    id: 12,
    title: 'SK-II 神仙水 护肤精华液 230ml 保湿补水',
    price: 1370,
    originalPrice: 1590,
    image: getProductImage(12),
    sales: 42100,
    shop: 'SK-II 官方旗舰店',
    tags: ['美妆节', '限时折扣'],
    rating: 4.8,
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString('zh-CN');
}

export function formatSales(sales: number): string {
  if (sales >= 10000) {
    return `${(sales / 10000).toFixed(1)}万+`;
  }
  return `${sales}+`;
}

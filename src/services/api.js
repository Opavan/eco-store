
// Mock product data
export const products = [
  {
    id: 1,
    name: 'Bamboo Toothbrush Set',
    description: 'Biodegradable bamboo toothbrushes with soft bristles',
    price: 12.99,
    category: 'personal-care',
    image: '/images/personal-care/brush.jpeg',
    carbonSaved: 2.5,
    ecoScore: 95,
    stock: 50
  },
  {
    id: 2,
    name: 'Reusable Water Bottle',
    description: 'Stainless steel insulated water bottle, 750ml',
    price: 24.99,
    category: 'lifestyle',
    image: '/images/lifestyle/bottle.jpeg',
    carbonSaved: 5.0,
    ecoScore: 92,
    stock: 30
  },
  {
    id: 3,
    name: 'Organic Cotton Tote Bag',
    description: 'Durable shopping bag made from 100% organic cotton',
    price: 15.99,
    category: 'bags',
    image: '/images/bags/bag.jpeg',
    carbonSaved: 3.2,
    ecoScore: 88,
    stock: 100
  },
  {
    id: 4,
    name: 'Solar Phone Charger',
    description: 'Portable solar-powered charger for all devices',
    price: 45.99,
    category: 'electronics',
    image: '/images/electronics/phone.jpeg',
    carbonSaved: 8.5,
    ecoScore: 90,
    stock: 25
  },
  {
    id: 5,
    name: 'Beeswax Food Wraps',
    description: 'Reusable alternative to plastic wrap, set of 3',
    price: 18.99,
    category: 'kitchen',
    image: '/images/kitchen/food-wraps.jpeg',
    carbonSaved: 4.0,
    ecoScore: 94,
    stock: 60
  },
  {
    id: 6,
    name: 'Recycled Notebook',
    description: 'Journal made from 100% recycled paper',
    price: 9.99,
    category: 'stationery',
    image: '/images/stationery/note-book.jpeg',
    carbonSaved: 1.8,
    ecoScore: 85,
    stock: 80
  },
  {
    id: 7,
    name: 'Bamboo Cutlery Set',
    description: 'Travel cutlery set with carrying case',
    price: 14.99,
    category: 'kitchen',
    image: '/images/kitchen/curtely-set.jpeg',
    carbonSaved: 2.8,
    ecoScore: 91,
    stock: 45
  },
  {
    id: 8,
    name: 'Eco-Friendly Yoga Mat',
    description: 'Natural rubber yoga mat, non-toxic and biodegradable',
    price: 65.99,
    category: 'lifestyle',
    image: '/images/lifestyle/yoga.jpeg',
    carbonSaved: 6.5,
    ecoScore: 93,
    stock: 20
  },
  {
    id: 9,
    name: 'Stainless Steel Straws',
    description: 'Reusable metal straws with cleaning brush',
    price: 11.99,
    category: 'kitchen',
    image: '/images/kitchen/straws.jpeg',
    carbonSaved: 2.0,
    ecoScore: 89,
    stock: 70
  },
  {
    id: 10,
    name: 'Hemp Backpack',
    description: 'Durable backpack made from sustainable hemp fiber',
    price: 55.99,
    category: 'bags',
    image:'/images/bags/bag1.jpeg',
    carbonSaved: 7.2,
    ecoScore: 96,
    stock: 15
  },
  {
    id: 11,
    name: 'Natural Soap Bar Set',
    description: 'Handmade organic soap bars, pack of 4',
    price: 22.99,
    category: 'personal-care',
    image: '/images/personal-care/soap.jpeg',
    carbonSaved: 3.5,
    ecoScore: 92,
    stock: 55
  },
  {
    id: 12,
    name: 'LED Solar Garden Lights',
    description: 'Solar-powered outdoor lighting, set of 6',
    price: 38.99,
    category: 'electronics',
    image: '/images/electronics/solar-light.jpeg',
    carbonSaved: 9.0,
    ecoScore: 87,
    stock: 30
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'personal-care', name: 'Personal Care' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'bags', name: 'Bags' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'stationery', name: 'Stationery' }
];

// Simulated API calls
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      product ? resolve(product) : reject(new Error('Product not found'));
    }, 300);
  });
};

export const fetchCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 200);
  });
};

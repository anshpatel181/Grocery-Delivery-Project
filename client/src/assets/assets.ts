import hero_bg from "./hero_bg.jpeg";
import baby_care from "./baby_care.png";
import bakery from "./bakery.png";
import dairy_eggs from "./dairy_eggs.png";
import delivery_truck from "./delivery_truck.svg";
import drinks from "./drinks.png";
import frozen_foods from "./frozen_foods.png";
import fruits_vegetables from "./fruits_vegetables.png";
import meat_seafood from "./meat_seafood.png";
import pantry_staples from "./pantry_staples.png";
import personal_care from "./personal_care.png";
import snacks from "./snacks.png";
import butter_croissant from "./butter-croissant.png";
import organic_quinoa from "./Organic Quinoa.png";
import barley from "./Barley.png";
import knorr_cup_soup from "./Knorr Cup Soup.png";
import maggie from "./Maggie.png";
import sprite from "./Sprite image.png";
import carrots from "./Carrots image.png";
import coco_cola from "./coco cola image.png";
import brown_rice from "./Brown-rice.png";
import facebook from "./fb_icon.png";
import X from "./X-Icon.png";
import instagram from "./instagram.png";
import sevenUp_image from "./7-up bottle.png"
import apple_image from "./apple.png"
import fanta_image from "./fanta.png"
import grapes_image from "./grapes-image.png"
import spinach_image from "./methi.png"
import onion_image from "./onion-image.png"
import orange_image from "./orange.png"
import potato_image from "./potato-image.png"
import tomato_image from "./tomato.png"
import wheat_image from "./wheat.png"

export const assets = {
  hero_bg,
  baby_care,
  bakery,
  snacks,
  personal_care,
  pantry_staples,
  meat_seafood,
  fruits_vegetables,
  frozen_foods,
  drinks,
  delivery_truck,
  dairy_eggs,
  knorr_cup_soup,
};

export const categoriesData = [
  {
    slug: "fruits-vegetables",
    image: fruits_vegetables,
    name: "Fruits & Vegetables",
  },
  { slug: "personal-care", image: personal_care, name: "Personal Care" },
  { slug: "pantry-staples", image: pantry_staples, name: "Pantry Staples" },
  { slug: "bakery", image: bakery, name: "Bakery" },
  { slug: "beverages", image: fruits_vegetables, name: "Beverages" },
  { slug: "meat-seafood", image: meat_seafood, name: "Meat & Seafood" },
  { slug: "snacks", image: snacks, name: "Snacks" },
  { slug: "frozen-foods", image: frozen_foods, name: "Frozen Foods" },
  { slug: "baby-care", image: baby_care, name: "Baby Care" },
  { slug: "dairy-eggs", image: dairy_eggs, name: "Dairy & Eggs" },
];

export const products = [
  {
    _id: "1",
    name: "Butter Croissant 100g",
    description: "Flaky, golden-brown pastry made with layers of pure French butter.",
    price: 45.0,
    originalPrice: 50.0,
    image: butter_croissant,
    category: "bakery",
    unit: "100g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    createdAt: "",
  },
  {
    _id: "2",
    name: "Organic Quinoa 500g",
    description: "Nutrient-dense, gluten-free whole grain packed with protein and essential amino acids.",
    price: 420.0,
    originalPrice: 450.0,
    image: organic_quinoa,
    category: "grains",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    createdAt: "",
  },
  {
    _id: "3",
    name: "Brown Bread 400g",
    description: "Freshly baked, wholesome sliced brown bread rich in dietary fiber.",
    price: 35.0,
    originalPrice: 40.0,
    image: bakery,
    category: "bakery",
    unit: "400g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 13,
    createdAt: "",
  },
  {
    _id: "4",
    name: "Barley 1kg",
    description: "Premium quality whole barley grains, ideal for healthy soups, salads, and stews.",
    price: 140.0,
    originalPrice: 150.0,
    image: barley,
    category: "pantry-staples",
    unit: "1kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    createdAt: "",
  },
  {
    _id: "5",
    name: "Knorr Cup Soup 70g",
    description: "Instant hot soup mix featuring rich flavors and a perfect blend of real vegetables.",
    price: 30.0,
    originalPrice: 35.0,
    image: knorr_cup_soup,
    category: "snacks-packed-foods",
    unit: "70g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 14,
    createdAt: "",
  },
  {
    _id: "6",
    name: "Maggi Noodles 280g",
    description: "India's favorite instant noodles, packed with the classic taste of Masala spices.",
    price: 50.0,
    originalPrice: 55.0,
    image: maggie,
    category: "snacks-packed-foods",
    unit: "280g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 9,
    createdAt: "",
  },
  {
    _id: "7",
    name: "Sprite 1.5L",
    description: "Crisp, clean, and refreshing lemon-lime flavored sparkling soda.",
    price: 60.0,
    originalPrice: 75.0,
    image: sprite,
    category: "beverages",
    unit: "1.5L",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 20,
    createdAt: "",
  },
  {
    _id: "8",
    name: "Carrot 500g",
    description: "Fresh, sweet, and crunchy orange carrots locally sourced and packed with Vitamin A.",
    price: 44.0,
    originalPrice: 50.0,
    image: carrots,
    category: "fruits-vegetables",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 12,
    createdAt: "",
  },
  {
    _id: "9",
    name: "Coca-Cola 1.5L",
    description: "The original sweet and refreshing sparkling cola drink to uplift your mood.",
    price: 75.0,
    originalPrice: 80.0,
    image: coco_cola,
    category: "beverages",
    unit: "1.5L",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    createdAt: "",
  },
  {
    _id: "10",
    name: "Brown Rice 1kg",
    description: "Unpolished long-grain brown rice, preserving natural fiber and vital nutrients.",
    price: 110.0,
    originalPrice: 120.0,
    image: brown_rice,
    category: "pantry-staples",
    unit: "1kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    createdAt: "",
  },
  {
    _id: "11",
    name: "Onion",
    description: "Fresh, pungent pink onions, a fundamental ingredient for every kitchen base.",
    price: 45.0,
    originalPrice: 50.0,
    image: onion_image,
    category: "fruits-vegetables",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    createdAt: "",
  },
  {
    _id: "12",
    name: "Grapes",
    description: "Sweet and juicy seedless grapes, perfect for a healthy everyday snack.",
    price: 65.0,
    originalPrice: 70.0,
    image: grapes_image,
    category: "fruits-vegetables",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    createdAt: "",
  },
  {
    _id: "13",
    name: "Potato",
    description: "Versatile, earthy, farm-fresh potatoes ideal for baking, boiling, or frying.",
    price: 35.0,
    originalPrice: 40.0,
    image: potato_image,
    category: "fruits-vegetables",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 13,
    createdAt: "",
  },
  {
    _id: "14",
    name: "Orange",
    description: "Tangy and bursting with citrus flavor, exceptionally high in Vitamin C.",
    price: 75.0,
    originalPrice: 80.0,
    image: orange_image,
    category: "fruits-vegetables",
    unit: "1kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    createdAt: "",
  },
  {
    _id: "15",
    name: "Tomato",
    description: "Plump, ripe red tomatoes perfect for curries, fresh salads, and home sauces.",
    price: 28.0,
    originalPrice: 30.0,
    image: tomato_image,
    category: "fruits-vegetables",
    unit: "1kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    createdAt: "",
  },
  {
    _id: "16",
    name: "Spinach",
    description: "Crisp, leafy green spinach bunches rich in iron, calcium, and antioxidants.",
    price: 15.0,
    originalPrice: 18.0,
    image: spinach_image,
    category: "fruits-vegetables",
    unit: "500g",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 17,
    createdAt: "",
  },
  {
    _id: "17",
    name: "Apple",
    description: "Sweet, crisp, hand-picked red apples for your daily dose of healthy nutrition.",
    price: 90.0,
    originalPrice: 100.0,
    image: apple_image,
    category: "fruits-vegetables",
    unit: "1kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    createdAt: "",
  },
  {
    _id: "18",
    name: "Wheat Flour",
    description: "100% pure stone-ground whole wheat chakki atta for soft and fluffy rotis.",
    price: 230.0,
    originalPrice: 250.0,
    image: wheat_image,
    category: "pantry-staples",
    unit: "5kg",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    createdAt: "",
  },
  {
    _id: "19",
    name: "Fanta",
    description: "Bright and vibrant sparkling orange soda made with fruity, uplifting flavors.",
    price: 65.0,
    originalPrice: 70.0,
    image: fanta_image,
    category: "beverages",
    unit: "1.5L",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    createdAt: "",
  },
  {
    _id: "20",
    name: "7 Up",
    description: "Refreshing, caffeine-free lemon and lime flavored carbonated soft drink.",
    price: 70.0,
    originalPrice: 76.0,
    image: sevenUp_image,
    category: "beverages",
    unit: "1.5L",
    stock: 10,
    isOrganic: true,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    createdAt: "",
  },
];

export const footerData = {
  brand: {
    name: "Instacart",
    description:
      "Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth's finest.",
    socials: [
      { link: "https://facebook.com", icon: facebook },
      { link: "https://x.com", icon: X },
      { link: "https://instagram.com", icon: instagram },
    ],
  },
  sections: [
    {
      title: "Quick Links",
      links: [
        { to: "/products", label: "All Products", href: "/" },
        { to: "/deals", label: "Flash Deals", href: "/" },
        { to: "/orders/:id", label: "Track Order", href: "/" },
        { to: "/delivery/login", label: "Delivery Partner", href: "/" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { to: "", label: "My Account", href: "/" },
        { to: "", label: "Order History", href: "/" },
        { to: "/addresses", label: "Addresses", href: "/" },
        { to: "", label: "Help Center", href: "/" },
      ],
    },
  ],
};

export const dummyAdminDashboardData = {
  totalOrders: 0,
  totalUsers: 0,
  totalProducts: 0,
  outOfStock: 0,
  recentOrders: [],
}

export const statusColors = [

]

export const dummyDashboardOrdersData = [{

}]

export const dummyDeliveryPartnerData = [{
  
}]

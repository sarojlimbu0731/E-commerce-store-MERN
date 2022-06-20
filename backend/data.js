import bcrypt from 'bcryptjs';

const data = {

    users:[
      {
        name:"saroj",
        email:"saroj@gmail.com",
        password:bcrypt.hashSync('12345'),
        isAdmin:true

      },
      {
        name:"bikram",
        email:"bikram@gmail.com",
        password: bcrypt.hashSync('67890'),
        isAdmin:false

      }
  ],
    products:[
  {
    name: "nike shoes",
    slug: "nike-shoes",
    category: "shoes",
    image: "/images/shoes1.jpg",
    price: 250,
    countInStock: 10,
    brand: "nike",
    rating: 5,
    noReviews: 6,
    description: "branded shoes",
  },
  {
    name: "Addidas shoes",
    slug: "addidas-shoes",
    category: "shoes",
    image: "/images/shoes2.jpg",
    price: 220,
    countInStock: 5,
    brand: "addidas",
    rating: 5,
    noReviews: 8,
    description: "running shoes",
  },
  {
    name: "vans shoes",
    slug: "vans-shoes",
    category: "shoes",
    image: "/images/shoes3.jpg",
    price: 150,
    countInStock: 12,
    brand: "vans",
    rating: 4.5,
    noReviews: 10,
    description: "snikkers shoes",
  },
]
}
export default data;

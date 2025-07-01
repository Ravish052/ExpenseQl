const users = [
  {
    "_id": "u1",
    "userName": "john_doe",
    "name": "John Doe",
    "profilePicture": "https://example.com/john.jpg",
    "gender": "Male"
  },
  {
    "_id": "u2",
    "userName": "jane_smith",
    "name": "Jane Smith",
    "profilePicture": "https://example.com/jane.jpg",
    "gender": "Female"
  }
];

const transactions = [
  {
    "_id": "t1",
    "userId": "u1",
    "description": "Grocery Shopping",
    "paymentType": "Card",
    "category": "Food",
    "amount": 52.30,
    "loacation": "Walmart, NY",
    "date": "2025-06-20"
  },
  {
    "_id": "t2",
    "userId": "u1",
    "description": "Netflix Subscription",
    "paymentType": "Online",
    "category": "Entertainment",
    "amount": 15.99,
    "loacation": "Online",
    "date": "2025-06-01"
  },
  {
    "_id": "t3",
    "userId": "u2",
    "description": "Cab Ride",
    "paymentType": "Cash",
    "category": "Transport",
    "amount": 8.75,
    "loacation": "Downtown LA",
    "date": "2025-06-28"
  },
  {
    "_id": "t4",
    "userId": "u2",
    "description": "Coffee at Starbucks",
    "paymentType": "Card",
    "category": "Food",
    "amount": 4.25,
    "loacation": "Starbucks - Sunset Blvd",
    "date": "2025-06-25"
  }
];

export { users, transactions };


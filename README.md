# Zero food-waste app


## Description

​
To connect restaurants and costumers for purchasing left-over food.

## User stories (MVP)

​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

​
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

​
**Homepage** - As a user I want to be able to access the homepage so that I can login, sign up and check the restaurants list.

​
**Sign up** - As a user I want to sign up on the webpage so that I can use the service.

​
**Log in** - As a user I want to be able to log in on the webpage so that I can make orders.

​
**Log out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

​
**Profile** - As a user I want to be able to see my profile and edit it.

**Order** - As a costumer I want to be able to make an order, as a business I want to be able to see what orders have been made.

**Add products** - As a business I want to be able to add products to my profile.
​
**Order array** - Add product amount in order

**Order status** - See order status 

**Social login** - Log in from social networks

**Languages** - Multiple languages
​

## Backlog / Nice to have

​**Print order** - As a business I want to be able to print the order easily in paper for the chef.

​
**Riders** - As a rider I want to be able to see current orders of the busines where I work.

**UX/UI** - Posar un scroll a la home page.

**Mailing** - As a business I want to be able to send mails with current products to the users of the app.

**Geo-location of business** - As a business I want to be able to locate my place on a map, as a costumer I want to see business near me.

**Search for type of food** - As a costumer I want a search bar to look for specific types of food.

**Fake payment** - As a costumer I want to pay & as a business I want to receive money.

​​
**Theme** - As a user I want to be able to choose from a dark or light theme for my app.

## Routes

​
| Name | Method | Endpoint | Description | Body | Redirects |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home | GET | / | See the main page | | |
| Log in | GET | /auth/login | See the form to log in | | |
| Log in | POST | /auth/login | Log in the user | {email, password} | /user/profile |
| Business list | GET | /business | See the businesses without an account
| Sign Up user | GET | /auth/signup | See the form to sign up
| Sign Up user | POST | /auth/signup | Sign up user | {firstName, lastName, email, password, city, age} | /user/profile
| User main page | GET | /user/profile | User main page
| Edit user | GET | /user/profile/edit | Edit user |  |  
| Edit user | POST | /user/profile/edit | Edit user | {firstName, lastName, city, age} | /user/profile 
| Business detail | GET | /business/:id/detail  | See details of business 
| Order product | POST | /order | Make order | {businessName, product, user} | /orders
| Order history | GET | /orders |
| Add new business | GET | /business/add | {businessName, businessType, city, image } | /business/profile
| Business main page | GET | /business/profile | Business main page 
| Edit business | GET | /business/profile/edit | Edit business | |  
| Edit business | POST | /business/profile/edit | Edit business | {businessName, businessType, city} | /business/profile
| My products | GET | /business/products | See business products
| My orders | GET | /business/orders | See current orders
| Add product | GET | /business/add-product | Add product | {description, price, image} | /business/products 
| Add product | POST | /business/add-product | Add product | | /business 
| Delete user account | POST | /user/delete | Delete user | | / 
| Delete business account | POST | /business/delete | Delete business | | /user/profile
| Log out | POST | /auth/logout | Log out of the app | | / |.

## Models

​
User model
​

```js
{
    firstName: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    city: String,
    age: Number,
    role: enum [String]
},
{
    timestamps
}
```

Business model
​

```js
{
    businessName: String,
    businessType: enum [String],
    imageUrlBusiness: String,
    city: String,
    owner: ObjectId(User)
},
{
    timestamps
}
```

Product model
​

```js
{
    businessName: ObjectId(Business),
    imageUrlProduct: String,
    price: Number,
    description: String
}
```

Order model
​

```js
{
    business: ObjectId(Business),
    product: ObjectId(Product)
    user: ObjectId(User)
},
{
    timestamps
}
```

## Data models (MVP)

​**Order - user:** Reference

**Order - business:** Reference

**Product - business:** Reference
 
  
   
## Links

​

### Github kanban

​
[https://github.com/mrnlts/Zero-food-waste-app/projects/1]()
​

### Github repository

​
[https://github.com/mrnlts/module-2-final-project]()
​

### Project deploy

​
[]()
​

### Wireframes

​
[InVision with Wireframes]()
​

### Slides

​
URls for the project presentation
[Link Slides.com]()

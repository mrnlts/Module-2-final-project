# Zero food waste

## Description

​
An app designed to connect businesses that have high-quality left overs with hungry costumers interested in purchasing.

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
​

## Backlog / Nice to have

​**Print order** - As a business I want to be able to print the order easily in paper for the chef.
​
**Riders** - As a rider I want to be able to see current orders of the busines where I work.

**Lateral scroll** - Add to home page for optimising space.

**Social login** - Login from google.

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
| About | GET | /about | "About us" page | | |
| Business list | GET | /business | See the collaborators
| Sign Up user | GET | /auth/signup | See the form to sign up
| Sign Up user | POST | /auth/signup | Sign up user | {firstName, lastName, email, password, city, age} | /user/profile
| Log in | GET | /auth/login | See the form to log in | | |
| Log in | POST | /auth/login | Log in as user | {email, password} | /user/profile |
| - | - | - | - | - | -
| User main page | GET | /user/profile | User main page
| Edit user | GET | /user/profile/edit | Edit user | |  
| Edit user | POST | /user/profile/edit | Edit user | {firstName, lastName, city, age} | /user/profile
| See details of a specific business | GET | /business/:id/detail | See business details | |
| My orders | GET | /orders | See current and past orders
| Order product | POST | /orders | Add product to cart | {businessName, product, user} | /orders
| Order detail | GET | /orders/:id/details | See details of order, confirm order
| Confirm order | POST | /orders/:id/confirm | Change order status from open to pending | | /orders/:id/details
| Delete user account | POST | /user/delete | Delete user | | /
| - | - | - | - | - | -
| Add business | GET | /business/add | See add business form | |
| Add business | GET | /business/add | Send business data to database | {businessName, businessType, city, image } |/business/profile
| Business main page | GET | /business/profile | Business main page
| Edit business | GET | /business/profile/edit | Edit business | |  
| Edit business | POST | /business/profile/edit | Edit business | {businessName, businessType, city} | /business/profile
| My products | GET | /business/products | See business products
| My business orders | GET | /business/orders | See current orders of business, mark as deliverd
| Deliver order | POST | /orders/:id/delivered | Change order status from pending to delivered
| Add product | GET | /business/add-product | Add product | |
| Add product | POST | /business/add-product | Add product | {description, price, image} | /business/products
| Edit product | GET | /business/:id/edit | Edit product | |
| Edit product | POST | /business/:id/edit | Edit product | {description, price, image} | /business/products  
| Delete product | POST | /business/:id/delete | Delete product | | /business/products  
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
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    passwordHash: {
      type: String,
      trim: true,
        },
    city: String,
    age: Number,
    role: {
      type: String,
      enum: ['business', 'customer'],
      default: 'customer'
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  },
```

Business model
​

```js
{
    businessName: String,
    businessType: {
      type: String,
      enum: [
        'shop',
        'Pizza',
        'Chinese',
        'Sushi',
        'Italian',
        'Japanese',
        'Thai',
        'Vietnamese',
        'Tapas',
        'Mexican',
        'Mediterranean',
        'Gourmet',
        'French',
        'Hamburguer',
        'Kebab',
        'FastFood',
        'Vegan',
        'Vegetarian',
      ],
    },
    imageUrlBusiness: String,
    city: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
```

Product model
​

```js
{
    businessName: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    imageUrlProduct: String,
    price: Number,
    description: String
}
```

Order model
​

```js
{
    business: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    products:
        [{
            item: {type: Schema.Types.ObjectId, ref: 'Product'},
            amount: {
                type: Number,
                default: 1,
            },
        }],
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['open', 'confirmed', 'delivered'],
        default: 'open'
    }
},
{
    timestamps: true
}
```




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
[https://zerofoodwaste.herokuapp.com/]()
​

### Wireframes

​
[https://github.com/mrnlts/Zero-food-waste-app/tree/main/project-images]()
​

### Slides

​
[https://slides.com/celialopez/deck-79ad9e/]()

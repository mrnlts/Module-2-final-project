# Too good to go - clone
​
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
| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {user data}                      | /main/user or /main/business  |
| Product list | GET  |  /products | See the products without an account
| Sign Up crossroad    | GET    | /signup                       | See the crossroad to choose
| Sign Up business    | GET    | /signup/business                       | See the form to sign up   
| Sign Up customer    | GET    | /signup/customer                       | See the form to sign up
| Sign Up business    | POST    | /signup/business                       | Sign up business | {businessName, businessType, image, email, password, location, products} | /main/business 
| Sign Up customer    | POST    | /signup/customer                       | Sign up customer | {firstName, lastName, email, password, location, age}  | /main/customer 
| Edit business    | GET    | /edit/business                       | Edit business |  |  
| Edit business    | POST    | /edit/business                       | Edit business |  | /main/business  
| Edit customer    | GET    | /edit/costumer                       | Edit customer |  |  
| Edit customer    | POST    | /edit/costumer                       | Edit customer |  | /main/customer 
| Select product    | POST    | /product/:id                       | Select product |   |  /main/customer   
| Add product    | GET    |     /main/business/product                 | Add product |   |   
| Add product    | POST    | /main/business/product                       | Add product |   | /main/business    
| Log out    | ?    | ?                       | ? |   | / |. 






## Models
​
Customer model
​
```js
{
    firstName: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    location: Array,
    age: Number
}
```
Business model
​
```js
{
    businessName: String,
    businessType: String,
    image: String,
    email: String,
    hashedPassword: String,
    location: Array
}
```
Product model
​
```js
{
    businessName: ObjectId,
    image: String,
    price: Number,
    description: String
}
```
Order model
​
```js
{
    food: [{productId: ObjectId, amount: Number}], 
    costumer: ObjectId
},
{

}
```



## Data models (MVP)

​**Order - customer:** Reference 

**Order - business:** Reference 

**Product - business:** Reference

## Links
​
### Github kanban
​
[https://github.com/users/mrnlts/projects/3]()
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
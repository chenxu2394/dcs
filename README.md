# Frontend for an E-commerce Website

The current template tech stack: React, TypeScript, Tailwind, Shadcn, tanstack/react-query.

### General requirements

**Pages to Create:**

1. Home page (list all the products)
2. Product page (contain the details of a product)
3. Dashboard page

**Functionalities for a Visitor:**

- Get list of products
- Filter products by categories or price
- Search products by name
- Add products to a cart
- Remove products from a cart
- Do a checkout

**Functionalities for an Admin:**

- CRUD operation for:
  - products
  - users
  - orders
  - categories (if exists)

### Additional requirements

**Authentication:**

- Implement register and login functionality via email and password
- Protect the routes based on login and user role

**Form Validation:**

- Implement form validation.

### Bonus Requirement

- Messages, show loading, success, and error messages (e.g., when loading products list or adding new product)
- Implement pagination feature
- Create a Profile Page (only available if user logs in), implement editing user profile feature (user can change first name, last name)

**CQRS (Command Query Responsibility Segregation)**

CQRS is an architectural pattern that separates **reads (queries)** and **writes (commands)** into different models, allowing for optimized handling of each operation.

**Basic Idea**
- **Command**: Any operation that **modifies** the state of the application (e.g creating, updating,, deleting records).
- **Query**: Any Operation that **retrieves** data but doesn't change it (e.g fetching records).

**Order Management System Example using CQRS Principles**

**Step 1: Set up project**
1. Create project directory
2. Initialise new Node js project ``npm init -y``
3. install required dependencies ``npm i express mongoose``

**Step 2: Define the directory Structure**
- **commands/**: Contains logic for creating, updating, or deleting orders
- **queries/**: Contains logic for fetching orders
- **models/**: Contains the **Order** model for MongoDB.
- **app.js**: Main entry point of the application where we define the routes.

**Step3: Define the order model (MongoDB)**
- models/orderModel.js for Order schema


This Pattern is very useful for larger applications where reads and writes may have different scalling needs.
You can later enhance this by adding more advanced features like **Event Sourcing** or implementing **Command Handlers** for complex logic.


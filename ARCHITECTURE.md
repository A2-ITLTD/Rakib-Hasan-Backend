# Backend Architecture Refactor - Controller Pattern

## Overview

Backend-এ **Model-Route-Controller (MRC)** architecture implement করেছি, যা code organization improve করে এবং maintenance easier করে।

## Folder Structure

```
a2it-backend/
├── controllers/              # 🆕 Business logic layer (NEW!)
│   ├── authController.js
│   ├── usersController.js
│   ├── blogsController.js
│   ├── servicesController.js
│   ├── employeesController.js
│   ├── portfolioController.js
│   ├── promotionalProjectsController.js
│   ├── promotionalPackagesController.js
│   └── uploadController.js
│
├── routes/                   # Route definitions (lean এবং clean)
│   ├── auth.js
│   ├── users.js
│   ├── blogs.js
│   ├── services.js
│   ├── employees.js
│   ├── portfolio.js
│   ├── promotionalProjects.js
│   ├── promotionalPackages.js
│   └── upload.js
│
├── models/                   # Database schemas (unchanged)
├── middleware/
│   ├── auth.js              # Authentication & authorization
│   └── errorHandler.js      # 🆕 Centralized error handling
│
├── config/                   # Database config
├── index.js                  # Main app entry point
└── package.json
```

## Controller Pattern Explanation

### Before (Route-heavy):

```javascript
// routes/users.js - Long async functions inline
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
  }
});
```

### After (Separated concerns):

```javascript
// controllers/usersController.js
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
  }
};
module.exports = { getUsers, createUser, updateUser, deleteUser };

// routes/users.js - Clean routing
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
router.get("/", authMiddleware, adminMiddleware, getUsers);
router.post("/create", authMiddleware, adminMiddleware, createUser);
```

## Benefits

✅ **Separation of Concerns**: Routes শুধু routing define করে, controllers business logic handle করে  
✅ **Reusability**: Same controller functions multiple routes-এ use হতে পারে  
✅ **Testability**: Controllers isolated হওয়ায় unit testing easier  
✅ **Maintainability**: Logic centralized, debug করা সহজ  
✅ **Scalability**: নতুন feature add করতে শুধু controller extend করলেই হয়

## Error Handling

### Centralized Error Middleware (NEW)

File: `middleware/errorHandler.js`

Automatically handles:

- Validation errors (400)
- Cast errors (400)
- JWT errors (401)
- Duplicate key errors (400)
- Generic server errors (500)

সব controller-এ try-catch রয়েছে, error automatically centralized handler-এ যায়।

## Key Changes

### 1. Controllers Added (9 files)

Each controller exports named functions for CRUD operations:

- `getAuthUsers()` → `/api/users` GET
- `createUser()` → `/api/users/create` POST
- `updateUser()` → `/api/users/:id` PUT
- `deleteUser()` → `/api/users/:id` DELETE
  (Similar pattern for all other resources)

### 2. Routes Refactored (9 files)

Routes now act as routers, delegating to controllers:

```javascript
router.get("/", authMiddleware, adminMiddleware, getUsers);
router.post("/", authMiddleware, adminMiddleware, createUser);
```

### 3. Middleware Enhanced

- Added centralized `errorHandler.js`
- Updated `index.js` to use error middleware properly

## How to Add a New Route

### Step 1: Create Controller Function

**controllers/newController.js**

```javascript
const getNewItem = async (req, res) => {
  try {
    // Logic here
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { getNewItem, createNewItem, updateNewItem, deleteNewItem };
```

### Step 2: Create/Update Route

**routes/newRoute.js**

```javascript
const { getNewItem, createNewItem } = require("../controllers/newController");
const router = express.Router();
router.get("/", getNewItem);
router.post("/", authMiddleware, createNewItem);
module.exports = router;
```

### Step 3: Mount in index.js

```javascript
app.use("/api/new", newRoutes);
```

## Current Controllers Summary

| Controller                        | Functions                                                                                                                                                     | Models             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **authController**                | login, getCurrentUser, changePassword                                                                                                                         | User               |
| **usersController**               | getUsers, createUser, updateUser, deleteUser                                                                                                                  | User               |
| **blogsController**               | getBlogs, getBlogBySlug, getAdminBlogs, createBlog, updateBlog, deleteBlog                                                                                    | Blog               |
| **servicesController**            | getServices, getAdminServices, createService, updateService, deleteService                                                                                    | Service            |
| **employeesController**           | getEmployees, getAdminEmployees, createEmployee, updateEmployee, deleteEmployee                                                                               | Employee           |
| **portfolioController**           | getPortfolios, getAdminPortfolios, createPortfolio, updatePortfolio, deletePortfolio                                                                          | Portfolio          |
| **promotionalProjectsController** | getPromotionalProjects, getAdminPromotionalProjects, createPromotionalProject, reorderPromotionalProjects, updatePromotionalProject, deletePromotionalProject | PromotionalProject |
| **promotionalPackagesController** | getPromotionalPackages, getAdminPromotionalPackages, createPromotionalPackage, updatePromotionalPackage, deletePromotionalPackage                             | PromotionalPackage |
| **uploadController**              | uploadImageByType, uploadEmployeeImage, uploadBlogImage, uploadPortfolioImage, uploadServiceImage, listPortfolioResources                                     | (Cloudinary)       |

## Testing

Start server:

```bash
npm start
# or
node index.js
```

Test a controller endpoint:

```bash
curl http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Next Steps (Optional Enhancements)

- [ ] Add request validation middleware (joi/yup)
- [ ] Implement logging system (winston/morgan)
- [ ] Add rate limiting
- [ ] Create service layer for reusable business logic
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement caching layer

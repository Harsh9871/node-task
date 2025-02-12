# 📝 Task Management System (Node.js + Express + MongoDB)

A simple **Task Management System** with **authentication, role-based access control (RBAC), and task management** using **Node.js, Express, and MongoDB**.

---

## 🚀 Features
✅ **User Authentication** (Signup/Login with JWT)  
✅ **Role-Based Access** (`User` & `Admin`)  
✅ **Task Management** (CRUD operations for tasks)  
✅ **Admin Controls** (Manage users & tasks)  
✅ **Secure API** (JWT Authentication & Middleware)  

---

## 📌 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Validation:** Express-validator  
- **Security:** Helmet & CORS  

## API documnetation 
[click here for documentation](https://documenter.getpostman.com/view/39184469/2sAYXBFyxL)


### **Clone the Repository**
```sh
git clone https://github.com/your-username/task-management.git
cd task-management/backend
```

```sh
npm install
```



### **Set Up Environment Variables**
Create a .env file in the root directory and add:

add the follwoing 
```sh
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.la6tp.mongodb.net/
JWT_SECRET=alsjdkjjhsakdfhskdjfnfaeruhfskldjfsdjkrfhskdjfbsdjkfhsdfjbsdfk
SALT=asdnasmbsmhfbsdfbsdmfbskjniuerkjo23rorowj394h38ru20ojeo2wjwrh29389jqwoijdwoe
```

``
will get passowrd and username in email
``

### **start the server**
`for developer`
```sh
npm run dev
```

`for production`

```sh
npm start
```

### **start front end**
```sh
cd frontend
npm install
npm start
```


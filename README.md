# 📫 EzMail – Mailing Service Frontend

## ⚙️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/sid-lakhani/ezmail.git
cd ezmail
```

### 2. Install Dependencies
```bash
npm install
# or
npm i
```

### 3. Run the Dev Server
```bash
npm run dev
```

## 🔐 Dummy Login Credentials
To access the dashboard, use:

| Field | Value |
|-----------|------------------|
| Email | ezmail@demo.com |
| Password | ezmail123 |
| Name | EzMail Demo |

> 🔒 Signup is disabled in the demo. Only login works using the above credentials.

## 🧠 Session Handling
The app uses `localStorage` to simulate a session:
```ts
localStorage.setItem('user', JSON.stringify(dummyUser));
```
This fake session is checked on every dashboard route.

## 💡 Extending
- To add more routes: create new folders inside `app/dashboard/(routes)/`
- To replace dummy auth: hook up any real auth provider 
- To connect backend: replace frontend stubs with real API calls.

---
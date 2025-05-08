
# 🚀 Port Forward Dashboard

A clean and intuitive **React + Node.js** based web dashboard to manage Kubernetes port-forwarding sessions across environments like **DRUID**, **Superset clusters**, and more.

It helps you **categorize**, **control**, and **monitor** your port-forward services—all from a single interface.

![Dashboard Preview](./Port%20Forward%20Dashboard.png)
---
## ✨ Features

* 📊 **Dashboard View**

Organized cards grouped by categories (e.g., DRUID, PostgreSQL) for easy navigation.

* 🔁 **One-Click Start/Stop**

Run and stop multiple port-forwarding commands in one click.

* 💡 **Multi-Cluster Support**

Manage services across different Kubernetes environments using multiple kubeconfig files.

* 🔍 **Search & Filter**

Easily search and filter port-forward services by name or category.

---

## 🖼️ Screenshots

### 🔧 Port-Forward Control Panel

![Port-Forward UI](./assets/3dfe0162-3cf5-4447-9908-f3932b0d1a9a.png)

---

## 📁 Folder Structure
```
portforward-ui/
├── client/ # React frontend
│ └── src/
│ └── components/ # UI components per category
├── server/ # Node.js backend with port logic
│ └── index.js # Express server
├── package.json # Root dependencies & scripts

```

---
## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git  clone  https://github.com/rohitpatel1003/portforwardapp.git
cd  portforwardapp
```


### 2. Install Frontend (React)
```bash
cd  client
npm  install
```

### 3. Install Backend (Node.js)
```bash
cd  ../server
npm  install
```

### 4. Start the App
Make sure the backend is running before the frontend.

**Start Backend (Node.js)**
```bash
cd  server
npm  start
```
**Start Frontend (React)**
In a separate terminal:
```bash
cd  client
npm  start
```

---

## 📦 Tech Stack

*  **Frontend:** React.js

*  **Backend:** Node.js with Express

*  **Kubernetes:** Port forwarding handled via CLI in backend

---

## 📄 License

MIT License © [Rohit Patel](https://github.com/rohitpatel1003)

---

Let me know if you want this exported to a `.md` file or want image paths changed for GitHub Pages or hosted links.
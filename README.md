# PetMate 🐾

**Loving Care for Your Furry Friends — Full-Stack Pet Care Marketplace**

PetMate is a full-stack pet care marketplace that connects pet owners with trusted pet sitters and service providers. Pet owners can discover sitters, manage their pets, book services, and leave reviews, while sitters can manage their profiles, services, rates, and booking requests.

## 🌐 Live Deployment

* **Live Frontend:** https://petmate-frontend-self.vercel.app
* **Backend API:** https://petmate-server-nine.vercel.app
* **API Base URL:** https://petmate-server-nine.vercel.app/api/v1

## ✨ Features

### 🐾 Public Features

* Browse available pet sitters
* Search and filter sitters
* Filter by service type, price, availability, and rating
* View detailed sitter profiles
* View sitter services, pricing, and reviews
* Responsive landing page with featured sitters

### 👤 Pet Owner Features

* Register and login as a pet owner
* Manage personal profile
* Add and manage pets
* Browse and select pet care services
* Book services from available sitters
* View upcoming and previous bookings
* Track booking status
* Leave reviews after completed services

### 🧢 Sitter Features

* Register and login as a sitter
* Create and manage sitter profile
* Add and manage offered services
* Set service rates
* View incoming booking requests
* Accept or decline booking requests
* Update booking status

### 📊 Admin Features

* Admin dashboard
* View and manage users
* Manage user status
* View bookings
* Manage service categories

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **React Hook Form**
* **Zod**
* **TanStack Query**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**

The frontend communicates with the backend through REST APIs.

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── sitter/
│   ├── admin/
│   ├── sitters/
│   └── ...
│
├── components/
│   ├── shared/
│   ├── ui/
│   └── ...
│
├── hooks/
├── lib/
├── providers/
├── services/
├── types/
└── ...
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd practice-pet-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the required backend API configuration.

```env
NEXT_PUBLIC_API_BASE_URL=https://petmate-server-nine.vercel.app/api/v1
```

> Make sure the environment variable name matches the one used by the project configuration if you are running a different local setup.

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

The application will automatically reload whenever you make changes to the source code.

## 🔑 Demo Credentials

For testing and evaluation, the project includes pre-seeded accounts.

**Universal Password:** `password123`

| Role       | Name           | Email                         |
| ---------- | -------------- | ----------------------------- |
| Pet Sitter | Sarah Jenkins  | `sarah.sitter@gmail.com`      |
| Pet Sitter | Marcus Vance   | `marcus.walker@gmail.com`     |
| Pet Sitter | David Miller   | `david.miller.dogs@gmail.com` |
| Pet Owner  | Emily Watson   | `emily.watson@gmail.com`      |
| Pet Owner  | Tariq Mahmud   | `tariq.mahmud@yahoo.com`      |
| Pet Owner  | Jessica Taylor | `jessica.t@outlook.com`       |

## 🔐 User Roles

### Pet Owner

Pet owners can:

* Manage their pets
* Browse available sitters
* Book pet care services
* Manage bookings
* Leave reviews

### Pet Sitter

Sitters can:

* Manage their sitter profile
* Create and manage services
* Set service rates
* Manage booking requests
* Update booking status

### Admin

Administrators can:

* Manage users
* Manage bookings
* Manage service categories
* Monitor the platform

## 🔄 Application Flow

### Pet Owner

```text
Register / Login
       ↓
   Add Pet(s)
       ↓
 Browse Sitters
       ↓
 Select Service
       ↓
   Book Service
       ↓
 Track Booking
       ↓
 Service Completed
       ↓
   Leave Review
```

### Pet Sitter

```text
Register / Login
       ↓
 Create Profile
       ↓
 Add Services & Rates
       ↓
 Receive Booking Request
       ↓
 Accept / Decline
       ↓
 Update Booking Status
       ↓
 Complete Service
```

## 📱 Responsive Design

The application is designed to provide a responsive experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

## 🔗 Related Repository

### Backend

The backend API is maintained separately and provides authentication, user management, pet management, sitter services, bookings, reviews, and other API functionality.

**Backend API:** https://petmate-server-nine.vercel.app

## 📌 Notes

* Authentication and authorization are handled through the backend API.
* Protected dashboard routes require authenticated users.
* Different dashboard experiences are provided based on user roles.
* The frontend consumes the backend REST API for application data.

## 👨‍💻 Development

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment

The frontend is deployed on **Vercel**.

For production deployment:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.

The production frontend is available at:

**https://petmate-frontend-self.vercel.app**

---

## 📄 License

This project was developed as a full-stack web application project for learning, practice, and portfolio purposes.

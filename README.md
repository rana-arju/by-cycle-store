# GearCycle - MERN stack ecommerce application

## Description

GearCycle is a comprehensive e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This application is designed to provide a seamless shopping experience for users, whether they are guests, registered customers, or administrators. The application features a responsive design, ensuring it works well on both desktop and mobile devices.

## Features

- Responsive navigation bar
- Conditional rendering of menu items based on user login status
- Sidebar for profile and logout options
- Integration with Redux for state management
- Ant Design for UI components

## Developer

- [@Rana Arju](https://github.com/rana-arju)

## Live url

<https://by-cycle-store.vercel.app/>

# or

```
https://by-cycle-store.vercel.app

```

## Backend Live  url

<https://bi-cycle-backend.vercel.app/api >

# or

```
https://bi-cycle-backend.vercel.app/api/

```
## Backend github  url

<https://github.com/rana-arju/bi-cycle-backend >

# or

```
https://github.com/rana-arju/bi-cycle-backend

```

## Video Explaination:

[![GearCycle store](https://res.cloudinary.com/db8l1ulfq/image/upload/v1738480990/bicycle-website_d0hu5q.png)](https://youtu.be/RxKw84nNy9k?si=giK77tO-IOmqC0Ol)

## Instructions for Running the Application Locally

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rana-arju/by-cycle-store.git
   ```

1. **Go to the project directory**:

   ```sh
    cd by-cycle-store
   ```

1. **Install dependencies**:

   ```sh
   npm install
   ```

1. **Run the application**:

   ```sh
   npm run dev
   ```

1. **Build the application**:

   ```sh
   npm run build
   ```

## File and Folder Structure

```bash
├── README.md
├── tsconfig.json
├── .env
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── Navbar
│   │   │   ├── index.tsx
│   │   │   ├── SecondNavbar.tsx
│   │   │   ├── ProfileSidebar.tsx
│   │   │   └── navbar.css
│   │   ├── layout
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── SecondLayout.tsx
│   │   └── ...
│   ├── pages
│   │   ├── HomePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── LoginPage.tsx
│   ├── redux
│   │   ├── features
│   │   │   └── auth
│   │   │       ├── authSlice.ts
│   │   │       └── ...
│   │   ├── hook.ts
│   │   └── store.ts
│   ├── utils
│   │   ├── VerifyToken.ts
│   │   └── auth.utils.ts
│   └── ...
├── vercel.json
├── eslint.config.mjs
├── .gitignore
├── .prettierrc
└── .prettierigmore
```

## Packages Used

- `react`: A JavaScript library for building user interfaces.
- `react-dom`: Provides DOM-specific methods that can be used at the top level of your app.
- `react-router-dom`: DOM bindings for React Router.
- `redux`: A Predictable State Container for JS Apps.
- `react-redux`: Official React bindings for Redux.
- `redux-persist`: Persist and rehydrate a redux store.
- `antd`: A design system for enterprise-level products.
- `jsonwebtoken`: JSON Web Token implementation (symmetric and asymmetric).
- `@ant-design/icons`: Official Ant Design icons.
- `sonner`: A toast notification library.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

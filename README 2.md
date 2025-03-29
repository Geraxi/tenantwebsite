# E-Commerce Store

A modern e-commerce platform built with Laravel.

## Features
- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Order management
- Admin dashboard
- Payment integration
- Responsive design

## Requirements
- PHP >= 8.1
- Composer
- MySQL/PostgreSQL
- Node.js & NPM (for frontend assets)

## Installation

1. Clone the repository
2. Install PHP dependencies:
```bash
composer install
```
3. Install NPM dependencies:
```bash
npm install
```
4. Copy the environment file:
```bash
cp .env.example .env
```
5. Generate application key:
```bash
php artisan key:generate
```
6. Configure your database in .env file
7. Run migrations:
```bash
php artisan migrate
```
8. Seed the database:
```bash
php artisan db:seed
```
9. Start the development server:
```bash
php artisan serve
```

## Development
- Frontend assets are compiled using Vite
- Run `npm run dev` for development
- Run `npm run build` for production

## License
MIT 
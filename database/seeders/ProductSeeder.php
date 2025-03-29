<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'category' => 'Electronics',
                'name' => 'Smartphone',
                'description' => 'Latest smartphone with advanced features',
                'price' => 999.99,
                'stock' => 50,
            ],
            [
                'category' => 'Electronics',
                'name' => 'Laptop',
                'description' => 'High-performance laptop for work and gaming',
                'price' => 1499.99,
                'stock' => 30,
            ],
            [
                'category' => 'Clothing',
                'name' => 'T-Shirt',
                'description' => 'Comfortable cotton t-shirt',
                'price' => 29.99,
                'stock' => 100,
            ],
            [
                'category' => 'Clothing',
                'name' => 'Jeans',
                'description' => 'Classic fit denim jeans',
                'price' => 79.99,
                'stock' => 75,
            ],
            [
                'category' => 'Books',
                'name' => 'Programming Guide',
                'description' => 'Comprehensive guide to programming',
                'price' => 49.99,
                'stock' => 40,
            ],
            [
                'category' => 'Books',
                'name' => 'Business Strategy',
                'description' => 'Modern business strategy guide',
                'price' => 39.99,
                'stock' => 60,
            ],
            [
                'category' => 'Home & Garden',
                'name' => 'Garden Tool Set',
                'description' => 'Complete set of essential garden tools',
                'price' => 89.99,
                'stock' => 25,
            ],
            [
                'category' => 'Home & Garden',
                'name' => 'Smart LED Bulb',
                'description' => 'WiFi-enabled smart LED bulb',
                'price' => 34.99,
                'stock' => 80,
            ],
        ];

        foreach ($products as $product) {
            $category = Category::where('name', $product['category'])->first();
            
            Product::create([
                'category_id' => $category->id,
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
            ]);
        }
    }
} 
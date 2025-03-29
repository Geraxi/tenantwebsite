<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;

class Cart extends Component
{
    public $cart = [];
    public $total = 0;

    public function mount()
    {
        $this->cart = session()->get('cart', []);
        $this->calculateTotal();
    }

    public function addToCart($productId, $quantity = 1)
    {
        $product = Product::findOrFail($productId);

        if ($product->stock < $quantity) {
            $this->dispatch('error', message: 'Not enough stock available.');
            return;
        }

        if (isset($this->cart[$productId])) {
            $this->cart[$productId]['quantity'] += $quantity;
        } else {
            $this->cart[$productId] = [
                'name' => $product->name,
                'quantity' => $quantity,
                'price' => $product->price,
                'image' => $product->image,
            ];
        }

        session()->put('cart', $this->cart);
        $this->calculateTotal();
        $this->dispatch('cart-updated');
    }

    public function updateQuantity($productId, $quantity)
    {
        if (!isset($this->cart[$productId])) {
            return;
        }

        $product = Product::findOrFail($productId);

        if ($product->stock < $quantity) {
            $this->dispatch('error', message: 'Not enough stock available.');
            return;
        }

        $this->cart[$productId]['quantity'] = $quantity;
        session()->put('cart', $this->cart);
        $this->calculateTotal();
        $this->dispatch('cart-updated');
    }

    public function removeFromCart($productId)
    {
        if (isset($this->cart[$productId])) {
            unset($this->cart[$productId]);
            session()->put('cart', $this->cart);
            $this->calculateTotal();
            $this->dispatch('cart-updated');
        }
    }

    public function clearCart()
    {
        $this->cart = [];
        session()->forget('cart');
        $this->calculateTotal();
        $this->dispatch('cart-updated');
    }

    private function calculateTotal()
    {
        $this->total = 0;
        foreach ($this->cart as $item) {
            $this->total += $item['price'] * $item['quantity'];
        }
    }

    public function render()
    {
        return view('livewire.cart');
    }
} 
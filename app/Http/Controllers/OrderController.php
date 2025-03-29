<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->orders()->latest()->paginate(10);
        return view('orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);
        return view('orders.show', compact('order'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'billing_address' => 'required|string',
            'shipping_method' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Your cart is empty.');
        }

        $total = 0;
        $orderItems = [];

        foreach ($cart as $productId => $details) {
            $product = Product::findOrFail($productId);

            if ($product->stock < $details['quantity']) {
                return back()->with('error', "Not enough stock available for {$product->name}.");
            }

            $subtotal = $product->price * $details['quantity'];
            $total += $subtotal;

            $orderItems[] = [
                'product_id' => $productId,
                'quantity' => $details['quantity'],
                'unit_price' => $product->price,
                'subtotal' => $subtotal,
            ];

            $product->decrement('stock', $details['quantity']);
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'order_number' => 'ORD-' . Str::upper(Str::random(8)),
            'total_amount' => $total,
            'shipping_address' => $request->shipping_address,
            'billing_address' => $request->billing_address,
            'shipping_method' => $request->shipping_method,
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        session()->forget('cart');

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order placed successfully.');
    }
} 
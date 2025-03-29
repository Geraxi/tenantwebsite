<div>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Shopping Cart
            </h3>
        </div>
        <div class="border-t border-gray-200">
            @if(count($cart) > 0)
                <ul role="list" class="divide-y divide-gray-200">
                    @foreach($cart as $productId => $item)
                        <li class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    @if($item['image'])
                                        <img src="{{ Storage::url($item['image']) }}" alt="{{ $item['name'] }}" class="h-16 w-16 object-cover rounded-lg">
                                    @endif
                                    <div class="ml-4">
                                        <h4 class="text-sm font-medium text-gray-900">{{ $item['name'] }}</h4>
                                        <p class="text-sm text-gray-500">${{ number_format($item['price'], 2) }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center">
                                        <label for="quantity-{{ $productId }}" class="sr-only">Quantity</label>
                                        <input type="number" 
                                               id="quantity-{{ $productId }}" 
                                               wire:model.live="cart.{{ $productId }}.quantity"
                                               min="1"
                                               class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <button wire:click="removeFromCart({{ $productId }})" 
                                            class="text-red-600 hover:text-red-900">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ul>
                <div class="px-4 py-4 sm:px-6">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-medium text-gray-900">
                            Total: ${{ number_format($total, 2) }}
                        </div>
                        <div class="flex space-x-4">
                            <button wire:click="clearCart" 
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Clear Cart
                            </button>
                            <a href="{{ route('checkout') }}" 
                               class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Checkout
                            </a>
                        </div>
                    </div>
                </div>
            @else
                <div class="px-4 py-4 sm:px-6 text-center text-gray-500">
                    Your cart is empty
                </div>
            @endif
        </div>
    </div>
</div> 
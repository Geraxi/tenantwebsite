<div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Filters -->
        <div class="mb-8">
            <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-x-8">
                <!-- Search -->
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
                    <input type="text" wire:model.live="search" id="search" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>

                <!-- Category Filter -->
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <select wire:model.live="category" id="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option value="">All Categories</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->slug }}">{{ $cat->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Price Range -->
                <div>
                    <label for="minPrice" class="block text-sm font-medium text-gray-700">Min Price</label>
                    <input type="number" wire:model.live="minPrice" id="minPrice" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" min="0">
                </div>

                <div>
                    <label for="maxPrice" class="block text-sm font-medium text-gray-700">Max Price</label>
                    <input type="number" wire:model.live="maxPrice" id="maxPrice" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" min="0">
                </div>
            </div>
        </div>

        <!-- Sort Options -->
        <div class="flex justify-end mb-4">
            <button wire:click="sortBy('name')" class="px-3 py-2 text-sm font-medium {{ $sortBy === 'name' ? 'text-indigo-600' : 'text-gray-500' }}">
                Name {{ $sortBy === 'name' ? ($sortDirection === 'asc' ? '↑' : '↓') : '' }}
            </button>
            <button wire:click="sortBy('price')" class="px-3 py-2 text-sm font-medium {{ $sortBy === 'price' ? 'text-indigo-600' : 'text-gray-500' }}">
                Price {{ $sortBy === 'price' ? ($sortDirection === 'asc' ? '↑' : '↓') : '' }}
            </button>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            @forelse($products as $product)
                <div class="group">
                    <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                        <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-full h-full object-center object-cover group-hover:opacity-75">
                    </div>
                    <h3 class="mt-2 text-xs text-gray-700 truncate">{{ $product->name }}</h3>
                    <p class="mt-1 text-sm font-medium text-gray-900">${{ number_format($product->price, 2) }}</p>
                    <div class="mt-2">
                        <button wire:click="$dispatch('addToCart', { productId: {{ $product->id }} })" class="w-full bg-indigo-600 text-white px-3 py-1 text-xs rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Add to Cart
                        </button>
                    </div>
                </div>
            @empty
                <div class="col-span-full text-center py-12">
                    <h3 class="text-lg font-medium text-gray-900">No products found</h3>
                    <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            @endforelse
        </div>

        <!-- Pagination -->
        <div class="mt-8">
            {{ $products->links() }}
        </div>
    </div>
</div> 
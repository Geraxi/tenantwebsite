<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h3 class="text-lg font-semibold mb-4">Welcome to your dashboard!</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Recent Orders -->
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="font-semibold mb-2">Recent Orders</h4>
                            <p class="text-gray-600">View your recent orders and track their status.</p>
                            <a href="{{ route('orders.index') }}" class="mt-4 inline-block text-indigo-600 hover:text-indigo-900">View Orders →</a>
                        </div>

                        <!-- Shopping Cart -->
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="font-semibold mb-2">Shopping Cart</h4>
                            <p class="text-gray-600">Check your cart and proceed to checkout.</p>
                            <a href="{{ route('cart.index') }}" class="mt-4 inline-block text-indigo-600 hover:text-indigo-900">View Cart →</a>
                        </div>

                        <!-- Profile Settings -->
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="font-semibold mb-2">Profile Settings</h4>
                            <p class="text-gray-600">Update your profile information and preferences.</p>
                            <a href="{{ route('profile.edit') }}" class="mt-4 inline-block text-indigo-600 hover:text-indigo-900">Edit Profile →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout> 
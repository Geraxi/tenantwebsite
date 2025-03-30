<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <title><?php echo e($title ?? config('app.name', 'Negozio Online')); ?></title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

    <!-- Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <!-- Stili Aggiuntivi -->
    <style>
        .bg-gradient-elegant {
            background: linear-gradient(135deg, #f6f8fc 0%, #e9edf5 100%);
        }
        .card-elegant {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
        }
    </style>
    <?php echo e($styles ?? ''); ?>

</head>
<body class="font-sans antialiased">
    <div class="min-h-screen bg-gradient-elegant">
        <!-- Navigazione -->
        <?php echo $__env->make('components.navbar', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- Messaggi Flash -->
        <?php if(session()->has('success')): ?>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
                    <span class="block sm:inline"><?php echo e(session('success')); ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if(session()->has('error')): ?>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
                    <span class="block sm:inline"><?php echo e(session('error')); ?></span>
                </div>
            </div>
        <?php endif; ?>

        <!-- Contenuto Pagina -->
        <main class="py-12">
            <?php echo e($slot); ?>

        </main>

        <!-- Piè di pagina -->
        <?php echo $__env->make('components.footer', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    </div>

    <!-- Script -->
    <script>
        // Funzioni JavaScript comuni
        function showAlert(message, type = 'success') {
            alert(message);
        }

        // Gestione Token CSRF per richieste AJAX
        function getCsrfToken() {
            return document.querySelector('meta[name="csrf-token"]').content;
        }

        // Wrapper comune per fetch con gestione CSRF
        async function fetchWithCsrf(url, options = {}) {
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken()
                }
            };

            const mergedOptions = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...(options.headers || {})
                }
            };

            try {
                const response = await fetch(url, mergedOptions);
                if (!response.ok) {
                    throw new Error('Errore nella risposta della rete');
                }
                return await response.json();
            } catch (error) {
                console.error('Errore fetch:', error);
                throw error;
            }
        }
    </script>

    <!-- Script Aggiuntivi -->
    <?php echo $__env->yieldPushContent('scripts'); ?>
    <?php echo e($scripts ?? ''); ?>

</body>
</html> <?php /**PATH /Users/umbertogeraci/Desktop/umberto_ecom_progetto/resources/views/components/layout.blade.php ENDPATH**/ ?>
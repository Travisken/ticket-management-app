<?php
session_start();
require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);

// Simple routing
$page = $_GET['page'] ?? 'home';

// Check authentication
$user = $_SESSION['user'] ?? null;

// Redirect to dashboard if logged in and on home page
if ($user && $page === 'home') {
    header('Location: index.php?page=dashboard');
    exit;
}

// Protected pages
$protectedPages = ['dashboard', 'tickets', 'ticket-form', 'ticket-detail'];
if (in_array($page, $protectedPages) && !$user) {
    header('Location: index.php?page=login');
    exit;
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($page === 'login') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        // Simple authentication (demo)
        if ($email === 'test@example.com' && $password === 'password123') {
            $_SESSION['user'] = ['email' => $email, 'name' => 'Demo User'];
            header('Location: index.php?page=dashboard');
            exit;
        } else {
            $error = 'Invalid credentials';
        }
    } elseif ($page === 'signup') {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        if ($name && $email && $password) {
            $_SESSION['user'] = ['email' => $email, 'name' => $name];
            header('Location: index.php?page=dashboard');
            exit;
        } else {
            $error = 'All fields are required';
        }
    } elseif ($page === 'logout') {
        session_destroy();
        header('Location: index.php?page=home');
        exit;
    } elseif ($page === 'ticket-form') {
        // Handle ticket creation/update
        $tickets = json_decode($_COOKIE['tickets'] ?? '[]', true);
        
        $ticket = [
            'id' => $_POST['id'] ?? uniqid(),
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'status' => $_POST['status'] ?? 'open',
            'priority' => $_POST['priority'] ?? 'medium',
            'created_at' => $_POST['created_at'] ?? date('Y-m-d H:i:s'),
            'user_email' => $user['email']
        ];
        
        // Update or add ticket
        $found = false;
        foreach ($tickets as $key => $t) {
            if ($t['id'] === $ticket['id']) {
                $tickets[$key] = $ticket;
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            $tickets[] = $ticket;
        }
        
        setcookie('tickets', json_encode($tickets), time() + (86400 * 30), '/');
        header('Location: index.php?page=tickets');
        exit;
    } elseif ($page === 'ticket-delete') {
        $id = $_POST['id'] ?? '';
        $tickets = json_decode($_COOKIE['tickets'] ?? '[]', true);
        
        $tickets = array_filter($tickets, function($t) use ($id) {
            return $t['id'] !== $id;
        });
        
        setcookie('tickets', json_encode(array_values($tickets)), time() + (86400 * 30), '/');
        header('Location: index.php?page=tickets');
        exit;
    }
}

// Get tickets for current user
$allTickets = json_decode($_COOKIE['tickets'] ?? '[]', true);
$tickets = array_filter($allTickets, function($t) use ($user) {
    return $user && $t['user_email'] === $user['email'];
});

// Calculate statistics
$stats = [
    'total' => count($tickets),
    'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
    'in_progress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
    'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed')),
];

// Get single ticket for detail page
$currentTicket = null;
if ($page === 'ticket-detail') {
    $ticketId = $_GET['id'] ?? '';
    foreach ($tickets as $t) {
        if ($t['id'] === $ticketId) {
            $currentTicket = $t;
            break;
        }
    }
}

// Render template
echo $twig->render($page . '.twig', [
    'user' => $user,
    'tickets' => array_values($tickets),
    'stats' => $stats,
    'error' => $error ?? null,
    'currentTicket' => $currentTicket,
    'filterStatus' => $_GET['status'] ?? 'all',
]);

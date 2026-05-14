<?php
header('Content-Type: application/json; charset=utf-8');

$rel = trim($_GET['dir'] ?? '', '/');

// Bezpečnost: pouze img/ cesty, žádný traversal
$rel = str_replace(['..', "\0"], '', $rel);
if (!preg_match('/^img\//', $rel)) {
    echo json_encode(['ok' => false, 'error' => 'Neplatná cesta (musí začínat img/)']);
    exit;
}

$base = realpath(dirname(__DIR__));
$dir  = $base . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);

if (!is_dir($dir)) {
    echo json_encode(['ok' => false, 'error' => 'Složka neexistuje: ' . htmlspecialchars($rel)]);
    exit;
}

$allowed_exts = ['jpg', 'jpeg', 'png', 'webp'];
$files = [];

foreach (new DirectoryIterator($dir) as $fi) {
    if ($fi->isDot() || !$fi->isFile()) continue;
    $ext = strtolower($fi->getExtension());
    if (!in_array($ext, $allowed_exts)) continue;
    $files[] = $rel . '/' . $fi->getFilename();
}

natsort($files);

echo json_encode(['ok' => true, 'paths' => array_values($files)]);

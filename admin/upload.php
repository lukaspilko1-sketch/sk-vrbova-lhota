<?php
header('Content-Type: application/json');

$allowed_types = ['image/jpeg', 'image/png', 'image/webp'];
$max_size = 8 * 1024 * 1024; // 8 MB

if (!isset($_FILES['foto'])) {
  echo json_encode(['ok' => false, 'error' => 'Žádný soubor']);
  exit;
}

$file = $_FILES['foto'];

if ($file['error'] !== UPLOAD_ERR_OK) {
  echo json_encode(['ok' => false, 'error' => 'Chyba nahrávání (kód ' . $file['error'] . ')']);
  exit;
}

if (!in_array($file['type'], $allowed_types)) {
  echo json_encode(['ok' => false, 'error' => 'Nepodporovaný formát (jen jpg/png/webp)']);
  exit;
}

if ($file['size'] > $max_size) {
  echo json_encode(['ok' => false, 'error' => 'Soubor je příliš velký (max 8 MB)']);
  exit;
}

$ext  = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$name = 'img_' . date('Ymd_His') . '_' . substr(md5(uniqid('', true)), 0, 6) . '.' . $ext;

$sekce = isset($_POST['sekce']) ? preg_replace('/[^a-z]/', '', $_POST['sekce']) : 'galerie';

$dir_map = [
  'atym'      => '../img/galerie/',
  'pripravka' => '../img/galerie/',
  'ostatni'   => '../img/galerie/',
  'galerie'   => '../img/galerie/',
  'partneri'  => '../img/partneri/',
];
$dir = isset($dir_map[$sekce]) ? $dir_map[$sekce] : '../img/galerie/';

if (!is_dir($dir)) {
  mkdir($dir, 0755, true);
}

$dest = $dir . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
  echo json_encode(['ok' => false, 'error' => 'Chyba při ukládání souboru']);
  exit;
}

$rel_path = 'img/' . ($sekce === 'partneri' ? 'partneri/' : 'galerie/') . $name;

echo json_encode([
  'ok'   => true,
  'src'  => $rel_path,
  'name' => $name,
]);

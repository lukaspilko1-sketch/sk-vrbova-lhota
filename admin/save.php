<?php
header('Content-Type: application/json');

$allowed = [
  'nastaveni.json', 'aktuality.json', 'galerie.json',
  'atym.json', 'pripravka.json', 'kontakty.json', 'partneri.json'
];

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['file'], $input['data'])) {
  echo json_encode(['ok' => false, 'error' => 'Chybí parametry']);
  exit;
}

$file = basename($input['file']);

if (!in_array($file, $allowed)) {
  echo json_encode(['ok' => false, 'error' => 'Soubor není povolen']);
  exit;
}

$json = json_encode($input['data'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

if ($json === false) {
  echo json_encode(['ok' => false, 'error' => 'Neplatný JSON']);
  exit;
}

$path = '../data/' . $file;

// Záloha předchozí verze
if (file_exists($path)) {
  copy($path, $path . '.bak');
}

if (file_put_contents($path, $json) === false) {
  echo json_encode(['ok' => false, 'error' => 'Chyba zápisu — zkontroluj práva na soubor (chmod 664)']);
  exit;
}

echo json_encode(['ok' => true]);

#!/usr/bin/env bash
composer install --no-dev --working-dir=/var/www/html --optimize-autoloader
touch /var/www/html/database/database.sqlite
php artisan config:cache
php artisan route:cache
php artisan migrate --force
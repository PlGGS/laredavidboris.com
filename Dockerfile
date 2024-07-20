# Use the official PHP 7.2 image from the Docker Hub
FROM php:8.0-apache

# Copy the content of the current directory to /var/www/html inside the container
COPY . /var/www/html/

COPY vendor /var/www/html/vendor

# Set working directory
WORKDIR /var/www/html

RUN apt-get update && apt-get -y install libc-client-dev libkrb5-dev && \
    docker-php-ext-configure imap --with-kerberos --with-imap-ssl && apt-get clean

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libbz2-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libbz2-dev \
    libgmp-dev \
    libmagickwand-dev \
    libxml2-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    libzip-dev \
    libedit-dev \
    libsqlite3-dev \
    libssl-dev \
    libicu-dev \
    libinotifytools0-dev \
    && docker-php-ext-install -j$(nproc) bcmath bz2 dom exif fileinfo gd opcache pdo pdo_sqlite phar posix soap xmlwriter \
    && pecl install imagick inotify \
    && docker-php-ext-enable imagick inotify

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Expose port 80 to the host
EXPOSE 80

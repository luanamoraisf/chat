# Dockerfile backend

# Imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instalando dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Configurar o diretório de trabalho
WORKDIR /var/www/html

# Copiar o conteúdo do projeto para o container
COPY . .

# Instalar dependências do Laravel
RUN composer install --no-scripts --no-autoloader

# Gerar chave do aplicativo Laravel
RUN php artisan key:generate

# Definir permissões corretas
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Expor a porta do Apache
EXPOSE 80

# Comando para iniciar o servidor
CMD ["apache2-foreground"]

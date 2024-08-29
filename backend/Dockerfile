# Use uma imagem base do PHP com Apache
FROM php:8.2-apache

# Instale extensões do PHP e dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip

# Instale o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure o DocumentRoot do Apache para o diretório 'public' do Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Altere o DocumentRoot no arquivo de configuração padrão do Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Ative o mod_rewrite do Apache (necessário para Laravel)
RUN a2enmod rewrite

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Copie o código da aplicação Laravel para o diretório de trabalho
COPY . /var/www/html

# Verifique o conteúdo da pasta para garantir que os arquivos foram copiados
RUN ls -la /var/www/html

# Instale as dependências do Laravel
RUN composer install

# Exponha a porta 80
EXPOSE 80

# Inicie o Apache no primeiro plano
CMD ["apache2-foreground"]

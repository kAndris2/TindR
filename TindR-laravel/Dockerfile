FROM php:7.4-apache-buster
ARG DB_CON
ENV DB_CONNECTION=$DB_CON
ARG DB_H
ENV DB_HOST=$DB_H
ARG DB_P
ENV DB_PORT=$DB_P
ARG DB_D
ENV DB_DATABASE=$DB_D
ARG DB_U
ENV DB_USERNAME=$DB_U
ARG DB_PAS
ENV DB_PASSWORD=$DB_PAS
RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl libpq-dev git zip unzip apache2
RUN docker-php-ext-install pdo pdo_pgsql pgsql
RUN ln -s /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN sed -i -e 's/;extension=pgsql/extension=pgsql/' /usr/local/etc/php/php.ini
RUN sed -i -e 's/;extension=pdo_pgsql/extension=pdo_pgsql/' /usr/local/etc/php/php.ini
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /app
COPY . /app
RUN composer install
RUN mv envexample .env
RUN sed -i -e 's/host/'"$(printenv DB_HOST)"'/' .env
RUN sed -i -e 's/port/'"$(printenv DB_PORT)"'/' .env
RUN sed -i -e 's/dbse/'"$(printenv DB_DATABASE)"'/' .env
RUN sed -i -e 's/user/'"$(printenv DB_USERNAME)"'/' .env
RUN sed -i -e 's/pass/'"$(printenv DB_PASSWORD)"'/' .env
RUN php artisan key:generate
RUN mv a2.conf apache2.conf
RUN cp apache2.conf /etc/apache2
RUN mv 000.conf 000-default.conf && mv defssl.conf default-ssl.conf
RUN a2dissite 000-default.conf
RUN a2enmod ssl
RUN cp 000-default.conf default-ssl.conf /etc/apache2/sites-available
RUN a2ensite default-ssl.conf
RUN service apache2 restart
RUN rm -rf /var/www/html/index.html
RUN mkdir /var/www/html/TindR-laravel
RUN cp -r . /var/www/html/TindR-laravel
RUN chown -R www-data:www-data /var/www


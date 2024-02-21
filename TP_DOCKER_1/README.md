# Ynov-devops
## 1 Exécutez un serveur web (Apache, Nginx, etc.) dans un conteneur podman.
### a. Récupérez l'image depuis le podman Hub (httpd ou nginx).

Telecharger nginx :  ```podman pull nginx```

### b. Utilisez une commande pour vérifier que vous avez l'image localement.

Trouver les images en local :```podman images```

### c. Créez un fichier dans votre dépôt local : ./html/index.html qui contient "Hello World".

```
mkdir -p ./html
echo "Hello World" > ./html/index.html
```

### d. Démarrez un nouveau conteneur en utilisant une référence absolue

```
docker run --name my-nginx -p 80:80 -v "$(pwd)/html":/usr/share/nginx/html -d nginx
```

### e. Supprimez le conteneur

```
docker stop my-nginx
docker rm my-nginx
```

### f. Relancez le même conteneur sans l'option -v puis utilisez la commande cp pour servir votre fichier (podman cp ARGS).

```
docker run --name my-nginx -p 80:80 -d nginx
docker cp ./html/index.html my-nginx:/usr/share/nginx/html
```

## 2 Build une image docker

### a. Création du docker file


Cration d'un fichier Dockerfile contenant:

```
FROM nginx:latest
COPY ./html/index.html /usr/share/nginx/html/index.html
```

### b. Lancement du build de l'image et exécution de l'image 

``` 
podman build -t web-server . 
podman run -d -p 80:80 my-server
```

### c. Monter un volume VS Build une image comportant le volume

#### Montage d'un Volume :

- Avantages :  

    Synchronisation en temps réel : les modifications apportées aux fichiers locaux sont immédiatement reflétées dans le conteneur.
    Pas besoin de reconstruire l'image pour des changements de contenu : Vous pouvez mettre à jour le contenu sans arrêter ou reconstruire le conteneur.
    Persistance : Les données peuvent être conservées même lorsque le conteneur s'arrête ou est supprimé.

- Inconvénients :  

    Dépendance à la plateforme : les chemins de fichiers et les permissions peuvent différer entre l'hôte et le conteneur, conduisant à des problèmes potentiels.
    Moins portable : L'image dépend du montage du volume au moment de l'exécution, qui peut ne pas être disponible dans tous les environnements.

#### Copie pendant la Construction :

- Avantages :  

    Portabilité : L'image contient tous les fichiers nécessaires, ce qui la rend plus facile à exécuter partout où Docker est disponible sans dépendances externes.
    Cohérence : L'environnement est plus contrôlé et prévisible, car le contenu est intégré dans l'image.

- Inconvénients :  

    Inflexibilité : Tout changement de contenu nécessite que l'image soit reconstruite et que le conteneur soit redémarré.
    Utilisation des ressources : Si vous avez de nombreuses instances, chacune aura sa propre copie du contenu, ce qui peut utiliser plus d'espace disque.

## 3 configurer MySQL et phpMyAdmin

### a. Télécharger les Images Docker

```
docker pull mysql
docker pull phpmyadmin/phpmyadmin
```

### b. Créer un Réseau sur Podamn

Créez un réseau personnalisé pour que vos conteneurs puissent communiquer :

```
docker network create mon-reseau
```

### c.  Lancer le Conteneur MySQL
Lancez un conteneur pour MySQL ou MariaDB. Vous devrez définir le mot de passe root en utilisant la variable d'environnement MYSQL_ROOT_PASSWORD :
```
docker run --name mon-mysql -e MYSQL_ROOT_PASSWORD=monpassword --network=mon-reseau -d mysql
```

### d. Lancer le Conteneur phpMyAdmin
Démarrez le conteneur phpMyAdmin et liez-le au conteneur MySQL/MariaDB en utilisant le réseau Docker. Vous devez spécifier le serveur en utilisant la variable d'environnement PMA_HOST :
```
docker run --name mon-phpmyadmin -d --network=mon-reseau -e PMA_HOST=mon-mysql -p 8080:80 phpmyadmin/phpmyadmin
```

### e. Accéder à phpMyAdmin

 - Ouvrez un navigateur web et allez sur http://localhost:8080. Vous devriez voir la page de connexion de phpMyAdmin.

 - Utilisez le nom d'utilisateur root et le mot de passe que vous avez défini pour MYSQL_ROOT_PASSWORD pour vous connecter.

### 4 Création d'un docker-compose.yml

#### a. Les commandes pour créer un docker compose

Pour lancer tous les conteneurs définis dans un fichier docker-compose.yml, vous utilisez la commande :

```
docker-compose up
```

Pour arrêter tous les conteneurs lancés par Docker Compose, vous pouvez utiliser la commande :

```
docker-compose down
```

Ou, si vous voulez seulement arrêter les conteneurs sans les supprimer, vous pouvez utiliser :


```
docker-compose stop
```

#### b. exemple de fichier docker-compose.yml

définir un service pour une base de données (comme MySQL ou MariaDB) et phpMyAdmin pour gérer cette base de données :

```
version: '3.1'

services:

  db:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: exemple
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - '8080:80'
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: exemple

volumes:
  db_data:
```

#### c. Les commandes pour créer un podman compose

Pour démarrer les conteneurs:

```podman-compose up -d```

Pour arrêter les conteneurs:

```podman-compose down```

#### d. exemple de podman compose

```
version: '3.1'

services:

  db:
    image: mysql:latest
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - my-db:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    restart: always
    environment:
      PMA_HOST: db
      PMA_USER: user
      PMA_PASSWORD: password
      MYSQL_ROOT_PASSWORD: example
    ports:
      - "8080:80"
    depends_on:
      - db

volumes:
  my-db:
```

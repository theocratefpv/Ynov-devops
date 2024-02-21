
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
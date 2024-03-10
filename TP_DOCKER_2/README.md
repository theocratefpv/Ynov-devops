## Q1 : que se passe-t-il si un des ports publiés est déjà utilisé ?
Si un des ports que vous tentez de publier est déjà utilisé sur la machine hôte, Docker ne pourra pas lier ce port et vous recevrez un message d'erreur. Il vous faudra soit libérer le port en question, soit choisir un autre port pour le publier.

## Q2 : quelle option de la commande npm install permet de n'installer que les dépendances de production ?
L'option --production ou simplement l'option -P avec la commande npm install permet de n'installer que les dépendances nécessaires à l'exécution du projet (dépendances de production), excluant ainsi les dépendances de développement.

## Q2bis : pourquoi faire cela ?
Installer uniquement les dépendances de production permet de réduire le temps d'installation et la taille du node_modules, ce qui est particulièrement utile dans un environnement de production où les outils de développement ne sont pas nécessaires et où l'efficacité et l'utilisation optimale des ressources sont primordiales.

## Q3 : Comment peut-on analyser la sécurité d'une application comme celle-ci (dépendances & image docker) ?
Pour analyser la sécurité des dépendances, on peut utiliser des outils tels que npm audit, Snyk ou d'autres outils d'analyse de vulnérabilités qui vérifient les dépendances par rapport à des bases de données de vulnérabilités connues. Concernant l'image Docker, on peut utiliser des scanners d'images Docker comme Clair, Trivy, ou Docker Bench for Security pour détecter les vulnérabilités et les mauvaises configurations.

## Q4 : Pourquoi le fait de mon container node n'arrive pas à communiquer avec ma base de données si je laisse "localhost" en hostname ?
Dans le contexte de Docker, lorsque vous utilisez "localhost" dans le container node, cela fait référence au container lui-même et non à la machine hôte ou à un autre container. Pour permettre la communication entre les containers, vous devez utiliser le nom du service défini dans le fichier docker-compose.yml pour la base de données en tant qu'hostname, ou utiliser des outils comme Docker Network pour une communication inter-container.
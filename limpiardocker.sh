echo "🛑 Deteniendo todos los contenedores..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🗑 Eliminando todos los contenedores..."
docker rm $(docker ps -aq) 2>/dev/null

echo "🧹 Eliminando todas las imágenes..."
docker rmi $(docker images -q) --force 2>/dev/null

echo "📦 Eliminando todos los volúmenes..."
docker volume rm $(docker volume ls -q) --force 2>/dev/null

echo "🌐 Eliminando redes no utilizadas..."
docker network prune -f

echo "✅ ¡Limpieza completada! Todo ha sido eliminado."
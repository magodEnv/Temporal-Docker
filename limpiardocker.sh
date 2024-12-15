echo "🛑 Deteniendo contenedores relacionados con 'temporal'..."
docker stop $(docker ps -aq --filter "name=temporal") 2>/dev/null

echo "🗑 Eliminando contenedores relacionados con 'temporal'..."
docker rm $(docker ps -aq --filter "name=temporal") 2>/dev/null

echo "🧹 Eliminando imágenes relacionadas con 'temporal'..."
docker rmi $(docker images -q --filter "reference=temporal-docker-*") --force 2>/dev/null

echo "📦 Eliminando volúmenes relacionados con 'temporal'..."
docker volume rm temporal-docker_db-data --force 2>/dev/null

echo "🌐 Eliminando redes relacionadas con 'temporal'..."
docker network rm temporal-docker_app-network 2>/dev/null

echo "✅ ¡Limpieza completada! Todos los recursos relacionados con 'temporal' han sido eliminados."

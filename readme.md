# 📘 Levantar el Proyecto Tempora con Docker  

Este documento explica cómo levantar el proyecto **Tempora** utilizando **Docker** de manera sencilla y rápida.

---

## 🚀 Requisitos Previos  
Antes de comenzar, asegúrese de tener instalado en su sistema:  
- **Docker** y **Docker Compose**  
- Archivo **.env** correctamente configurado  

---

## 📂 Pasos para Levantar el Proyecto  

1️⃣ **Ubicarse en el directorio raíz del proyecto**  
   ```bash
   cd /Temporal-Docker
   ```  
   Este directorio contiene el archivo `docker-compose.yml`, necesario para iniciar los contenedores.  

2️⃣ **Levantar el proyecto con Docker**  
   ```bash
   sudo docker compose up -d
   ```  
   - La bandera `-d` indica que los contenedores se ejecutarán en segundo plano.  
   - Esto iniciará tanto el **frontend** como el **backend** de la página.  

---

## 🔄 Limpieza de Imágenes y Volúmenes  

Si necesita aplicar cambios o realizar una actualización del código, puede limpiar los contenedores, imágenes y volúmenes ejecutando:  
   ```bash
   sudo ./limpiardocker.sh
   ```  
Este script eliminará las imágenes y volúmenes relacionados con la aplicación, asegurando que los cambios se apliquen correctamente en el próximo inicio.

---

## 🎯 Notas  
- Para verificar que los contenedores están corriendo, puede usar:  
  ```bash
  sudo docker ps
  ```  
- Para detener los contenedores sin eliminarlos:  
  ```bash
  sudo docker compose down
  ```  
- En caso de problemas, consulte los logs con:  
  ```bash
  sudo docker compose logs -f
  ```  

---

Con estos sencillos pasos, podrá levantar y gestionar el proyecto **Tempora** sin complicaciones. 🚀

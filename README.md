# Proje Kurulum

## Adım 1 : Öncelikle Projeyi Klonlayın
https://github.com/MetehanATAKAN/covid-19-statistics.git

## Adım 2 : Proje dizinine gidin
cd covid-19-statistics

## Adım 3 : Gerekli paketleri yüklemek için aşağıdaki komutu çalıştırın
npm install

## Adım 4 : Kullanım
npm start


# React Uygulamasını Dockerize Etme

Bu README dosyası, bir React uygulamasını Docker kullanarak nasıl dağıtacağınızı adım adım açıklar. Aşağıdaki adımları izleyerek uygulamanızı Dockerize edebilirsiniz.

## Adım 1: Dockerfile Oluşturma

İlk olarak, Dockerfile oluşturmanız gerekmektedir. Dockerfile, Docker imajınızı nasıl oluşturacağınızı tanımlar. Örneğin:


# Üretim aşaması
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx web sunucusunu kullanarak uygulamayı dağıtma
FROM nginx:alpine
COPY --from=build  /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## Adım 2: Docker İmajını Oluşturma

Dockerfile'ı oluşturduktan sonra, Docker komutunu kullanarak imajı oluşturabilirsiniz. Aşağıdaki komutu çalıştırarak Docker imajını oluşturabilirsiniz:

docker build -t covid-react-app .

 ## Adım 3: Docker Konteynerini Çalıştırma
 Docker imajını oluşturduktan sonra, bir Docker konteyneri oluşturarak ve çalıştırarak uygulamanızı dağıtabilirsiniz. Aşağıdaki komutu kullanarak bu adımı tamamlayabilirsiniz:

 docker run -d -p 4000:80 --name covid-app-docker covid-react-app:latest







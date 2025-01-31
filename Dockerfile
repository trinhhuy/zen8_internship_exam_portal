FROM node:20

# Cài đặt các dependencies cần thiết trên Debian
RUN apt-get update && apt-get install -y \
    build-essential \
    libc6-dev \
    libvips-dev

WORKDIR /app

COPY . .

RUN npm install

# Expose the application port
EXPOSE 3000

CMD ["npm", "run", "dev"]

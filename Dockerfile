# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Этап запуска (production)
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Устанавливаем только необходимые зависимости для запуска
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]




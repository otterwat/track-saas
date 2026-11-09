# ---------- frontend ----------
FROM node:22-alpine AS build

WORKDIR /app

# copy packages
COPY package*.json ./
RUN npm install

# copy front
COPY . .
RUN npm run build
# static bundle

# ---------- backend ----------
FROM python:3.12-slim

WORKDIR /app

# copy backend
COPY backend/ .
RUN pip install --no-cache-dir -r requirements.txt

# copy frontend
COPY --from=build /app/dist ./static

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
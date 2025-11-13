# Product Catalog App

A full-stack catalog application to manage and showcase products with ease.

## 🛠️ Tech Stack

- **Front-end**: TypeScript + Next.js
- **Back-end**: Nest.js
- **Database**: MySql
- **Styling**: SCSS

## Project Structure

```
/client      — front-end application
/server      — back-end API & services
README.md    — this documentation
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/nadiia-dev/product_catalg_app.git
```

2. Navigate into each folder and install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

3. Configure environment variables:

- In `/server`, create a `.env` file (example):

```env
DATABASE_URL=your_database_connection_string
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
PORT_API=8000
CLIENT_URI=
```

- In `/client`, set env variables:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ADMIN_LOGIN=admin
NEXT_PUBLIC_ADMIN_PASS=pass
```

4. Start the MySQL database locally using Docker:

```bash
# In `/server`
docker-compose up --build -d
```

5. Init prisma client and add migrations

```bash
# In `/server`
npx prisma generate

# To appy existing migrations
npx prisma migrate deploy

# To add new migration
npx prisma migrate dev --name migration_name
```

6. Start the applications:

```bash
# In `/server`
npm run start:dev
# In `/client`
npm run dev
```

## Usage

- Use the main page to view all products.
- Use the search/filter functionality to narrow down results.
- Click a product to view detailed info.
- To add/edit/remove a product, go to the admin section and fill in the required fields.

## Admin panel credentials

username - admin
password - pass

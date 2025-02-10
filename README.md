# PRAGMA 6.9
tldr: This is my side project, unfinished, so it cant be runned

---

## Prerequisites
- [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/) (for local frontend development)
- [Python](https://python.org) (for local backend development)
- [Docker](https://docker.com) & [Docker Compose](https://docs.docker.com/compose/) (for containerized development)

---

## Running the Application

### 1. Local Development
#### **Frontend Only**
1. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```
2. Install dependencies using `pnpm`:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```
4. Access the frontend at [http://localhost:3000](http://localhost:3000).

#### **Backend Only**
1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv .env
   source .env/bin/activate 
   # On Windows: .env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI application:
   ```bash
   uvicorn app.main:app --reload
   ```
5. Access the backend at [http://localhost:8000](http://localhost:8000).

#### **Frontend and Backend**
Run both services simultaneously using the steps outlined above in different terminals.

---

### 2. Using Docker
#### **Build and Start Both Services**
1. Ensure you are in the root directory of the project where `docker-compose.yml` is located.
3. Ensure you have docker instances running. For windows, start the Docker Desktop application.
2. Build and start the services:
   ```bash
   docker-compose up --build
   ```
4. Access the services:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:8000](http://localhost:8000)

#### **Build and Start Individual Services**
- **Frontend**:
  1. Navigate to `src/frontend`:
     ```bash
     cd src/frontend
     ```
  2. Build and start the container:
     ```bash
     docker build -t frontend-app .
     docker run -p 3000:3000 frontend-app
     ```
  3. Access the frontend at [http://localhost:3000](http://localhost:3000).

- **Backend**:
  1. Navigate to `src/backend`:
     ```bash
     cd src/backend
     ```
  2. Build and start the container:
     ```bash
     docker build -t backend-app .
     docker run -p 8000:8000 backend-app
     ```
  3. Access the backend at [http://localhost:8080](http://localhost:8000).

---

## Environment Variables
Configure the following environment variables before running the services:
- **Frontend**:
  - `NODE_ENV`: Set to `development` for development mode or `production` for production.
  - `DOCKER_TARGET`: Use `dev` for development or `prod` for production.
  
- **Backend**:
  - `PY_ENV`: Set to `development` or `production` as needed.

For Docker Compose, add these variables in a `.env` file in the project root.

Example `.env` file:
```env
NODE_ENV=development
DOCKER_TARGET=dev
PY_ENV=development
```

---

## Notes
- For optimal development, volumes are mounted to sync local changes with containers.
- Production builds optimize performance and minimize resource usage.
- Ensure `pnpm` is installed globally for frontend development.
- Replace `localhost` with the appropriate address when running on remote systems.

---

<br>
<h2 align="left"> 📱 Framework and Language Used </h2>
<br/>
<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,react,css,tailwind" /> <br>
    <img src="https://skillicons.dev/icons?i=github,vscode,neovim,figma,git,docker" />
  </a>
</div>

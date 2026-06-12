// import express from "express";
// import { createServer as createViteServer } from "vite";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// async function startServer() {
//   const app = express();
//   const PORT = 3000;

//   app.use(express.json());

//   // --- Mock Database (Simulating what your Laravel/MySQL would handle) ---
//   let tickets = [
//     { 
//       id: "T-1001", 
//       title: "Workstation Offline", 
//       status: "In Progress", 
//       priority: "CRITICAL", 
//       user: "Juan Ramirez", 
//       dept: "Accounting",
//       createdAt: new Date().toISOString()
//     },
//     { 
//       id: "T-1002", 
//       title: "VPN Access Request", 
//       status: "Open", 
//       priority: "MEDIUM", 
//       user: "Dave P.", 
//       dept: "Human Resources",
//       createdAt: new Date().toISOString()
//     },
//   ];

//   // --- API Routes (Equivalent to Laravel routes/api.php) ---
  
//   // Health Check
//   app.get("/api/health", (req, res) => {
//     res.json({ status: "ok", engine: "MIS Secure Proxy" });
//   });

//   // Get All Tickets
//   app.get("/api/tickets", (req, res) => {
//     res.json(tickets);
//   });

//   // Create New Ticket
//   app.post("/api/tickets", (req, res) => {
//     const newTicket = {
//       id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
//       ...req.body,
//       createdAt: new Date().toISOString(),
//     };
//     tickets = [newTicket, ...tickets];
//     res.status(201).json(newTicket);
//   });

//   // --- Vite / Static File Handling ---
//   if (process.env.NODE_ENV !== "production") {
//     const vite = await createViteServer({
//       server: { middlewareMode: true },
//       appType: "spa",
//     });
//     app.use(vite.middlewares);
//   } else {
//     const distPath = path.join(process.cwd(), 'dist');
//     app.use(express.static(distPath));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//   }

//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`\x1b[32m[MIS-SERVER]\x1b[0m Service running on http://localhost:${PORT}`);
//   });
// }

// startServer();

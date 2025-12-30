// src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AgentGuard } from "./modules/agent-guard";
import { RWARadar } from "./modules/rwa-radar";

dotenv.config();

// 1. Setup the Server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Allows JSON data)
app.use(cors());
app.use(express.json());

// 2. Initialize Engines
const apiKey = process.env.WEBACY_API_KEY;
if (!apiKey) {
  console.error("❌ FATAL: No API Key found.");
  process.exit(1);
}

const guard = new AgentGuard(apiKey);
const radar = new RWARadar();

// ==========================================
// 🚦 ENDPOINT 1: Health Check
// ==========================================
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "online",
    system: "Argus Protocol v1.0",
    docs: "https://github.com/VnsObi/argus-protocol",
  });
});

// ==========================================
// 🛡️ ENDPOINT 2: Security Scan (The Guard)
// Usage: GET /api/scan?address=0x...
// ==========================================
app.get("/api/scan", async (req: Request, res: Response): Promise<any> => {
  try {
    const address = req.query.address as string;

    if (!address) {
      return res
        .status(400)
        .json({ error: "Missing 'address' query parameter" });
    }

    const result = await guard.checkAddress(address);

    // Log it for "Billing" purposes later
    console.log(
      `[API] Scanned ${address} -> ${result.isSafe ? "SAFE" : "RISK"}`
    );

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 🏢 ENDPOINT 3: Asset Verification (RWA)
// Usage: POST /api/verify-asset
// Body: { "issuer": "0x...", "assetId": "LAND-1", "value": 50000 }
// ==========================================
app.post(
  "/api/verify-asset",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { issuer, assetId, value } = req.body;

      if (!issuer || !assetId) {
        return res.status(400).json({ error: "Missing issuer or assetId" });
      }

      const result = await radar.verifyAsset(assetId, issuer, value || 0);
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// 3. Start Listening
app.listen(PORT, () => {
  console.log(`\n🚀 ARGUS PROTOCOL SERVER IS RUNNING!`);
  console.log(`🔗 Local API: http://localhost:${PORT}`);
});

# 👁️ Argus Protocol

> **The Risk-Middleware for AI Agents & RWAs.**
> A modular security layer that protects autonomous bots from sanctions, honeypots, and unverified assets.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-MVP-success.svg)
![Stack](https://img.shields.io/badge/tech-TypeScript%20%7C%20React%20%7C%20Node.js-blueviolet)

## ⚡ The Problem

Autonomous AI Agents are transacting on-chain, but they lack **compliance awareness**.

1. **Security Risk:** Agents can accidentally interact with sanctioned addresses (e.g., Lazarus Group), causing legal liability.
2. **Asset Risk:** Agents cannot verify if a Real World Asset (RWA) is from a trusted issuer or a scammer.

## 🛡️ The Solution: Argus Protocol

Argus acts as a **Middleware Guard** before a transaction is signed.

### 1. Agent Guard (Security)

- **Sanctions Firewall:** Real-time checks against OFAC/SDN lists.
- **Honeypot Detection:** Scans smart contracts for malicious logic.
- **Multi-Chain Support:** Validates ETH, SOL, and BTC addresses.

### 2. RWA Radar (Compliance)

- **Issuer Verification:** Ensures assets (Land, T-Bills) originate from whitelisted registries.
- **Value Limits:** Flags high-value transactions for manual review.

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- Webacy API Key (or use local mock mode)

### Installation

```bash
# 1. Clone the repo
git clone [https://github.com/VnsObi/argus-protocol.git](https://github.com/VnsObi/argus-protocol.git)

# 2. Install Dependencies (Backend)
npm install

# 3. Install Dependencies (Frontend)
cd client
npm install
```

### Running the Platform

Terminal 1 (Backend API):

```Bash

npx ts-node src/server.ts
```

Terminal 2 (Dashboard):

```Bash

cd client
npm run dev
```

## 🏗️ Architecture

**Backend:** Express.js + TypeScript (Sanctions Logic)

**Frontend:** React + Tailwind CSS (Industrial UI)

**Data:** Webacy API + On-Chain Oracles

📜 License
MIT © Evans Obi

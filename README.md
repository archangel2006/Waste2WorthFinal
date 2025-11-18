# ♻️ Waste2Worth 

Waste2Worth Exchange is a full-stack, AI-powered web application designed to bridge the gap between food surplus and food scarcity. It connects food donors (like restaurants and individuals) with organizations in need (like shelters and food banks) and volunteer transporters, ensuring that edible food is consumed, usable scraps are repurposed, and waste is minimized.

![Waste2Worth](https://img.shields.io/badge/Project-Waste2Worth-53b889?style=flat&logo=recycle&logoColor=white)
![Sustainability](https://img.shields.io/badge/Focus-Sustainability-2e7d32?style=flat&logo=leaf&logoColor=white)
![Circular Economy](https://img.shields.io/badge/Concept-Circular_Economy-d4a017?style=flat)
![Community](https://img.shields.io/badge/Community-Donors_%7C_NGOs_%7C_Volunteers-1e88e5?style=flat)





---

## 🌏Overview

Every year, tons of perfectly good food go to waste. At the same time, many people in our communities face food insecurity. Waste2Worth tackles this problem head-on by creating a seamless, community-driven platform to redirect surplus food, nourish lives, and build a more sustainable future.

The platform uses generative AI to intelligently categorize donations, ensuring that food is directed to its best possible use—whether for human consumption, animal feed, or compost.

## ⭐ Features

-   **Three User Roles:** Users can sign up as a **Donor**, **Organization**, or **Volunteer**.
-   **AI-Powered Donation Categorization:** When a donor lists an item, our AI (powered by Google's Gemini model) analyzes the details and photo to classify it into one of three tiers:
    -   **Edible:** Safe for human consumption.
    -   **Usable:** Suitable for animal feed or other non-human uses.
    -   **Compost:** Biodegradable scraps for composting.
-   **Interactive Dashboard:** A central hub for all users to manage their activities.
    -   **Donors:** Can add new donations and track their donation history and impact.
    -   **Organizations:** Can view and claim available donations from a list or an interactive map.
    -   **Volunteers:** Can view claimed donations and schedule pickups to transport them.
-   **Community Feed:** A social space for users to share updates, success stories, and photos, fostering a sense of community.
-   **Gamification & Rewards:** Users earn badges and level up for their contributions, encouraging engagement.
-   **Responsive Design:** Fully functional and accessible on both desktop and mobile devices.

## 🛠️ Tech Stack & Architecture

### Frontend

| Category          | Technology                                      |
| ----------------- | ----------------------------------------------- |
| Framework         | **Next.js 15** (with App Router)                |
| Language          | **TypeScript**                                  |
| UI Library        | **React**                                       |
| Component Library | **ShadCN UI**                                   |
| Styling           | **Tailwind CSS**                                |
| Icons             | **Lucide React**                                |
| Forms             | **React Hook Form** & **Zod**                   |
| Mapping           | **`@vis.gl/react-google-maps`**                 |

### Backend (Server-side Logic & Database)

| Category              | Technology                                      |
| --------------------- | ----------------------------------------------- |
| Runtime               | **Node.js** (via Next.js)                       |
| Server-side Functions | **Next.js Server Actions**                      |
| Generative AI         | **Genkit** with the Google AI Plugin            |
| Database              | **Firebase Firestore**                          |
| Authentication        | **Firebase Authentication**                     |
---

## 🗂️ Project Structure

```
/
├── src/
│   ├── app/                # Next.js App Router: pages, layouts, and route handlers.
│   │   ├── dashboard/      # Routes and layouts for the authenticated user dashboard.
│   │   ├── login/          # Login and Sign-up page.
│   │   ├── globals.css     # Global styles and Tailwind CSS theme configuration.
│   │   └── page.tsx        # The main landing page.
│   │
│   ├── ai/                 # All Genkit-related code.
│   │   ├── flows/          # Genkit flows that orchestrate AI tasks.
│   │   └── genkit.ts       # Genkit configuration and initialization.
│   │
│   ├── components/         # Reusable React components.
│   │   ├── layout/         # Components for overall site structure (Header, Footer, Nav).
│   │   ├── community/      # Components for the community feed.
│   │   ├── donations/      # Components related to donations (Cards, Dialogs).
│   │   └── ui/             # Core ShadCN UI components.
│   │
│   ├── hooks/              # Custom React hooks (e.g., useCurrentUser, useToast).
│   │
│   ├── lib/                # Utility functions, type definitions, and placeholder data.
│   │   ├── placeholder-data.ts # Mock data used for development.
│   │   ├── types.ts        # Core TypeScript type definitions.
│   │   └── utils.ts        # General utility functions (e.g., cn for classnames).
│
├── public/                 # Static assets like images and favicons.
├── .env                    # For local environment variables (use .env.local).
├── next.config.ts          # Next.js configuration file.
└── tailwind.config.ts      # Tailwind CSS configuration.

```
---

## ⚙️ Local Setup and Installation

Follow these steps to get the project running on your local machine.

### 📦 Prerequisites
-   Node.js (v18 or later)
-   npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/waste2worth-exchange.git
cd waste2worth
```
2. **Install Dependencies**

```bash
   npm install
```

3. **Set Up Environement Variables**
Create a file named .env.local in the root of the project and add the following environment variables. These are required for the AI and Maps features to work.

```bash
# Get this from the Google AI Studio
GEMINI_API_KEY=your_google_ai_api_key

# Get this from the Google Cloud Console
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
4. Run the Development Server
```bash
npm run dev
```
The application will be available at http://localhost:9002

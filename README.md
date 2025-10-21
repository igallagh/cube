# Cubic Art: Interactive 3D Cube

A visually stunning, interactive web application that renders a spinning 3D Rubik's Cube with elegant user controls.

Cubic Art is a visually captivating, interactive web application that renders a realistic 3D Rubik's Cube. The application serves as a digital art piece, featuring a beautifully rendered cube that spins gracefully in a minimalist environment. Users can interact with the cube by clicking and dragging to rotate it freely, inspecting it from any angle. The entire experience is built to be performant and mesmerizing, running smoothly on Cloudflare's edge network.

[cloudflarebutton]

## ✨ Key Features

-   **Interactive 3D Rendering:** A high-fidelity, beautifully lit 3D Rubik's Cube at the center of the experience.
-   **Intuitive Controls:** Click and drag to freely rotate and inspect the cube from any angle.
-   **State Management:** Scramble the cube with a fluid animation, reset it to its solved state, or toggle the automatic spinning motion.
-   **Elegant Dark Theme:** A sophisticated, minimalist UI that makes the vibrant colors of the cube pop.
-   **Performant Animations:** Smooth, satisfying animations for all interactions, powered by `three.js` and `Framer Motion`.
-   **Edge Deployed:** Built to run globally with low latency on Cloudflare's network.

## 🛠️ Technology Stack

-   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **3D Rendering:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/cubic_art_3d.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd cubic_art_3d
    ```
3.  Install the dependencies using Bun:
    ```bash
    bun install
    ```

## 💻 Development

To start the local development server, run the following command:

```bash
bun dev
```

The application will be available at `http://localhost:3000`. The server will automatically reload when you make changes to the source files.

## ☁️ Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Log in to Cloudflare:**
    Authenticate with your Cloudflare account using the Wrangler CLI.
    ```bash
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build and deploy your application to Cloudflare.
    ```bash
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]

## 📂 Project Structure

-   `src/`: Contains all the frontend source code.
    -   `components/`: Reusable React components, including the core 3D canvas and UI controls.
    -   `hooks/`: Custom React hooks, including the Zustand store definition.
    -   `pages/`: Top-level page components.
    -   `index.css`: Global styles and Tailwind CSS configuration.
    -   `main.tsx`: The main entry point for the React application.
-   `worker/`: Contains the Cloudflare Worker server-side code (if any).
-   `public/`: Static assets that are served directly.
-   `tailwind.config.js`: Configuration file for Tailwind CSS.
-   `wrangler.toml`: Configuration file for the Cloudflare Workers deployment.
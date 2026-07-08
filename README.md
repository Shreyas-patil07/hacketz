<div align="center">
  
# 🔮 Interactive Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Made%20for-Performance-success?style=for-the-badge" alt="Performance" />
</p>

A next-generation, premium personal portfolio built with React and Vite. Designed to leave a lasting impression with buttery-smooth micro-interactions, hardware-accelerated animations, and a sleek, modern glassmorphism aesthetic.

[**Live Demo**](#) <!-- Add your live demo link here -->

</div>

---

## ✨ Features

- **Hardware-Accelerated UI:** Fully optimized CSS transforms utilizing `will-change` properties for 60fps+ rendering without layout thrashing.
- **Custom Cursor Engine:** Highly responsive dual-cursor design with JS-based lerp tracking, fully decoupled from CSS transitions to eliminate lag.
- **Scroll Progress Tracking:** A custom, ultra-smooth scrollbar built seamlessly into the global `requestAnimationFrame` loop.
- **Glassmorphism Design:** Beautiful frosted-glass UI components using Tailwind CSS and custom backdrop filters.
- **Scroll-Reveal Animations:** IntersectionObserver-based `.reveal` components that elegantly fade and slide into view.
- **Magnetic Buttons:** Interactive CTA buttons that subtly follow the user's cursor for a premium, tactile feel.
- **Interactive Easter Eggs:** A hidden interactive terminal and an immersive audio-visual entrance experience.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS for complex animations
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter)

## ⚡ Performance Optimizations

To ensure a "production-grade" feel, this portfolio is highly optimized:
1. **Decoupled Scroll & Rendering:** Scroll events simply record state, while all visual updates (scrollbar, cursors) happen in a single, unified `requestAnimationFrame` loop. This completely eliminates UI stutter.
2. **GPU Acceleration:** All heavy lifting (scaling, translating) is passed to the GPU via `translate3d` and explicit `will-change` hints.
3. **Optimized Timing Functions:** Animations utilize premium bezier curves (e.g., `cubic-bezier(0.2, 0.8, 0.2, 1)`) for a natural, elastic feel without "stickiness".

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This generates the highly optimized production build inside the `dist/` directory, ready to be deployed to Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you want to contribute.

## 📝 License

This project is [MIT](LICENSE) licensed.

<div align="center">
  
# 🔮 Interactive Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Made%20for-Performance-success?style=for-the-badge" alt="Performance" />
</p>

A next-generation, premium personal portfolio built with React and Vite. Designed to leave a lasting impression with buttery-smooth micro-interactions, hardware-accelerated animations, and a sleek, modern glassmorphism aesthetic.

### 🌐 [View Live Demo](https://hacketz-about.vercel.app/)

</div>

---

## ✨ Features

- **Hardware-Accelerated UI:** Fully optimized CSS transforms utilizing `will-change` properties for 60fps+ rendering without layout thrashing.
- **Custom Cursor Engine:** Highly responsive dual-cursor design with JS-based lerp tracking, fully decoupled from CSS transitions to eliminate lag.
- **Bento Box Grid:** A premium, masonry-style layout for the tech stack section, utilizing CSS Columns for perfect, gap-free responsive design.
- **Scroll Progress Tracking:** A custom, ultra-smooth scrollbar built seamlessly into the global `requestAnimationFrame` loop.
- **Glassmorphism Design:** Beautiful frosted-glass UI components with custom backdrop filters and ambient lighting effects.
- **Scroll-Reveal Animations:** IntersectionObserver-based `.reveal` components that elegantly fade and slide into view.
- **Magnetic Buttons:** Interactive CTA buttons that subtly follow the user's cursor for a premium, tactile feel.
- **Interactive Easter Eggs:** A hidden interactive terminal and an immersive audio-visual entrance experience.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** Custom CSS with advanced selectors, keyframe animations, and masonry layouts.
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter)

## ⚡ Performance Optimizations

To ensure a "production-grade" feel, this portfolio is highly optimized:
1. **Decoupled Scroll & Rendering:** Scroll events simply record state, while all visual updates (scrollbar, cursors) happen in a single, unified `requestAnimationFrame` loop. This completely eliminates UI stutter.
2. **GPU Acceleration:** All heavy lifting (scaling, translating) is passed to the GPU via `translate3d` and explicit `will-change` hints.
3. **Optimized Timing Functions:** Animations utilize premium bezier curves (e.g., `cubic-bezier(0.2, 0.8, 0.2, 1)`) for a natural, elastic feel without "stickiness".

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shreyas-patil07/hacketz.git
   cd hacketz
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

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Shreyas-patil07/hacketz/issues) if you want to contribute.

## 📝 License

This project is [MIT](LICENSE) licensed.

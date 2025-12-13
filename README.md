# 🧠 Algorithm Atlas

**Interactive Visual Guide to Computational Methods**

An educational web application that brings algorithms to life through interactive visualizations. Explore chaos theory, deterministic algorithms, stochastic processes, machine learning, and more.

[![Deploy Status](https://github.com/swolem12/Algorithm-Visualizer/actions/workflows/deploy.yml/badge.svg)](https://github.com/swolem12/Algorithm-Visualizer/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://swolem12.github.io/Algorithm-Visualizer/)

## ✨ Features

- **Interactive Visualizations**: Real-time animated demonstrations of algorithm behavior
- **Multiple Algorithm Families**: Chaos theory, deterministic, stochastic, machine learning, and more
- **Educational Content**: Detailed explanations with code examples and real-world applications
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **No Backend Required**: Pure client-side React application

## 🎯 Algorithm Categories

### 🌀 Chaos & Nonlinear Dynamics
- Logistic Map time series and cobweb diagrams
- Bifurcation diagrams showing period-doubling cascade
- Lyapunov exponents and sensitivity analysis
- Henon attractors and phase-space visualization

### 🎲 Deterministic Algorithms  
- Sorting and searching examples
- Graph algorithms and routing
- Optimization and scheduling
- Numerical methods

### 📊 Stochastic / Probabilistic
- Random walk visualization
- Monte Carlo methods (live π estimation)
- Markov chains and probabilistic models
- Bayesian inference concepts

### 🤖 Machine Learning & Neural Networks
- Linear regression demonstration
- Training curve visualization
- Supervised and unsupervised learning
- Real-world ML applications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/swolem12/Algorithm-Visualizer.git
cd Algorithm-Visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 📦 Project Structure

```
Algorithm-Visualizer/
├── src/
│   ├── components/      # Reusable visualization components
│   ├── topics/          # Main topic pages (Chaos, ML, etc.)
│   ├── utils/           # Math utilities and helpers
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .github/
│   └── workflows/       # GitHub Actions CI/CD
└── dist/                # Production build (generated)
```

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Deployment**: GitHub Pages via GitHub Actions
- **Language**: TypeScript 5

## 🌐 Deployment

### Automatic Deployment (GitHub Pages)

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Site live at `https://yourusername.github.io/Algorithm-Visualizer/`

## 📚 Educational Use

This project is designed for:
- **Students** learning algorithm concepts
- **Educators** demonstrating computational methods
- **Researchers** exploring chaos theory and complex systems
- **Developers** understanding algorithm trade-offs

## 🤝 Contributing

Contributions are welcome! Ideas:
- Add new algorithm visualizations
- Improve mobile responsiveness
- Add more educational content
- Optimize performance

## 📄 License

MIT License - feel free to use this project for education, research, or personal projects.

---

**Made with ❤️ for educators, students, and algorithm enthusiasts**

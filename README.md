# JNEC Central Library 📚

[![React](https://img.shields.io/badge/React-19.2.4-brightgreen)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.0-orange)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple)](https://getbootstrap.com/)

## Overview

This is the official web application for the **Central Library of Jawaharlal Nehru Engineering College (JNEC), Aurangabad**, part of **MGM University**. It provides students, research scholars, teaching & non-teaching staff easy access to library services, resources, and information.

**Key Features:**
- Modern, responsive UI with Bootstrap and React Router.
- Comprehensive navigation via Sidebar and Navbar.
- Photo gallery of library facilities.
- Access to E-Resources (EBSCO, IEEE Xplore, SpringerLink, SCOPUS, etc.).
- Feedback form for library services (staff, ambiance, books).
- FAQ section for membership, loans, etc.
- Pages for Journals (new arrivals), Question Papers, ULFS, About, and more.

## Features

| Feature | Description | Route |
|---------|-------------|-------|
| Home | Slider, marquee, main content with sidebar | `/` |
| About | Library hours, advisory committee | `/about` |
| E-Resources | Databases (EBSCO, IEEE, Springer), E-Books, E-Journals, Open Access | `/e-resources` |
| FAQ | Membership, inter-library loans (DELNET/INFLIBNET) | `/faq` |
| Feedback | Detailed form (staff ratings, ambiance, books) | `/feedback` |
| Photo Gallery | Library images (reading hall, stacks, entrance) | `/gallery` |
| Journals | New arrivals listing | `/journals` |
| Question Papers | Access to papers | `/question-papers` |
| ULFS | Library services page | `/ulfs` |
| **Lib Rules** | Library rules and regulations | **`/lib-rules`** |
| **Contact** | Library address, contact details, map | **`/contact`** |

## Tech Stack
- **Frontend**: React 19+, React Router 7+
- **Build Tool**: Vite 8.0
- **UI**: Bootstrap 5.3+, React Bootstrap, Bootstrap Icons, React Icons
- **Linting**: ESLint 9+
- **Styling**: Custom CSS (App.css, library-layout.css)

## Quick Start

### Prerequisites
- Node.js (v18+)

### Installation
```bash
git clone <https://github.com/saiprasadzampalwad/LIBRARY-JNEC-REACT/edit/main/README.md>
cd library-jnec-react
npm install
```

### Development
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

### Lint
```bash
npm run lint
```

## Project Structure
```
src/
├── components/  # Header, Footer, NavbarComp, Sidebar, Slider, TopMarquee, MainContent
├── pages/       # AboutPage, EResourcesPage, FAQPage, FeedbackPage, etc.
├── App.jsx      # Routing & Layout
├── main.jsx     # Entry point
└── App.css      # Global styles
public/          # Images (logos, gallery photos)
```

## Screenshots
*(Suggest adding screenshots of home, e-resources, gallery)*
- Home: ![Home](public/images/newslide.jpg)
- Gallery: Library photos available at `/gallery`

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Roadmap
- Add authentication/login for members.
- Integrate real-time feedback submission.
- Deploy to production (Vercel/Netlify).
- Add search for journals/question papers.
- Mobile app (React Native?).

## License
[MIT License](LICENSE)

## Contact
**MGM's JNEC Central Library**  
Jawaharlal Nehru Engineering College, Aurangabad  
© Copyright MGM's JNEC


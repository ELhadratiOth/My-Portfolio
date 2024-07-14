import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import ContactMe from './Contactme';
import Skills from './Skills';
import Projects from './Projects';
import PageNotFound from './PageNotFound';
import Menu from './Menu';
export default function Layout() {
 
  return (
    <div className="container relative w-screen bg-bg-img h-screen flex justify-between flex-col  md:flex-row items-center bg-black pt-8 ">
      <Header />
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactme" element={<ContactMe />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

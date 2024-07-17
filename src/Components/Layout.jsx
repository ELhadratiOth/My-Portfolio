import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Home from './Home';
import About from './About';
import ContactMe from './Contactme';
import Service from './Service';
import Projects from './Projects';
import PageNotFound from './PageNotFound';
import Menu from './Menu';
import Header from './Header'

export default function Layout() {
  return (
    <div className="relative w-full bg-bg-img h-full flex justify-end flex-col md:flex-row items-center bg-black pb-24 md:pb-0 overflow-hidden cursor-custom">
      <Header />
      <SideBar />
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactme" element={<ContactMe />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

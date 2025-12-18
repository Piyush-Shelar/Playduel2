import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#050507] border-t border-white/3">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-start justify-between gap-6">

        {/* Branding */}
        <div>
            <Link
              to="/home"
              className="text-lg font-bold text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              SkillDuels
            </Link>


          <div className="text-sm text-white/60 mt-1">
            Competitive Learning & Quiz Battles
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-8">
          <div>
            <div className="text-sm font-semibold">Product</div>
            <div className="mt-2 text-sm text-white/60 space-y-1">
              {/* <div>Features</div> */}
                  <div>
                        <Link to="/features" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} > Features </Link>
                  </div>
                  
              {/* <div>Pricing</div> */}
                  <div>
                       <Link to="/leaderboard" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} > Leaderboard </Link>
                  </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Company</div>
            <div className="mt-2 text-sm text-white/60 space-y-1">
              <div>
                      <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} > About </Link>
              </div>

              <div>
                      <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} > Contact </Link>
              </div>

              {/* <div>Blog
                   
              </div> */}

            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div>
          <div className="text-sm font-semibold">Follow us</div>
          <div className="flex gap-3 mt-3">
            <a
              href="https://www.linkedin.com/signup?trk=guest_homepage-basic_nav-header-join"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
            >
              <Linkedin className="w-5 h-5 text-white/70" />
            </a>
            <a
              href="https://x.com/"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
            >
              <Twitter className="w-5 h-5 text-white/70" />
            </a>
            <a
              href="https://github.com/"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
            >
              <Github className="w-5 h-5 text-white/70" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 text-sm text-white/40 border-t border-white/">
        © {new Date().getFullYear()} SkillDuels — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

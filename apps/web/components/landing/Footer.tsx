import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="harpply-footer">
      <div className="harpply-footer-inner">
        <div className="harpply-footer-grid">
          <div>
            <Link
              className="harpply-logo-wrap"
              href="#"
              style={{ textDecoration: "none" }}
            >
              <Image
                src="/images/logo.svg"
                alt="Harpply"
                className="harpply-logo-img"
                width={140}
                height={40}
                priority
              />
              {/* <span className="harpply-logo-h" style={{ fontSize: "1.7rem" }}>
                H
              </span>
              <span className="harpply-logo-word" style={{ fontSize: "1.3rem" }}>
                arpply
              </span> */}
            </Link>
            <p className="harpply-footer-desc">
              Where Christian singles meet. A faith-centred platform committed
              to meaningful, God-honouring connection across 140 countries.
            </p>
            <div className="harpply-social-row">
              <a className="harpply-s-icon" href="#" aria-label="Instagram">
                In
              </a>
              <a className="harpply-s-icon" href="#" aria-label="X">
                X
              </a>
              <a className="harpply-s-icon" href="#" aria-label="Facebook">
                Fb
              </a>
              <a className="harpply-s-icon" href="#" aria-label="YouTube">
                Yt
              </a>
            </div>
          </div>
          <div className="harpply-footer-col">
            <span className="harpply-footer-col-head">Platform</span>
            <Link href="#how">How It Works</Link>
            <Link href="#why">Features</Link>
            <Link href="#">
              Pricing <span className="harpply-soon">Soon</span>
            </Link>
            <Link href="#">
              iOS App <span className="harpply-soon">Soon</span>
            </Link>
            <Link href="#">
              Android <span className="harpply-soon">Soon</span>
            </Link>
          </div>
          <div className="harpply-footer-col">
            <span className="harpply-footer-col-head">Community</span>
            <Link href="#stories">Testimonials</Link>
            <Link href="#community">Devotionals</Link>
            <Link href="#community">Prayer Circles</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Newsletter</Link>
          </div>
          <div className="harpply-footer-col">
            <span className="harpply-footer-col-head">Company</span>
            <Link href="#">About Us</Link>
            <Link href="#">Our Mission</Link>
            <Link href="#">Safety Centre</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
        <div className="harpply-footer-bottom">
          <p>&copy; 2025 Harpply Inc. All rights reserved.</p>
          <p className="harpply-footer-verse">
            &quot;He who finds a wife finds a good thing.&quot; — Proverbs 18:22
          </p>
        </div>
      </div>
    </footer>
  );
}

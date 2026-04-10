"use client";

import Link from "next/link";
import Image from "next/image";

const infoLinks = [
  { label: "Stores", href: "/stores" },
  { label: "Shopping Notes", href: "/shoppingnotes" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Career", href: "/career" },
];

export default function Footer() {
  return (
    <footer className="bg-[#001524] text-[#c6c6c6] pt-12 pb-6 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Info */}
          <div>
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_footer_info2.png?fit=412%2C108&ssl=1"
              alt="Info"
              width={200}
              height={52}
              className="w-auto h-auto mb-4 opacity-90"
              style={{ maxWidth: 200 }}
            />
            <div className="flex flex-col gap-2 text-sm">
              {infoLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#415161] hover:text-[#ff5a44] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_footer_contact2.png?fit=412%2C108&ssl=1"
              alt="Contact"
              width={200}
              height={52}
              className="w-auto h-auto mb-4 opacity-90"
              style={{ maxWidth: 200 }}
            />
            <div className="text-sm leading-relaxed mb-1">
              <p>Whatsapp | +852 55038850</p>
              <p>Mon-Fri | 0930-1830</p>
              <p className="text-xs text-[#415161] mt-1">*Except Public Holidays</p>
            </div>
            {/* Socials */}
            <div className="flex gap-4 mt-5">
              {[
                { href: "https://api.whatsapp.com/send?phone=85255038850", label: "WhatsApp", path: "M13.95,0h2.31c.02.06.07.05.12.06.57.04,1.13.12,1.69.23,6.55,1.31,11.47,6.71,12.13,13.34.32,3.22-.34,6.24-1.94,9.05-3.84,6.72-12.27,9.49-19.29,6.25C4,26.65,1.08,22.74.16,17.34c-.05-.32-.03-.66-.16-.97v-2.48c.09-.03.06-.12.06-.18.06-.56.13-1.11.25-1.66C1.63,5.81,6.61,1.13,12.93.16c.34-.05.7-.03,1.03-.16ZM15.12,22.73c.42,0,.85-.02,1.26-.1,4.22-.74,6.98-4.69,6.21-8.9-.76-4.17-4.94-6.95-9.06-6.02-5.12,1.15-7.58,6.87-4.89,11.36.09.15.09.25.02.4-.35.77-.71,1.53-1.04,2.31-.23.52.12,1,.69.95.09,0,.18-.03.26-.04.93-.21,1.84-.5,2.75-.77.16-.05.29-.05.45.03,1.05.53,2.17.79,3.36.79Z", vb: "0 0 30.27 30.29" },
                { href: "https://www.instagram.com/littlestardustc/", label: "Instagram", path: "M13.92,0h2.37c.02.06.07.05.12.06.57.04,1.14.12,1.7.23,6.31,1.26,11.12,6.3,12.06,12.64.05.34.03.7.16,1.03v2.42c-.09.03-.06.11-.06.18-.22,2.19-.87,4.24-1.97,6.16-3.85,6.69-12.27,9.46-19.29,6.24C4.02,26.67,1.09,22.75.16,17.34c-.06-.32-.03-.66-.16-.97v-2.54c.1-.03.06-.11.07-.17.08-.65.17-1.29.32-1.92C1.84,5.62,6.73,1.12,12.95.16c.32-.05.66-.03.97-.16ZM15.17,7.43c-1.29.02-2.59-.01-3.87.14-1.88.22-3.16,1.35-3.61,3.19-.14.58-.17,1.17-.18,1.76-.06,2.16-.12,4.32.09,6.47.18,1.82,1.28,3.1,3.01,3.58.64.18,1.3.21,1.96.23,2.15.05,4.3.12,6.45-.09,1.84-.18,3.13-1.29,3.6-3.02.17-.63.21-1.28.22-1.93.05-2.16.13-4.32-.09-6.47-.21-2.07-1.65-3.49-3.73-3.72-1.28-.14-2.56-.11-3.85-.13Z", vb: "0 0 30.33 30.29" },
                { href: "https://www.facebook.com/littlestardustc/", label: "Facebook", path: "M14.2,0c.63,0,1.26,0,1.89,0,.08.02.15.04.23.05.69.1,1.39.17,2.07.31,6.72,1.41,11.77,7.53,11.89,14.41.06,3.4-.85,6.5-2.85,9.25-2.41,3.32-5.64,5.36-9.68,6.09-.55.1-1.11.15-1.66.23h-1.89c-.08-.02-.15-.04-.23-.05-3.02-.24-5.73-1.28-8.11-3.15C2.8,24.74.91,21.6.23,17.76c-.1-.54-.15-1.09-.23-1.64,0-.63,0-1.26,0-1.9.02-.19.05-.39.07-.58.36-3.28,1.61-6.17,3.82-8.61C6.23,2.44,9.12.83,12.56.23,13.1.13,13.65.08,14.2,0ZM16.27,12.5c0-.54,0-1.04,0-1.53,0-.47.27-.72.74-.73.44,0,.89,0,1.33,0,.21,0,.3-.08.3-.3,0-.68,0-1.36,0-2.04,0-.21-.09-.28-.29-.28-.91,0-1.81-.02-2.72.03-1.18.07-2.21.98-2.38,2.15-.11.74-.05,1.5-.07,2.24,0,.14,0,.29,0,.46-.43,0-.82,0-1.21,0-.24,0-.34.07-.33.32.01.66,0,1.32,0,1.98,0,.23.09.32.31.31.4,0,.8,0,1.23,0v.35c0,2.29,0,4.58,0,6.87,0,.38.02.4.4.4.76,0,1.52,0,2.28,0,.38,0,.4-.02.4-.4,0-2.28,0-4.56,0-6.84v-.38c.61,0,1.19-.01,1.77,0,.3.01.4-.1.42-.39.03-.6.09-1.2.14-1.8.04-.41.02-.43-.4-.43-.63,0-1.26,0-1.92,0Z", vb: "0 0 30.28 30.34" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-[#a2845e] hover:opacity-70 transition-opacity flex items-center">
                  <svg width="24" height="24" viewBox={s.vb} fill="#a2845e"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#3f3f3f] pt-5 text-xs text-[#415161] text-center">
          © {new Date().getFullYear()} Little Stardust Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

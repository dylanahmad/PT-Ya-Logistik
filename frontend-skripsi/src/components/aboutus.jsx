import React from 'react';
import bgHeader from "../assets/aboutus-hero.jpg";
import logoYA from "../assets/logo-ya-logistik.webp";
import facebookIcon from "../assets/icon/facebook.png";
import whatsappIcon from "../assets/icon/whatsapp.png";
import instagramIcon from "../assets/icon/instagram.png";
export default function AboutUs() {
  
  const socialMedia = [{ name: "Facebook", icon: facebookIcon, link: "#" },
                      { name: "WhatsApp", icon: whatsappIcon, link: "#" },
                      { name: "Instagram", icon: instagramIcon, link: "#" },];

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bgHeader})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-end pr-20 text-white">
          <div className="text-right max-w-md">
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-6 md:px-16 md:py-12">
        <h2 className="text-lg md:text-xl font-bold text-black mb-2">PT Ya Logistik</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          Ya Logistik adalah perusahaan yang bergerak dalam bidang jasa pengiriman paket dan dokumen di seluruh wilayah domestik. Berdiri sejak tahun 2024, kami memiliki komitmen untuk menyediakan layanan pengiriman yang cepat, aman, dan terpercaya untuk pelanggan kami di seluruh Indonesia. Dengan dukungan teknologi terkini dan jaringan logistik yang luas, YA Logistik hadir sebagai solusi terbaik bagi kebutuhan pengiriman Anda, baik untuk personal maupun bisnis.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Kami percaya bahwa pengiriman yang tepat waktu dan keamanan barang adalah prioritas utama, sehingga kami selalu berupaya memberikan pengalaman layanan yang terbaik.
        </p>
      </section>

      {/* Visi Misi */}
      <section className="p-6 md:px-16">
        <h3 className="text-base font-semibold mb-2">Visi & Misi kami</h3>
        <p className="text-sm text-gray-700">Menjadi perusahaan jasa pengiriman terkemuka di Indonesia yang terpercaya dan diandalkan oleh pelanggan.</p>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-200 py-8">
        <div className="text-center font-bold text-lg">
          Our Customer service is available 24/7
        </div>
        <div className="flex justify-center items-center gap-4 mt-2 text-lg font-bold">
          <span>📞</span>
          <span>+62 8953 9707 0105</span>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="p-6 md:px-16 md:py-12">
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <p className="text-sm text-gray-700 mb-6">
          Tertarik menggunakan layanan kami? Hubungi kami sekarang untuk mendapatkan informasi lengkap seputar pengiriman, penyimpanan, dan layanan logistik lainnya. Dapatkan kemudahan, harga terjangkau, dan layanan yang aman hanya di sini!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong>📍 Warehouse</strong><br />
              Jl. Cikunir Raya, RT.02/RW.003, Jaka Mulya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17146
            </div>
            <div>
              <strong>🏢 Main Office</strong><br />
              Jalan Wahab No. 7, Kec. Matraman Utan Kayu, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120
            </div>
            <div>
              <strong>📱 Contact</strong><br />
              Mobile: +62 8953 9707 0105<br />
              Email: yumnaadicitia@gmail.com
            </div>
          </div>
          <div>
          <iframe
            className="w-full h-64"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2295258371654!2d106.96859987514672!3d-6.234989393761122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698dc97c2b6d5f%3A0x4bf6aab00a54f919!2sGudang%20YAL!5e0!3m2!1sen!2sid!4v1719312345678!5m2!1sen!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
            <footer className="bg-[#1f2348] text-white py-12">
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                  <img src={logoYA} alt="YA LOGISTIK" className="h-10 mb-4 object-contain" />
                  <p className="text-sm text-gray-300">
                    YA Logistik adalah penyedia layanan pengiriman paket dan dokumen domestik yang mengutamakan kecepatan, keamanan, dan kepercayaan, didukung oleh teknologi dan jaringan logistik yang luas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Explore</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>About Us</li>
                    <li>Our Service</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>Terms</li>
                    <li>Privacy</li>
                  </ul>
                </div>
                <div>
                  <div className="flex gap-4">
                  <div>
        <h4 className="font-semibold mb-2">Social Media</h4>
        <div className="flex gap-4">
          {socialMedia.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              className="bg-white rounded-full p-2"
            >
              <img src={item.icon} alt={item.name} className="h-6 w-6 object-contain" />
            </a>
          ))}
        </div>
      </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-10 text-sm text-gray-400">
                <img src={logoYA} alt="YA LOGISTIK" className="h-5 mb-1 object-contain" />
                <span>© 2025 YA LOGISTIK</span>
              </div>
            </footer>
          </div>
  );
}
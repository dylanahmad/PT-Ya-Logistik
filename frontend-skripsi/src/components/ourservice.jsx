import React from "react";
import deliveryIllust from "../assets/deliverilus.jpg";
import airIcon from "../assets/icon/air-mail.png";
import seaIcon from "../assets/icon/shipping.png";
import truckIcon from "../assets/icon/delivery-truck.png";
import expressIcon from "../assets/icon/motorcycle.png";
import warehouseIcon from "../assets/icon/warehouse.png";
import sustainableImg from "../assets/ramah lingkungan.jpg";
import innovationImg from "../assets/innovation.jpg";
import globalImg from "../assets/global.jpg";
import logoYA from "../assets/logo-ya-logistik.webp";
import bgHeader from "../assets/ourservice-hero.jpg";
import facebookIcon from "../assets/icon/facebook.png";
import whatsappIcon from "../assets/icon/whatsapp.png";
import instagramIcon from "../assets/icon/instagram.png";
export default function OurService() {
  const socialMedia = [{ name: "Facebook", icon: facebookIcon, link: "#" },
                      { name: "WhatsApp", icon: whatsappIcon, link: "#" },
                      { name: "Instagram", icon: instagramIcon, link: "#" },];
  const services = [
    {
      icon: airIcon,
      title: "Pengiriman Udara",
      desc: "Solusi cepat untuk pengiriman domestik dan internasional.",
    },
    {
      icon: seaIcon,
      title: "Pengiriman Laut",
      desc: "Solusi hemat biaya untuk logistik skala besar, dengan jangkauan internasional dan penanganan profesional.",
    },
    {
      icon: truckIcon,
      title: "Pengiriman Truk",
      desc: "Layanan darat yang efisien untuk pengiriman barang dalam jumlah besar ke seluruh wilayah Indonesia.",
    },
    {
      icon: expressIcon,
      title: "Express",
      desc: "Transport 24/7 with TMS & Tracking",
    },
    {
      icon: warehouseIcon,
      title: "Warehouse",
      desc: "Tempat penyimpanan barang yang aman dan terorganisir",
    },
  ];

  const advantages = [
    {
      image: sustainableImg,
      title: "Ramah Lingkungan",
      desc: "Komitmen kami terhadap keberlanjutan tercermin dalam setiap proses logistik. YA Logistik mendukung rantai pasok yang ramah lingkungan demi masa depan yang lebih baik.",
    },
    {
      image: innovationImg,
      title: "Innovation",
      desc: "Kami terus mengembangkan solusi logistik berbasis teknologi modern, dari pelacakan real-time hingga otomasi gudang, guna memberikan pelayanan yang lebih cepat dan efisien.",
    },
    {
      image: globalImg,
      title: "Jejak Konektivitas Global",
      desc: "Dengan jaringan pengiriman nasional dan mitra global, kami memastikan kiriman Anda menjangkau seluruh Indonesia dan dunia dengan aman dan tepat waktu.",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      
            {/* Hero Section */}
            <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bgHeader})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-end pr-20 text-white">
              </div>
            </section>
      
      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Service</h2>
        <p className="text-gray-600 mb-6">
          PT YA Logistik menyediakan layanan logistik terintegrasi yang mencakup pengiriman darat, laut, dan udara,
          dengan dukungan armada truk, pelacakan real-time, serta kerja sama dengan mitra internasional terpercaya.
          Kami juga menawarkan layanan ekspres dan manajemen gudang yang efisien.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2 space-y-6">
            <h4 className="text-lg font-semibold text-gray-700">We have many ways to deliver your goods</h4>
            <p className="text-gray-600">
              Dengan layanan yang fleksibel dan jaringan luas, kami pastikan setiap pengiriman disesuaikan dengan kebutuhanmu.
            </p>
            <ul className="space-y-4">
              {services.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <img src={item.icon} alt="icon" className="w-6 h-6 mt-1" />
                  <div>
                    <h5 className="font-semibold text-gray-800">{item.title}</h5>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <img src={deliveryIllust} alt="Delivery" className="md:w-1/2 max-w-md" />
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <div key={i} className="bg-white rounded shadow overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Bar */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center text-sm">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <i className="fas fa-calendar-check"></i>
            Book our service
          </div>
          <span>&rarr;</span>
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <i className="fas fa-box"></i>
            We pack your goods
          </div>
          <span>&rarr;</span>
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <i className="fas fa-truck"></i>
            We move your goods
          </div>
          <span>&rarr;</span>
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <i className="fas fa-box-open"></i>
            We unpack your goods
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
};
const Project = () => {
  const projects = [
    {
      id: 1,
      title: "Website Quản lý công việc",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      desc: "Ứng dụng To-Do fullstack (Node.js + React) giúp người dùng quản lý công việc hiệu quả.",
      link: "#",
      tech: "React, Node.js, MongoDB",
    },
    {
      id: 2,
      title: "Trang thương mại điện tử",
      img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80",
      desc: "Website bán hàng hiện đại, responsive, hỗ trợ giỏ hàng và thanh toán trực tuyến.",
      link: "#",
      tech: "React, Express, MySQL",
    },
    {
      id: 3,
      title: "Hệ thống blog cá nhân",
      img: "https://images.unsplash.com/photo-1504691342899-7b0d3fc0b4d0?auto=format&fit=crop&w=800&q=80",
      desc: "Nền tảng chia sẻ bài viết, bình luận và quản lý tài khoản người dùng.",
      link: "#",
      tech: "Next.js, MongoDB",
    },
    {
      id: 4,
      title: "Ứng dụng du lịch Việt Nam",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      desc: "Bản đồ địa điểm du lịch Việt Nam, gợi ý hành trình thông minh.",
      link: "#",
      tech: "React, Leaflet, Firebase",
    },
    {
      id: 5,
      title: "Ứng dụng du lịch Việt Nam",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      desc: "Bản đồ địa điểm du lịch Việt Nam, gợi ý hành trình thông minh.",
      link: "#",
      tech: "React, Leaflet, Firebase",
    },
    {
      id: 5,
      title: "Ứng dụng du lịch Việt Nam",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      desc: "Bản đồ địa điểm du lịch Việt Nam, gợi ý hành trình thông minh.",
      link: "#",
      tech: "React, Leaflet, Firebase",
    },
  ];

  return (
    <>
      {/* HERO nhỏ */}
      <section
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "40vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold display-5">Dự án nổi bật</h1>
          <p className="lead mt-3">Những sản phẩm tôi đã thực hiện gần đây</p>
        </div>
      </section>

      {/* DANH SÁCH DỰ ÁN */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Danh sách dự án</h2>
          <div className="row g-4">
            {projects.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{
                    transition: "0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                    <div className="mt-auto">
                      <span className="badge bg-primary me-2">{item.tech}</span>
                      <div className="mt-3">
                        <a
                          href={item.link}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Xem chi tiết
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">&copy; 2025 MyBrand. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Project;

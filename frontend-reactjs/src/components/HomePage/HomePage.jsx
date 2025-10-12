import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero section */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "100vh",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="display-3 fw-bold">
            Chào mừng đến với Website của tôi
          </h1>
          <p className="lead mt-3">
            Thiết kế hiện đại - Responsive - Tối ưu UX/UI
          </p>
          <a
            href="#"
            className="btn btn-primary btn-lg mt-3"
            onClick={() => navigate("/user")}
          >
            Bắt đầu ngay
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Dịch vụ của chúng tôi</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm h-100 border-0">
                <i className="bi bi-laptop fs-1 mb-3 text-primary"></i>
                <h5>Thiết kế web</h5>
                <p>
                  Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp,
                  hiện đại và chuẩn SEO.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm h-100 border-0">
                <i className="bi bi-phone fs-1 mb-3 text-success"></i>
                <h5>Ứng dụng di động</h5>
                <p>
                  Phát triển app iOS & Android tối ưu hiệu suất và trải nghiệm
                  người dùng.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm h-100 border-0">
                <i className="bi bi-gear fs-1 mb-3 text-danger"></i>
                <h5>Hệ thống backend</h5>
                <p>
                  Xây dựng API mạnh mẽ bằng Node.js và MongoDB, dễ mở rộng và
                  bảo mật.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">&copy; 2025 MyBrand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

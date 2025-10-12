const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "40vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold display-5">Về chúng tôi</h1>
          <p className="lead mt-3">
            Hành trình, giá trị và sứ mệnh mà chúng tôi theo đuổi
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Ảnh minh họa */}
            <div className="col-md-5 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="About us"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Nội dung */}
            <div className="col-md-7">
              <h2 className="fw-bold mb-3">Chúng tôi là ai?</h2>
              <p className="text-muted">
                Chúng tôi là một nhóm lập trình viên trẻ, đam mê công nghệ và
                sáng tạo. Mục tiêu của chúng tôi là mang lại những giải pháp
                phần mềm hiện đại, thân thiện và hiệu quả cho người dùng.
              </p>
              <p className="text-muted">
                Với kinh nghiệm trong các lĩnh vực <b>Web Development</b>,
                <b> UX/UI Design</b> và <b>Backend System</b>, chúng tôi luôn cố
                gắng học hỏi và phát triển để đáp ứng mọi nhu cầu của khách
                hàng.
              </p>
              <a href="#team" className="btn btn-primary mt-2">
                Xem đội ngũ của chúng tôi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / VALUES */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Giá trị & Kỹ năng cốt lõi</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="bi bi-lightbulb fs-1 text-warning mb-3"></i>
                <h5 className="fw-bold">Sáng tạo</h5>
                <p className="text-muted">
                  Luôn đổi mới trong cách tiếp cận vấn đề, mang lại ý tưởng độc
                  đáo và hiệu quả cho sản phẩm.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="bi bi-people fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold">Hợp tác</h5>
                <p className="text-muted">
                  Đề cao tinh thần teamwork, cùng nhau phát triển và đạt được
                  mục tiêu chung.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="bi bi-award fs-1 text-success mb-3"></i>
                <h5 className="fw-bold">Chất lượng</h5>
                <p className="text-muted">
                  Cam kết mang lại sản phẩm tốt nhất, tuân thủ tiêu chuẩn kỹ
                  thuật và tối ưu trải nghiệm người dùng.
                </p>
              </div>
            </div>
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

export default About;

import heroImg from "../../assets/login-illustration.svg"; // add an illustration in assets

export default function HeroSectoin() {
  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg, #4e54c8 0%, #f7b733 100%)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Text */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold text-white">
              Learn Smarter, Not Harder
            </h1>
            <p className="lead text-light mt-3">
              Smart LMS helps students and professionals upskill with modern
              courses, interactive tools, and a seamless learning experience.
            </p>
            <div className="mt-4">
              <a href="/courses" className="btn btn-primary btn-lg me-3">
                Explore Courses
              </a>
              <a href="/login" className="btn btn-outline-light btn-lg">
                Get Started
              </a>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={heroImg}
              alt="Learning Illustration"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

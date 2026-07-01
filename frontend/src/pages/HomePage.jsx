import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const metrics = [
  ['Total Invoices', '1,428', '+8.3% from last month', 'doc'],
  ['Total Collections', '$245,850.00', '+12.5% from last month', 'bill'],
  ['Outstanding Receivables', '$67,890.00', '-5.2% from last month', 'cash'],
  ['Active Guests', '256', '+5.1% from last month', 'guests'],
];

const features = [
  ['Invoice Management', 'Create, send and manage invoices with ease.', '$'],
  ['Payment Tracking', 'Track payments and manage multiple payment methods.', '='],
  ['Receivables Management', 'Monitor outstanding balances and follow up efficiently.', '|'],
  ['Billing Reports', 'Generate detailed reports and export with one click.', '#'],
  ['System Integration', 'Seamlessly integrate with hotel operations.', '*'],
];

const modules = [
  ['Invoice Workflow', 'Assign, approve and deliver invoices with complete visibility.'],
  ['Payment Reconciliation', 'Automatically match payments to invoices and reduce errors.'],
  ['Receivables Tracking', 'Monitor overdue balances and follow up with ease.'],
  ['Reporting Suite', 'Generate detailed financial reports and export with one click.'],
  ['System Integration', 'Connect billing to guest services, front desk, and accounting.'],
];

const benefits = [
  ['Accurate & Reliable', 'Ensure accuracy in every invoice and transaction.', 'v'],
  ['Save Time', 'Automate billing processes and reduce manual work.', 'o'],
  ['Secure & Compliant', 'Data security and compliance built for peace of mind.', '+'],
  ['Better Cash Flow', 'Improve cash flow with faster payments and tracking.', '/'],
];

export default function HomePage() {
  return (
    <div className="landing-page">
      <div className="landing-frame">
        <Navbar />
        <main className="home-hero" id="home">
          <section className="hero-content">
            <div className="hero-logo">
              <img src="/images/logo.png" alt="EUTELIA logo" />
              <span>Billing Department System</span>
            </div>
            <h1>
              Simplify Billing.<br />
              Elevate <span>Excellence.</span>
            </h1>
            <div className="gold-rule" />
            <p className="hero-copy">
              Streamline invoicing, track payments, and manage receivables with accuracy and ease. Built exclusively for the hospitality industry.
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#features">Explore Features <span>→</span></a>
              <a className="hero-button hero-button-secondary" href="#contact">Request Demo <span>▢</span></a>
            </div>
          </section>
          <aside className="hero-panel" aria-label="Billing metrics">
            {metrics.map(([label, value, delta, icon]) => (
              <article className="metric-card" key={label}>
                <div className={`metric-icon metric-${icon}`} aria-hidden="true" />
                <div>
                  <p>{label}</p>
                  <strong>{value}</strong>
                  <span className={delta.startsWith('-') ? 'down' : ''}>{delta}</span>
                </div>
              </article>
            ))}
          </aside>
        </main>
      </div>

      <section className="about-section" id="about">
        <div className="section-header">
          <p>About Us</p>
          <h2>Designed for modern hoteliers who demand accurate billing and luxurious guest experiences.</h2>
        </div>
        <div className="about-copy">
          <p>At EUTELIA, we bring clarity and control to hotel finance operations. Our billing department system is crafted to support seamless communication between front desk, accounting, and management while preserving an elegant guest experience.</p>
        </div>
      </section>

      <section className="feature-summary" id="features">
        <h2>Everything you need for<br /><span>Efficient Billing Management</span></h2>
        <div className="ornament-line"><span /></div>
        <div className="feature-grid">
          {features.map(([title, copy, mark]) => (
            <article key={title}>
              <div className="feature-icon">{mark}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="modules-section" id="modules">
        <div className="section-header">
          <p>Modules</p>
          <h2>Powerful hotel billing modules that align with every department.</h2>
        </div>
        <div className="module-grid">
          {modules.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-section" id="benefits">
        {benefits.map(([title, copy, mark]) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-icon">{mark}</div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="contact-section" id="contact">
        <div className="section-header">
          <p>Contact Us</p>
          <h2>Let us help you transform billing operations across your hotel portfolio.</h2>
        </div>
        <div className="contact-grid">
          <div>
            <h3>Get in touch</h3>
            <p>Reach out to our team to schedule a demo, request a proposal, or learn more about EUTELIA.</p>
          </div>
          <div className="contact-details">
            <p><strong>Email:</strong> contact@euteliahotel.com</p>
            <p><strong>Phone:</strong> +1 (800) 123-4567</p>
            <p><strong>Office:</strong> 123 Luxury Ave, Hospitality City</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

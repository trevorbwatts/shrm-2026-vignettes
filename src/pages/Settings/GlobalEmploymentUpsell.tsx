import { useState } from 'react';
import { Section, Button, Headline, BodyText, IconV2 } from '@bamboohr/fabric';
import './GlobalEmploymentUpsell.css';

const imgVideoPlayButton = 'https://www.figma.com/api/mcp/asset/acb43ce0-f52e-45da-833f-87387abc57d3';
const imgProductPreview = 'https://www.figma.com/api/mcp/asset/e4c5702f-d4f8-4c00-81a5-e91815440d55';
const imgAvatar0 = 'https://www.figma.com/api/mcp/asset/bfa88241-95c1-4af3-91f1-9e8488548a33';
const imgAvatar1 = 'https://www.figma.com/api/mcp/asset/f6461aea-6722-42ed-9622-13e3c39dc41a';
const imgAvatar2 = 'https://www.figma.com/api/mcp/asset/21a7d41b-0a01-4611-8425-d8b53154dc23';
const imgAvatar3 = 'https://www.figma.com/api/mcp/asset/3973537b-da55-4456-986f-540f509121dc';

const features = [
  { icon: 'toolbox-regular', label: 'One Tool For Global Employment' },
  { icon: 'circle-dollar-regular', label: 'Payroll Management' },
  { icon: 'user-plus-regular', label: 'Hire & Onboard Global Employees' },
  { icon: 'shield-check-regular', label: 'International Compliance' },
];

const benefitEmployees = [
  { name: 'Juan Ruiz', salary: '$45,000', avatar: imgAvatar0 },
  { name: 'Sam Koch', salary: '$45,000', avatar: imgAvatar1 },
  { name: 'Eva Costa', salary: '$45,000', avatar: imgAvatar2 },
  { name: 'Emil Sara', salary: '$45,000', avatar: imgAvatar3 },
];

export function GlobalEmploymentUpsell() {
  const [expandedFeature, setExpandedFeature] = useState(0);

  return (
    <Section>
      <Section.Header
        title="Global Employment"
        icon="earth-americas-solid"
        actions={[
          <Button
            key="demo"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<IconV2 name="calendar-regular" size={14} />}
          >
            Schedule a Demo
          </Button>,
        ]}
      />

      <div className="ge-upsell-content">

        {/* Hero */}
        <div className="ge-upsell-hero">
          <Headline size="medium" component="h2">
            Hire anywhere with Employer of Record
          </Headline>
          <BodyText size="medium" color="neutral-weak">
            Powered by Remote, EOR handles compliance, payroll, and benefits administration around the globe, so you can focus on growing your global business.
          </BodyText>
          <div className="ge-upsell-video">
            <img
              src={imgVideoPlayButton}
              alt="Watch how Global Employment works"
              className="ge-upsell-video-img"
            />
          </div>
        </div>

        {/* Features */}
        <div className="ge-upsell-features">
          <div className="ge-upsell-features-left">
            <Headline size="small" component="h3">
              What you get with Employer of Record
            </Headline>
            <BodyText size="small" color="neutral-weak">
              Onboard international hires in minutes, not weeks. Employer of Record services help you grow your global team with confidence.
            </BodyText>
            <div className="ge-upsell-feature-list">
              {features.map((f, i) => (
                <button
                  key={i}
                  className={`ge-upsell-feature-item ${expandedFeature === i ? 'ge-upsell-feature-item--active' : ''}`}
                  onClick={() => setExpandedFeature(i)}
                >
                  <IconV2
                    name={f.icon as Parameters<typeof IconV2>[0]['name']}
                    size={16}
                    color={expandedFeature === i ? 'primary-strong' : 'neutral-weak'}
                  />
                  <BodyText
                    size="medium"
                    weight={expandedFeature === i ? 'semibold' : 'regular'}
                    color={expandedFeature === i ? 'primary' : 'neutral-strong'}
                  >
                    {f.label}
                  </BodyText>
                  <span className="ge-feature-caret">
                    <IconV2
                      name={expandedFeature === i ? 'angle-down-regular' : 'angle-right-regular'}
                      size={12}
                      color="neutral-weak"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="ge-upsell-features-right">
            <img
              src={imgProductPreview}
              alt="Global Employment product preview"
              className="ge-upsell-preview-img"
            />
          </div>
        </div>

        <div className="ge-upsell-cta-center">
          <Button size="medium" variant="contained" color="primary">
            Get Started
          </Button>
        </div>

        {/* Calculator + Growth */}
        <div className="ge-upsell-bottom-row">
          <div className="ge-upsell-calculator-card">
            <div className="ge-calc-header">
              <IconV2 name="calculator-regular" size={16} color="primary-strong" />
              <BodyText size="medium" weight="semibold" color="primary">
                Add an estimate
              </BodyText>
            </div>
            <BodyText size="small" color="neutral-weak">
              Enter relevant details for your role below to calculate the total cost of employment for the selected country.
            </BodyText>
            <div className="ge-calc-field">
              <label className="ge-calc-label">
                <BodyText size="extra-small" color="neutral-weak">Select Employee Country</BodyText>
              </label>
              <div className="ge-calc-select-placeholder">
                <BodyText size="small" color="neutral-weak">Select a country...</BodyText>
                <IconV2 name="angle-down-regular" size={12} color="neutral-weak" />
              </div>
            </div>
            <div className="ge-calc-field">
              <label className="ge-calc-label">
                <BodyText size="extra-small" color="neutral-weak">Gross Annual Salary</BodyText>
              </label>
              <div className="ge-calc-input-placeholder">
                <BodyText size="small" color="neutral-weak">$0</BodyText>
              </div>
            </div>
            <BodyText size="extra-small" color="neutral-weak">
              Want more details?{' '}
              <span className="ge-calc-link">Find out your Full Cost Breakdown</span>
            </BodyText>
            <Button size="small" variant="contained" color="primary">
              Calculate
            </Button>
          </div>

          <div className="ge-upsell-growth">
            <BodyText size="extra-small" weight="semibold" color="neutral-weak">
              START ANYWHERE, GROW EVERYWHERE
            </BodyText>
            <Headline size="small" component="h3">
              Plan Your Global Growth
            </Headline>
            <BodyText size="small" color="neutral-weak">
              Curious about hiring costs? Compare salaries, taxes, and fees across countries before making your next hire.
            </BodyText>
          </div>
        </div>

        {/* Benefits */}
        <div className="ge-upsell-benefits">
          <div className="ge-upsell-benefits-left">
            <BodyText size="extra-small" weight="semibold" color="neutral-weak">
              COMPREHENSIVE PLANS
            </BodyText>
            <Headline size="small" component="h3">
              Competitive Benefits, No Guesswork
            </Headline>
            <BodyText size="small" color="neutral-weak">
              Give your global team the perks they deserve. From healthcare to paid leave, see what Employer of Record offers by country.
            </BodyText>
          </div>
          <div className="ge-upsell-benefits-card">
            <div className="ge-benefits-card-header">
              <IconV2 name="earth-americas-solid" size={16} color="primary-strong" />
              <BodyText size="medium" weight="semibold" color="primary">
                Global Employment
              </BodyText>
              <Button size="small" variant="outlined" color="primary">New Hire</Button>
            </div>
            <div className="ge-benefits-employees">
              {benefitEmployees.map((emp, i) => (
                <div key={i} className="ge-benefits-row">
                  <img src={emp.avatar} alt={emp.name} className="ge-benefits-avatar" />
                  <BodyText size="small">{emp.name}</BodyText>
                  <BodyText size="small" color="neutral-weak">{emp.salary}</BodyText>
                  <div className="ge-benefits-icons">
                    <IconV2 name="heart-regular" size={14} color="success-strong" />
                    <IconV2 name="tooth-regular" size={14} color="info-strong" />
                    <IconV2 name="eye-regular" size={14} color="primary-strong" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ge-upsell-footer">
          <Headline size="small" component="h3">
            One Platform, Endless Possibilities
          </Headline>
          <BodyText size="medium" color="neutral-weak">
            Hiring globally doesn't have to be complicated. With Remote and BambooHR, you get a seamless experience — from job posting to payroll.
          </BodyText>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            startIcon={<IconV2 name="calendar-regular" size={16} />}
          >
            Schedule a Demo
          </Button>
        </div>

      </div>
    </Section>
  );
}

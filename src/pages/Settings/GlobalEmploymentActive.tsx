import { Section, Button, Pill, PillType, IconV2, BodyText, Headline, TextButton } from '@bamboohr/fabric';
import './GlobalEmploymentActive.css';

const employees = [
  { id: 1, name: 'Charlotte Abbott', jobTitle: 'Intern Backend (Java)', location: 'Colombia', flag: '🇨🇴', status: 'Draft Created', pillType: PillType.Info },
  { id: 2, name: 'Ashley Adams', jobTitle: 'Financial Analyst', location: 'Canada', flag: '🇨🇦', status: 'Draft Created', pillType: PillType.Info },
  { id: 3, name: 'Maja Andev', jobTitle: 'PR Marketing', location: 'Canada', flag: '🇨🇦', status: 'Onboarding Pending', pillType: PillType.Warning },
  { id: 4, name: 'Cheryl Barnet', jobTitle: 'Content Writer', location: 'Canada', flag: '🇨🇦', status: 'Active', pillType: PillType.Success },
  { id: 5, name: 'Dorothy Chou', jobTitle: 'Supply Chain Manager', location: 'United Kingdom', flag: '🇬🇧', status: 'Active', pillType: PillType.Success },
  { id: 6, name: 'Charlotte Abbott', jobTitle: 'Network Administrator', location: 'Canada', flag: '🇨🇦', status: 'Active', pillType: PillType.Success },
  { id: 7, name: 'Ashley Adams', jobTitle: 'Systems Analyst', location: 'Canada', flag: '🇨🇦', status: 'Reserve Payment Required', pillType: PillType.Warning },
  { id: 8, name: 'Maja Andev', jobTitle: 'Financial Advisor', location: 'Argentina', flag: '🇦🇷', status: 'Active', pillType: PillType.Success },
  { id: 9, name: 'Cheryl Barnet', jobTitle: 'Business Development Executive', location: 'Brazil', flag: '🇧🇷', status: 'Offboarding Pending', pillType: PillType.Warning },
  { id: 10, name: 'Dorothy Chou', jobTitle: 'Data Analyst', location: 'Sweden', flag: '🇸🇪', status: 'Contract Amendment Pending', pillType: PillType.Warning },
];

export function GlobalEmploymentActive() {
  return (
    <Section>
      <Section.Header
        title="Global Employment"
        icon="earth-americas-solid"
        actions={[
          <Button
            key="my-remote"
            size="small"
            variant="contained"
            color="primary"
            startIcon={<IconV2 name="arrow-up-right-from-square-regular" size={14} />}
          >
            My Remote
          </Button>,
        ]}
      />

      <div className="ge-active-content">
        <div className="ge-active-subheader">
          <Headline size="small" component="h4" color="primary">
            Hired by Remote (10)
          </Headline>
          <div className="ge-active-actions">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<IconV2 name="circle-plus-regular" size={14} />}
            >
              New Global Hire
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={<IconV2 name="calculator-regular" size={14} />}
            >
              Cost Calculator
            </Button>
            <TextButton size="small">
              Country Guide
            </TextButton>
          </div>
        </div>

        <table className="ge-active-table">
          <thead>
            <tr>
              <th>
                <span className="ge-th-content">
                  Employee Name
                  <IconV2 name="arrow-up-regular" size={12} color="neutral-weak" />
                </span>
              </th>
              <th>Job Title</th>
              <th>Location</th>
              <th>EOR Contract Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <TextButton size="small">{emp.name}</TextButton>
                </td>
                <td>
                  <BodyText size="small">{emp.jobTitle}</BodyText>
                </td>
                <td>
                  <div className="ge-location-cell">
                    <span className="ge-flag" aria-hidden="true">{emp.flag}</span>
                    <BodyText size="small">{emp.location}</BodyText>
                  </div>
                </td>
                <td>
                  <Pill muted type={emp.pillType}>{emp.status}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

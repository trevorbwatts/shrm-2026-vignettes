import { useState } from 'react';
import {
  Headline,
  BodyText,
  Button,
  IconButton,
  IconV2,
  TextButton,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Gridlet,
  Pill,
  PillType,
} from '@bamboohr/fabric';
import './PersonalDashboardRow.css';

const timeEntries = [
  { start: '5:00 AM', end: '8:45 AM', duration: '3h 45m' },
  { start: '9:00 AM', end: '11:00 AM', duration: '2h 00m' },
  { start: '12:00 PM', end: '5:00 PM', duration: '4h 00m' },
];

const communityPosts = [
  { id: 1, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Photos from my hike this morning!', badge: null, avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 2, author: 'James Taggart', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Look at my cute puppies!', badge: null, avatar: 'https://i.pravatar.cc/40?img=15' },
  { id: 4, author: 'Dorothy Chou', group: 'Product Design', date: 'Jan 15', title: 'Doritos are better than Cheetos. Discuss.', badge: null, avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 5, author: 'Dorothy Chou', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Quarterly Sales Update', badge: 'announcement', avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 6, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: "LET'S GOOOOOO!!!!", badge: 'required', avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 7, author: 'James Taggart', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Did you guys see that meteor shower last night?', badge: null, avatar: 'https://i.pravatar.cc/40?img=15' },
  { id: 8, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Photos from my hike this morning!', badge: null, avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 9, author: 'Dorothy Chou', group: 'Quarterly Sales Updates', date: 'Jan 15', title: "Here's a sweet video about ux design at the MOMA!", badge: null, avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 10, author: 'Marcus Webb', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Quarterly Sales Update', badge: null, avatar: 'https://i.pravatar.cc/40?img=33' },
  { id: 11, author: 'Sam Pandev', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Sam Pandev requested Thursday, Dec 27 off - 40 Hours of Vacation', badge: null, avatar: 'https://i.pravatar.cc/40?img=51' },
  { id: 12, author: 'Lucy Chen', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Look at my cute puppies!', badge: null, avatar: 'https://i.pravatar.cc/40?img=47' },
];

const whatsHappeningItems = [
  {
    id: 1,
    iconName: 'compass-regular',
    iconShape: 'circle' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a moment to complete your Employee Assessments.',
    subtitle: "Complete the assessments on the Performance tab on each employee's profile.",
    warningText: 'Please complete by Oct 16 (169 days ago).',
    isPastDue: true,
    actionLabel: 'Complete Assessment',
  },
  {
    id: 2,
    iconName: 'people-group-regular',
    iconShape: 'circle' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a moment to select people to give feedback about your team members.',
    subtitle: 'Requests for feedback must be sent before Apr 20 (17 days).',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Give Feedback',
  },
  {
    id: 3,
    iconName: 'address-card-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a few minutes to complete your Self Assessment.',
    subtitle: 'Please complete your assessment by Apr 22 (19 days).',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Complete Assessment',
  },
  {
    id: 4,
    iconName: 'file-pen-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: 'W-4 (2024)',
    title: ' is waiting for your signature!',
    subtitle: '6 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Sign Document',
  },
  {
    id: 5,
    iconName: 'circle-user-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Olivia Sterling made a request: Compensation request for Ashley Adams.',
    subtitle: '7 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Review Request',
  },
];

type FeedTab = 'community' | 'happening';

export function PersonalDashboardRow() {
  const [feedTab, setFeedTab] = useState<FeedTab>('community');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="pdr-dashboard">
      {/* Left column: My Time, Time Off, My Stuff */}
      <div className="pdr-left-col">

        {/* My Time */}
        <Gridlet header={<Gridlet.Header title="My Time" icon="clock-regular" />}>
          <Gridlet.Body>
            <div className="pdr-widget-body">
              <div className="pdr-time-display">
                <Headline size="medium" color="neutral-strong">4h 32m Today</Headline>
                <BodyText size="small" color="neutral-weak">Clocked in today at 8:02am</BodyText>
              </div>
              <div className="pdr-clock-in-btn">
                <Button variant="contained" color="primary" size="large" startIcon={<IconV2 name="clock-regular" size={16} color="neutral-inverted" />}>
                  Clock In
                </Button>
              </div>
              <div className="pdr-time-entries">
                <BodyText size="small" weight="semibold" color="neutral-strong">Today – 7h 45m</BodyText>
                <div className="pdr-time-entry-list">
                  {timeEntries.map((entry, i) => (
                    <BodyText key={i} size="small" color="neutral-medium">
                      {entry.start} – {entry.end} → {entry.duration}
                    </BodyText>
                  ))}
                </div>
                <TextButton color="primary" size="small">+ Time Entry</TextButton>
              </div>
              <Divider />
              <div className="pdr-week-summary">
                <div className="pdr-week-stats">
                  <div className="pdr-week-stat">
                    <BodyText size="extra-small" color="neutral-weak">This Week</BodyText>
                    <BodyText size="medium" weight="semibold" color="neutral-strong">35h 48m</BodyText>
                  </div>
                  <div className="pdr-week-stat">
                    <BodyText size="extra-small" color="neutral-weak">This Pay Period</BodyText>
                    <BodyText size="medium" weight="semibold" color="neutral-strong">35h 48m</BodyText>
                  </div>
                </div>
                <Button variant="outlined" color="secondary" size="small">My Timesheet</Button>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Time Off */}
        <Gridlet header={<Gridlet.Header title="Time Off" icon="calendar-regular" />}>
          <Gridlet.Body>
            <div className="pdr-widget-body">
              <div className="pdr-timeoff-balances">
                <div className="pdr-timeoff-balance">
                  <BodyText size="small" weight="semibold" color="neutral-strong">Vacation</BodyText>
                  <div className="pdr-timeoff-amount">
                    <IconV2 name="umbrella-beach-solid" size={24} color="primary-strong" />
                    <Headline size="medium" color="primary">132.2</Headline>
                  </div>
                  <BodyText size="small" color="primary">hours available</BodyText>
                  <BodyText size="extra-small" color="neutral-weak">8 hours scheduled</BodyText>
                </div>
                <div className="pdr-timeoff-balance">
                  <BodyText size="small" weight="semibold" color="neutral-strong">Sick Leave</BodyText>
                  <div className="pdr-timeoff-amount">
                    <IconV2 name="kit-medical-solid" size={24} color="primary-strong" />
                    <Headline size="medium" color="primary">8</Headline>
                  </div>
                  <BodyText size="small" color="primary">hours available</BodyText>
                  <BodyText size="extra-small" color="neutral-weak">8 hours scheduled</BodyText>
                </div>
              </div>
              <div className="pdr-timeoff-actions">
                <Button variant="outlined" color="secondary" startIcon={<IconV2 name="calendar-regular" size={16} />}>
                  Request Time Off
                </Button>
                <IconButton icon="calendar-lines-regular" variant="outlined" color="secondary" aria-label="View calendar" />
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* My Stuff */}
        <Gridlet header={<Gridlet.Header title="My Stuff" icon="box-open-regular" />}>
          <Gridlet.Body>
            <div className="pdr-widget-body pdr-widget-body--no-pad">
              <div className="pdr-stuff-item">
                <div className="pdr-stuff-icon">
                  <IconV2 name="bullseye-arrow-solid" size={20} color="primary-strong" />
                </div>
                <div className="pdr-stuff-text">
                  <BodyText size="medium" weight="semibold" color="neutral-strong">Goals</BodyText>
                  <BodyText size="small" color="neutral-weak">5 goals, soonest is due Sep 2 (13 days).</BodyText>
                </div>
              </div>
              <Divider />
              <div className="pdr-stuff-item">
                <div className="pdr-stuff-icon">
                  <IconV2 name="graduation-cap-solid" size={20} color="primary-strong" />
                </div>
                <div className="pdr-stuff-text">
                  <BodyText size="medium" weight="semibold" color="neutral-strong">Training</BodyText>
                  <BodyText size="small" color="warning-strong">1 training past due, 3 about to expire.</BodyText>
                </div>
              </div>
              <Divider />
              <div className="pdr-stuff-item">
                <div className="pdr-stuff-icon">
                  <IconV2 name="heart-pulse-solid" size={20} color="primary-strong" />
                </div>
                <div className="pdr-stuff-text">
                  <BodyText size="medium" weight="semibold" color="neutral-strong">Benefits</BodyText>
                  <BodyText size="small" color="neutral-weak">You are enrolled in 4 benefit plans.</BodyText>
                </div>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>
      </div>

      {/* Right column: Community Feed */}
      <div className="pdr-right-col">
        <Gridlet>
          <Gridlet.Body>
            <div className="pdr-feed-widget">
              <div className="pdr-feed-tabs">
                <Tabs value={feedTab} onChange={(value) => setFeedTab(value as FeedTab)}>
                  <Tab
                    value="community"
                    label={
                      <span className="pdr-tab-label">
                        <IconV2 name="award-solid" size={12} color={feedTab === 'community' ? 'primary-strong' : 'neutral-medium'} />
                        Employee Community
                      </span>
                    }
                  />
                  <Tab
                    value="happening"
                    label={
                      <span className="pdr-tab-label">
                        <IconV2 name="bullhorn-solid" size={12} color={feedTab === 'happening' ? 'primary-strong' : 'neutral-medium'} />
                        What's Happening
                      </span>
                    }
                  />
                </Tabs>
              </div>

              {feedTab === 'community' && (
                <div className="pdr-feed-content">
                  <div className="pdr-feed-toolbar">
                    <div className="pdr-feed-toolbar-left">
                      <Button variant="outlined" color="secondary" size="small" startIcon={<IconV2 name="pen-to-square-regular" size={12} />}>
                        New Post
                      </Button>
                      <Button variant="outlined" color="secondary" size="small" endIcon={<IconV2 name="chevron-down-solid" size={12} />}>
                        Personal Feed
                      </Button>
                    </div>
                    <TextButton color="primary" size="small">Visit Employee Community</TextButton>
                  </div>
                  <div className="pdr-post-list">
                    {communityPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`pdr-post-item ${hoveredPost === post.id ? 'pdr-post-item--hovered' : ''}`}
                        onMouseEnter={() => setHoveredPost(post.id)}
                        onMouseLeave={() => setHoveredPost(null)}
                      >
                        <Avatar src={post.avatar} size={40} />
                        <div className="pdr-post-content">
                          <BodyText size="medium" weight="semibold" color="neutral-strong">{post.title}</BodyText>
                          <div className="pdr-post-meta">
                            {post.badge === 'announcement' && (
                              <span className="pdr-post-badge">
                                <IconV2 name="bullhorn-solid" size={12} color="primary-strong" />
                                <BodyText size="extra-small" color="primary">Announcement!</BodyText>
                              </span>
                            )}
                            {post.badge === 'required' && (
                              <span className="pdr-post-badge">
                                <IconV2 name="circle-check-solid" size={12} color="primary-strong" />
                                <BodyText size="extra-small" color="primary">Required Reading</BodyText>
                              </span>
                            )}
                            <BodyText size="small" color="neutral-weak">
                              {post.author} to {post.group} on {post.date}
                            </BodyText>
                          </div>
                        </div>
                        {hoveredPost === post.id && (
                          <div className="pdr-post-hover-actions">
                            <IconButton icon="heart-regular" variant="outlined" color="secondary" aria-label="Like post" />
                            <Button variant="outlined" color="secondary" size="small">View Post</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {feedTab === 'happening' && (
                <div className="pdr-feed-content">
                  <div className="pdr-post-list">
                    {whatsHappeningItems.map((item) => (
                      <div
                        key={item.id}
                        className={`pdr-post-item ${hoveredItem === item.id ? 'pdr-post-item--hovered' : ''}`}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.avatar ? (
                          <Avatar src={item.avatar} size={40} />
                        ) : (
                          <div className={`pdr-happening-icon pdr-happening-icon--${item.iconShape}`}>
                            <IconV2 name={item.iconName as string} size={20} color="neutral-medium" />
                          </div>
                        )}

                        <div className="pdr-post-content">
                          <BodyText size="medium" weight="semibold" color="neutral-strong">
                            {item.boldPrefix && <strong>{item.boldPrefix}</strong>}{item.title}
                          </BodyText>
                          <div className="pdr-happening-subtitle">
                            <BodyText size="small" color="neutral-weak">{item.subtitle}</BodyText>
                            {item.warningText && (
                              <span className="pdr-happening-warning">
                                <BodyText size="small" color="warning-strong">{item.warningText}</BodyText>
                                {item.isPastDue && (
                                  <Pill muted type={PillType.Warning}>PAST DUE</Pill>
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {hoveredItem === item.id && (
                          <div className="pdr-post-hover-actions">
                            <Button variant="outlined" color="secondary" size="small">
                              {item.actionLabel}
                            </Button>
                            <IconButton
                              icon="xmark-regular"
                              variant="outlined"
                              color="secondary"
                              aria-label="Dismiss"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Gridlet.Body>
        </Gridlet>
      </div>
    </div>
  );
}

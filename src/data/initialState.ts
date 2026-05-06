export interface Asset {
  id: string;
  name: string;
  category: 'Network' | 'Cloud' | 'Application' | 'Infrastructure';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  monitoringTool: string;
  status: 'Healthy' | 'Degraded' | 'Critical' | 'Unmonitored';
  notes: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  team: 'NOC' | 'Infrastructure' | 'Cloud' | 'Security' | 'Service Delivery' | 'Vendors' | 'Leadership';
  sentiment: 'Champion' | 'Supportive' | 'Neutral' | 'Skeptical' | 'Resistant';
  alignment: number; // 0 - 100
  lastInteraction: string;
  notes: string;
}

export interface QuickWin {
  id: string;
  title: string;
  description: string;
  category: 'Alert Noise' | 'Dashboarding' | 'Automation' | 'Routing' | 'Tool Consolidation';
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  status: 'Identified' | 'In Progress' | 'Completed';
  metricImproved: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  owner: string;
  progress: number;
}

export interface AutomationWorkflow {
  id: string;
  trigger: string;
  conditions: string[];
  actions: string[];
  status: 'Active' | 'Draft' | 'Testing';
  executions: number;
  avgTimeSavedMin: number;
}

export interface GovernanceReview {
  id: string;
  meeting: string;
  cadence: string;
  owner: string;
  stakeholders: string[];
  lastReviewDate: string;
  status: 'Active' | 'Planned';
}

export const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Core Payment Gateway API',
    category: 'Application',
    criticality: 'Critical',
    monitoringTool: 'Dynatrace',
    status: 'Healthy',
    notes: 'Primary transaction path. High alert volume during peak hours.'
  },
  {
    id: '2',
    name: 'AWS EKS Production Cluster',
    category: 'Cloud',
    criticality: 'Critical',
    monitoringTool: 'CloudWatch / Dynatrace',
    status: 'Degraded',
    notes: 'Microservices orchestration. High memory usage warning on node group 3.'
  },
  {
    id: '3',
    name: 'Global WAN Cisco SD-WAN',
    category: 'Network',
    criticality: 'High',
    monitoringTool: 'SolarWinds (Legacy)',
    status: 'Healthy',
    notes: 'Connecting 12 regional offices. Frequent alert flapping due to threshold tuning gaps.'
  },
  {
    id: '4',
    name: 'Customer CRM Database (PostgreSQL)',
    category: 'Infrastructure',
    criticality: 'Critical',
    monitoringTool: 'Splunk DB Connect',
    status: 'Healthy',
    notes: 'Database cluster. Backups run daily at midnight. Temporary CPU spikes occur.'
  },
  {
    id: '5',
    name: 'Legacy LDAP Active Directory',
    category: 'Infrastructure',
    criticality: 'High',
    monitoringTool: 'Unmonitored',
    status: 'Unmonitored',
    notes: 'Identity provider. High operational blind spot. Needs integration into Splunk.'
  },
  {
    id: '6',
    name: 'Azure Data Lake Storage',
    category: 'Cloud',
    criticality: 'Medium',
    monitoringTool: 'Azure Monitor',
    status: 'Healthy',
    notes: 'Bi-weekly data warehouse ingestion pipelines. High latency alerts are normal.'
  }
];

export const initialStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'NOC Manager',
    team: 'NOC',
    sentiment: 'Skeptical',
    alignment: 45,
    lastInteraction: '2026-03-02',
    notes: 'Concerned AIOps will create more noise initially. Prefers simple playbook guides.'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Lead Cloud Architect',
    team: 'Cloud',
    sentiment: 'Champion',
    alignment: 90,
    lastInteraction: '2026-03-05',
    notes: 'Very excited about Kubernetes self-healing and Splunk-Dynatrace correlation.'
  },
  {
    id: '3',
    name: 'Diana Ramirez',
    role: 'VP of Infrastructure',
    team: 'Leadership',
    sentiment: 'Supportive',
    alignment: 80,
    lastInteraction: '2026-03-04',
    notes: 'Wants to see tangible MTTR reduction in 60 days to justify tool consolidation budget.'
  },
  {
    id: '4',
    name: 'Arthur Pendelton',
    role: 'Director of Service Delivery',
    team: 'Service Delivery',
    sentiment: 'Neutral',
    alignment: 60,
    lastInteraction: '2026-03-01',
    notes: 'Interested in SLA adherence improvements. Needs solid dashboard for customer reports.'
  },
  {
    id: '5',
    name: 'Elena Rostova',
    role: 'SecOps Lead',
    team: 'Security',
    sentiment: 'Neutral',
    alignment: 70,
    lastInteraction: '2026-03-03',
    notes: 'Wants to ensure automation self-healing steps do not bypass security compliance audits.'
  }
];

export const initialQuickWins: QuickWin[] = [
  {
    id: 'qw-1',
    title: 'Mute Cisco SD-WAN Flapping Alerts',
    description: 'Tune thresholds from 5 seconds to 30 seconds for non-critical WAN connections. Eliminates alert fatigue.',
    category: 'Alert Noise',
    effort: 'Low',
    impact: 'High',
    status: 'Completed',
    metricImproved: 'Reduces alert noise by 24%'
  },
  {
    id: 'qw-2',
    title: 'Consolidate SolarWinds into Splunk',
    description: 'Forward SolarWinds network syslog data into Splunk to view side-by-side with application logs.',
    category: 'Tool Consolidation',
    effort: 'Medium',
    impact: 'High',
    status: 'In Progress',
    metricImproved: 'Eliminates 1 duplicate console, decreases MTTR'
  },
  {
    id: 'qw-3',
    title: 'Build Critical E-Commerce Service Map',
    description: 'Use Dynatrace Smartscape to define the frontend-to-database service mapping for the payment API.',
    category: 'Dashboarding',
    effort: 'Low',
    impact: 'High',
    status: 'Completed',
    metricImproved: 'Provides 100% dependency visibility, speeds up root-cause'
  },
  {
    id: 'qw-4',
    title: 'Automate Kubernetes Disk Space Expansion',
    description: 'Trigger a webhook to expand AWS EBS volumes automatically when disk usage exceeds 90% (with logs).',
    category: 'Automation',
    effort: 'Medium',
    impact: 'Medium',
    status: 'In Progress',
    metricImproved: 'Eliminates 12 manual Sev-3 tickets per month'
  },
  {
    id: 'qw-5',
    title: 'Standardize SLA Alert Routing to MS Teams',
    description: 'Route Dynatrace severity alerts directly into dedicated team channel instead of bulk email distribution lists.',
    category: 'Routing',
    effort: 'Low',
    impact: 'Medium',
    status: 'Completed',
    metricImproved: 'Reduces incident confirmation/MTTD by 15 minutes'
  }
];

export const initialWorkflows: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    trigger: 'Dynatrace CPU Alert (>92%)',
    conditions: ['Environment is Production', 'Service name contains "PaymentAPI"'],
    actions: ['Fetch JVM thread dump via API', 'Enrich incident ticket with logs', 'Notify NOC via MS Teams'],
    status: 'Active',
    executions: 142,
    avgTimeSavedMin: 18
  },
  {
    id: 'wf-2',
    trigger: 'Kubernetes CrashLoopBackOff',
    conditions: ['Namespace is CoreServices', 'Restart count > 3'],
    actions: ['Capture logs of previous container', 'Initiate graceful deployment rollout', 'Escalate to Cloud team if failing'],
    status: 'Active',
    executions: 58,
    avgTimeSavedMin: 25
  },
  {
    id: 'wf-3',
    trigger: 'Splunk Disk Space Exhaustion Alert',
    conditions: ['Mount point contains "/var/log"', 'Server role is WebServer'],
    actions: ['Trigger log rotation script', 'Purge temp cache directories', 'Verify disk health status'],
    status: 'Draft',
    executions: 0,
    avgTimeSavedMin: 15
  }
];

export const initialGovernance: GovernanceReview[] = [
  {
    id: 'gov-1',
    meeting: 'Weekly Operational SLA Alignment',
    cadence: 'Every Monday 10:00 AM',
    owner: 'AIOps Transformation Lead (You)',
    stakeholders: ['Sarah Jenkins (NOC)', 'Arthur Pendelton (Service Delivery)'],
    lastReviewDate: '2026-03-02',
    status: 'Active'
  },
  {
    id: 'gov-2',
    meeting: 'AIOps Executive Steering Committee',
    cadence: 'Monthly (Day 30 / Day 60 / Day 90)',
    owner: 'AIOps Transformation Lead (You)',
    stakeholders: ['Diana Ramirez (VP of Infrastructure)', 'Marcus Chen (Cloud Architect)'],
    lastReviewDate: '2026-02-28',
    status: 'Active'
  },
  {
    id: 'gov-3',
    meeting: 'Root Cause Analysis (RCA) Standardization Session',
    cadence: 'Bi-weekly Thursdays',
    owner: 'Arthur Pendelton (Service Delivery)',
    stakeholders: ['NOC Teams', 'Infrastructure Leads', 'Vendors'],
    lastReviewDate: '2026-03-04',
    status: 'Planned'
  }
];

export const observabilityMaturityScores = {
  Splunk: { score: 3.5, label: 'Advanced Logs, Missing Correlation', color: 'bg-orange-500' },
  Dynatrace: { score: 4.2, label: 'Deep Traces, Missing Legacy Assets', color: 'bg-emerald-500' },
  cloud: { score: 3.0, label: 'Basic CloudWatch, No Multi-cloud view', color: 'bg-amber-500' },
  network: { score: 2.0, label: 'Siloed SolarWinds, Flapping Alerts', color: 'bg-red-500' },
  dashboards: { score: 2.5, label: 'Fragmented, Static Screens', color: 'bg-amber-500' },
  eventCorrelation: { score: 1.5, label: 'No AI Correlation, Manual Triaging', color: 'bg-red-600' }
};

export const initialRoadmap: RoadmapMilestone[] = [
  {
    id: 'rm-1',
    phase: 'Phase 1 (Day 1-30)',
    title: 'Establish Observability Baseline & Quick Wins',
    description: 'Map tooling gaps, assess Splunk/Dynatrace environments, configure high-priority alert suppression, and build initial KPI baseline dashboard.',
    owner: 'AIOps Lead / NOC Teams',
    progress: 100
  },
  {
    id: 'rm-2',
    phase: 'Phase 2 (Day 30-60)',
    title: 'Modernize Dashboards & Launch Early Automation',
    description: 'Implement joint dashboard views in Splunk/Dynatrace, deploy self-healing Kubernetes memory scripts, build automated log enrichment pipelines, and define escalation matrix.',
    owner: 'Cloud Architect / Infra Leads',
    progress: 60
  },
  {
    id: 'rm-3',
    phase: 'Phase 3 (Day 60-90)',
    title: 'Scale AI Correlation & Operations Alignment',
    description: 'Activate Splunk IT Service Intelligence (ITSI) anomaly detection, deploy unified service maps, host steering feedback, align support models, and present executive ROI.',
    owner: 'AIOps Lead / Leadership',
    progress: 25
  },
  {
    id: 'rm-4',
    phase: 'Future (12-24 Months)',
    title: 'Full Autonomous Operation (NoOps Vision)',
    description: 'Enterprise-wide automated incident resolution, self-healing networks, generative AI-driven post-mortems (RCAs), and fully predictive capacity planning.',
    owner: 'AIOps Lead / All Teams',
    progress: 0
  }
];

export const executiveSlides = [
  {
    id: 1,
    title: 'Executive Summary: AIOps Operations Transformation',
    subtitle: 'Driving 90-Day Operational Velocity, Downtime Reduction, and MTTR Optimization',
    bullets: [
      'Successfully captured the initial state of the Network, Cloud, Application, and Infrastructure layers.',
      'Completed Day 30 milestones with significant alert reduction, saving approximately 35+ engineer-hours per week.',
      'Accelerating Days 30-60 early automation workflows and modern dashboards.',
      'Projecting a total 40% reduction in MTTR and 55% reduction in alert noise by Day 90.'
    ],
    chartLabel: 'Projected Cumulative ROI ($)',
    chartData: [
      { name: 'Day 1', value: 0 },
      { name: 'Day 30', value: 45000 },
      { name: 'Day 60', value: 125000 },
      { name: 'Day 90', value: 310000 }
    ],
    callout: 'AIOps is not just a tooling change; it is a cultural and operational alignment of NOC, Cloud, and SRE teams around predictive operations.'
  },
  {
    id: 2,
    title: 'Current State Assessment & High-Priority Tooling Gaps',
    subtitle: 'Fragmented Observability and Noisy Alerts Impair Resolution Speeds',
    bullets: [
      'Network Observability: Siloed legacy tools (SolarWinds) with flapping alerts and lack of application context.',
      'Cloud & Infrastructure: Decent coverage via AWS CloudWatch, but lacks a centralized multi-cloud intelligence plane.',
      'Application Monitoring: Dynatrace is robust but not fully integrated with downstream Splunk correlation.',
      'Incident Correlation: Zero automated correlation. Every alert creates an individual ticket, overwhelming the NOC.'
    ],
    chartLabel: 'Observability Maturity (1-5 Scale)',
    chartData: [
      { name: 'Network Obs', value: 2.0 },
      { name: 'Cloud Obs', value: 3.0 },
      { name: 'App Obs', value: 4.2 },
      { name: 'AI Correlation', value: 1.5 }
    ],
    callout: 'Maturity Gaps: Manual correlation is the primary bottleneck driving up the Mean Time to Resolution (MTTR).'
  },
  {
    id: 3,
    title: 'AIOps 12-24 Month Vision & Modernization Journey',
    subtitle: 'From Reactive Firefighting to Proactive, AI-Driven Autonomous SRE',
    bullets: [
      'Short Term (0-3 Months): Clean up telemetry noise, eliminate static thresholds, establish accurate KPI baselines, and initiate auto-incident ticket enrichments.',
      'Medium Term (3-12 Months): Implement AI-based anomaly detection, cross-tier event correlation, unified service topologies, and automated incident triage playbooks.',
      'Long Term (12-24 Months): Full self-healing infrastructure pipelines, predictive capacity planning, generative AI incident summaries, and NoOps for repeatable tasks.'
    ],
    chartLabel: 'Target Automation Coverage (%)',
    chartData: [
      { name: 'Current', value: 5 },
      { name: 'Day 30', value: 15 },
      { name: 'Day 60', value: 35 },
      { name: 'Day 90', value: 65 },
      { name: '12 Months', value: 90 }
    ],
    callout: 'The goal is to shift the NOC from manual dispatchers to automation supervisors, unlocking massive operational scalability.'
  },
  {
    id: 4,
    title: 'Transformation ROI & Budget Projections',
    subtitle: 'Calculated Cost Savings through Alert Deduplication and Downtime Prevention',
    bullets: [
      'Eliminated Alert Noise: Tuning noisy thresholds reduces Sev-3 alerts by 45%, redirecting engineering hours.',
      'Incident Triage Savings: Auto-enriched tickets with JVM logs saves an average of 18 minutes per critical Sev-1.',
      'Critical Downtime Avoided: Early anomaly alerts and automated EBS expansions prevent high-severity retail outages.',
      'Tooling Consolidation ROI: Moving legacy monitoring tools to Splunk saves $140K in annual license costs.'
    ],
    chartLabel: 'Cost of Incidents vs. Transformation Budget ($k)',
    chartData: [
      { name: 'Legacy Cost', value: 850 },
      { name: 'AIOps Cost', value: 350 },
      { name: 'Savings Realized', value: 500 }
    ],
    callout: 'Total estimated annual savings: $500,000+ with an investment payback period of only 4.5 months.'
  }
];

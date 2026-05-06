import React, { useState, useMemo } from 'react';
import {
  Activity,
  Server,
  Cloud,
  Network as NetworkIcon,
  Settings,
  Users,
  CheckCircle,
  Play,
  Plus,
  RefreshCw,
  Layers,
  TrendingDown,
  Clock,
  Check,
  FileText,
  Presentation,
  Award,
  Sliders,
  Zap,
  UserCheck,
  Building,
  Trash2,
  Cpu,
  ZapOff,
  Brain
} from 'lucide-react';

import {
  initialAssets,
  initialStakeholders,
  initialQuickWins,
  initialWorkflows,
  initialGovernance,
  observabilityMaturityScores,
  initialRoadmap,
  executiveSlides,
  Asset,
  Stakeholder,
  QuickWin,
  AutomationWorkflow
} from './data/initialState';

import {
  aiUseCases,
  aiLayers,
  aiStackComponents,
  getComponentsByUseCase,
  getComponentsByLayer,
  AIUseCaseType,
  AILayer,
  CapturedStack
} from './data/aiStackData';

export default function App() {
  // --- Navigation & Filter State ---
  const [activeTab, setActiveTab] = useState<'kpi' | 'assets' | 'stakeholders' | 'maturity' | 'quickwins' | 'automation' | 'roadmap' | 'executive' | 'aistack'>('kpi');

  // --- Dynamic App States ---
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(initialStakeholders);
  const [quickWins, setQuickWins] = useState<QuickWin[]>(initialQuickWins);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(initialWorkflows);
  
  // --- Editable Configuration States ---
  const [programTitle, setProgramTitle] = useState('AIOps');
  const [programSubtitle, setProgramSubtitle] = useState('Operational Transition Suite');
  const [transformationProgress, setTransformationProgress] = useState(30);
  const [currentDay, setCurrentDay] = useState(30);
  const [totalDays, setTotalDays] = useState(90);
  
  // Editable Phase Configuration
  const [phases, setPhases] = useState([
    { id: 'phase1', name: 'Days 1-30', label: 'Assessment', description: 'Understand environment, baseline KPIs, quick wins', startDay: 1, endDay: 30 },
    { id: 'phase2', name: 'Days 30-60', label: 'Modernization', description: 'Monitoring improvement, automation deployment', startDay: 31, endDay: 60 },
    { id: 'phase3', name: 'Days 60-90', label: 'Optimization', description: 'Self-healing, governance, executive presentation', startDay: 61, endDay: 90 }
  ]);
  
  // Editable Roadmap
  const [roadmap, setRoadmap] = useState(initialRoadmap);
  const [governance, setGovernance] = useState(initialGovernance);
  const [maturityScores, setMaturityScores] = useState(observabilityMaturityScores);
  
  // Edit Mode States
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [editingRoadmapItem, setEditingRoadmapItem] = useState<string | null>(null);
  const [editingGovernanceItem, setEditingGovernanceItem] = useState<string | null>(null);
  const [editingMaturityTool, setEditingMaturityTool] = useState<string | null>(null);
  
  // Editable KPI Targets
  const [kpiTargets, setKpiTargets] = useState({
    mttr: 25,
    mttd: 8,
    sla: 99.9,
    alertReduction: 83,
    recurrence: 4,
    automationCoverage: 65,
    uptime: 99.99
  });
  
  // Editable Phase Deliverables
  const [phaseDeliverables, setPhaseDeliverables] = useState([
    { id: '1', phase: 'phase1', title: 'Environment Asset Discovery', category: 'Assessment', editable: true },
    { id: '2', phase: 'phase1', title: 'Stakeholder Alignment Map', category: 'Assessment', editable: true },
    { id: '3', phase: 'phase1', title: 'KPI Baseline Dashboard', category: 'Assessment', editable: true },
    { id: '4', phase: 'phase1', title: 'Observability Maturity Score', category: 'Assessment', editable: true },
    { id: '5', phase: 'phase1', title: 'Quick Wins Execution', category: 'Assessment', editable: true },
    { id: '6', phase: 'phase2', title: 'Monitoring Modernization', category: 'Modernization', editable: true },
    { id: '7', phase: 'phase2', title: 'Automation Pipelines', category: 'Modernization', editable: true },
    { id: '8', phase: 'phase2', title: 'Alert Fatigue Reduction', category: 'Modernization', editable: true },
    { id: '9', phase: 'phase2', title: 'Governance Framework', category: 'Modernization', editable: true },
    { id: '10', phase: 'phase3', title: 'Self-Healing Workflows', category: 'Optimization', editable: true },
    { id: '11', phase: 'phase3', title: 'Team Alignment', category: 'Optimization', editable: true },
    { id: '12', phase: 'phase3', title: 'Executive Presentation', category: 'Optimization', editable: true }
  ]);
  
  const [editingDeliverable, setEditingDeliverable] = useState<string | null>(null);
  const [newDeliverableTitle, setNewDeliverableTitle] = useState('');
  const [newDeliverablePhase, setNewDeliverablePhase] = useState('phase1');
  const [newDeliverableCategory, setNewDeliverableCategory] = useState('Assessment');
  const [showAddDeliverable, setShowAddDeliverable] = useState(false);

  // --- Assessment Form States ---
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<'Network' | 'Cloud' | 'Application' | 'Infrastructure'>('Application');
  const [newAssetCriticality, setNewAssetCriticality] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('Critical');
  const [newAssetTool, setNewAssetTool] = useState('');
  const [newAssetStatus, setNewAssetStatus] = useState<'Healthy' | 'Degraded' | 'Critical' | 'Unmonitored'>('Healthy');
  const [newAssetNotes, setNewAssetNotes] = useState('');

  // --- Stakeholder Form States ---
  const [newStakeholderName, setNewStakeholderName] = useState('');
  const [newStakeholderRole, setNewStakeholderRole] = useState('');
  const [newStakeholderTeam, setNewStakeholderTeam] = useState<'NOC' | 'Infrastructure' | 'Cloud' | 'Security' | 'Service Delivery' | 'Vendors' | 'Leadership'>('NOC');
  const [newStakeholderSentiment, setNewStakeholderSentiment] = useState<'Champion' | 'Supportive' | 'Neutral' | 'Skeptical' | 'Resistant'>('Neutral');
  const [newStakeholderAlignment, setNewStakeholderAlignment] = useState(50);
  const [newStakeholderNotes, setNewStakeholderNotes] = useState('');

  // --- Workflow Lab Builder States ---
  const [customWorkflowTrigger, setCustomWorkflowTrigger] = useState('Dynatrace Disk Alert');
  const [customWorkflowCondition, setCustomWorkflowCondition] = useState('Service equals PaymentAPI');
  const [customWorkflowAction, setCustomWorkflowAction] = useState('Clear Temp Logs & Restart Container');

  // --- Presentation Slide States ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesData, setSlidesData] = useState(executiveSlides);

  // --- AI Stack Architecture States ---
  const [capturedStacks, setCapturedStacks] = useState<CapturedStack[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<AIUseCaseType>('AIOps');
  const [selectedLayer, setSelectedLayer] = useState<AILayer>('DataEngineering');
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [stackStatus, setStackStatus] = useState<'Current' | 'Target' | 'Evaluating' | 'Deprecated'>('Current');
  const [stackNotes, setStackNotes] = useState('');
  const [stackOwner, setStackOwner] = useState('');
  const [stackCost, setStackCost] = useState('');
  const [stackUtilization, setStackUtilization] = useState('');
  const [aiStackViewMode, setAiStackViewMode] = useState<'byUseCase' | 'byLayer' | 'matrix'>('byUseCase');
  const [editingSlideText, setEditingSlideText] = useState<string | null>(null);

  // --- Quick Wins Integration with Metrics ---
  const activeQuickWinsCount = useMemo(() => {
    return quickWins.filter(qw => qw.status === 'Completed').length;
  }, [quickWins]);

  // --- Dynamic Real-time Metrics Calculation based on State & Progress ---
  const metrics = useMemo(() => {
    // Base Baseline metrics before transformation
    const baselineMTTR = 180; // minutes
    const baselineMTTD = 35; // minutes
    const baselineSLA = 96.5; // %
    const baselineAlertVolume = 48000; // alerts / month
    const baselineRecurrence = 28; // %
    const baselineAutomation = 5; // %
    const baselineUptime = 98.9; // %

    // Impact factor calculated from completed quick wins + timeline progress
    const quickWinReductionPercent = activeQuickWinsCount * 8; // Each completed quick win cuts noise by 8%
    const progressFactor = transformationProgress / 100; // 0.0 to 1.0

    // Compute active metrics
    const mttr = Math.max(22, Math.round(baselineMTTR - (baselineMTTR * 0.55 * progressFactor) - (baselineMTTR * (quickWinReductionPercent / 150))));
    const mttd = Math.max(5, Math.round(baselineMTTD - (baselineMTTD * 0.65 * progressFactor) - (baselineMTTD * (quickWinReductionPercent / 200))));
    const sla = Math.min(99.98, Number((baselineSLA + (3.4 * progressFactor) + (activeQuickWinsCount * 0.15)).toFixed(2)));
    const alertVolume = Math.max(8200, Math.round(baselineAlertVolume - (baselineAlertVolume * 0.45 * progressFactor) - (baselineAlertVolume * (quickWinReductionPercent * 1.2 / 100))));
    const recurrence = Math.max(4, Math.round(baselineRecurrence - (baselineRecurrence * 0.6 * progressFactor) - (activeQuickWinsCount * 1.5)));
    const automationCoverage = Math.min(95, Math.round(baselineAutomation + (60 * progressFactor) + (workflows.filter(w => w.status === 'Active').length * 8)));
    const uptime = Math.min(99.99, Number((baselineUptime + (1.08 * progressFactor)).toFixed(2)));

    // Total estimated hours saved per week
    const hoursSaved = Math.round((progressFactor * 120) + (activeQuickWinsCount * 12));

    return {
      mttr,
      mttd,
      sla,
      alertVolume,
      recurrence,
      automationCoverage,
      uptime,
      hoursSaved
    };
  }, [transformationProgress, activeQuickWinsCount, workflows]);

  // Handlers for adding asset
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: newAssetName,
      category: newAssetCategory,
      criticality: newAssetCriticality,
      monitoringTool: newAssetTool || 'Unmonitored',
      status: newAssetStatus,
      notes: newAssetNotes || 'Newly added in state analysis.'
    };
    setAssets([newAsset, ...assets]);
    setNewAssetName('');
    setNewAssetTool('');
    setNewAssetNotes('');
  };

  // Handler to delete asset
  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  // Handler to toggle asset status
  const toggleAssetStatus = (id: string) => {
    setAssets(assets.map(a => {
      if (a.id === id) {
        const statuses: ('Healthy' | 'Degraded' | 'Critical' | 'Unmonitored')[] = ['Healthy', 'Degraded', 'Critical', 'Unmonitored'];
        const nextIndex = (statuses.indexOf(a.status) + 1) % statuses.length;
        return { ...a, status: statuses[nextIndex] };
      }
      return a;
    }));
  };

  // Handler for adding stakeholder
  const handleAddStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStakeholderName.trim()) return;
    const newS: Stakeholder = {
      id: Date.now().toString(),
      name: newStakeholderName,
      role: newStakeholderRole,
      team: newStakeholderTeam,
      sentiment: newStakeholderSentiment,
      alignment: Number(newStakeholderAlignment),
      lastInteraction: new Date().toISOString().split('T')[0],
      notes: newStakeholderNotes || 'New relationship logged.'
    };
    setStakeholders([...stakeholders, newS]);
    setNewStakeholderName('');
    setNewStakeholderRole('');
    setNewStakeholderNotes('');
  };

  // Handler to adjust stakeholder alignment score
  const updateStakeholderAlignment = (id: string, score: number) => {
    setStakeholders(stakeholders.map(s => s.id === id ? { ...s, alignment: score } : s));
  };

  // Handler to cycle stakeholder sentiment
  const toggleStakeholderSentiment = (id: string) => {
    const sentiments: ('Champion' | 'Supportive' | 'Neutral' | 'Skeptical' | 'Resistant')[] = ['Champion', 'Supportive', 'Neutral', 'Skeptical', 'Resistant'];
    setStakeholders(stakeholders.map(s => {
      if (s.id === id) {
        const idx = sentiments.indexOf(s.sentiment);
        const nextSent = sentiments[(idx + 1) % sentiments.length];
        return { ...s, sentiment: nextSent };
      }
      return s;
    }));
  };

  // Toggle quick win completion
  const toggleQuickWinStatus = (id: string) => {
    setQuickWins(quickWins.map(qw => {
      if (qw.id === id) {
        const nextStatus = qw.status === 'Completed' ? 'Identified' : qw.status === 'In Progress' ? 'Completed' : 'In Progress';
        return { ...qw, status: nextStatus };
      }
      return qw;
    }));
  };

  // Custom tool maturity update
  const handleMaturityChange = (tool: string, value: number) => {
    setMaturityScores(prev => ({
      ...prev,
      [tool]: {
        ...prev[tool as keyof typeof prev],
        score: value
      }
    }));
  };

  // Quick Action: Auto-build recommended Quick Wins
  const handleOptimizeAllQuickWins = () => {
    setQuickWins(quickWins.map(qw => ({ ...qw, status: 'Completed' })));
  };

  // Custom workflow creator
  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    const newWf: AutomationWorkflow = {
      id: 'wf-' + Date.now(),
      trigger: customWorkflowTrigger,
      conditions: [customWorkflowCondition],
      actions: [customWorkflowAction],
      status: 'Active',
      executions: Math.floor(Math.random() * 40) + 10,
      avgTimeSavedMin: Math.floor(Math.random() * 20) + 10
    };
    setWorkflows([newWf, ...workflows]);
    setCustomWorkflowTrigger('Dynatrace Disk Alert');
    setCustomWorkflowCondition('Service equals PaymentAPI');
    setCustomWorkflowAction('Clear Temp Logs & Restart Container');
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(wf => wf.id !== id));
  };

  // Slide deck handlers
  const handleUpdateSlideBullet = (slideId: number, index: number, newValue: string) => {
    setSlidesData(slidesData.map(slide => {
      if (slide.id === slideId) {
        const updatedBullets = [...slide.bullets];
        updatedBullets[index] = newValue;
        return { ...slide, bullets: updatedBullets };
      }
      return slide;
    }));
  };

  // Prepopulate with a mock preset based on the requested phase
  const setPhasePreset = (phaseDay: number) => {
    setTransformationProgress(phaseDay);
    if (phaseDay <= 30) {
      setQuickWins(quickWins.map((qw, idx) => idx % 2 === 0 ? { ...qw, status: 'Completed' } : { ...qw, status: 'In Progress' }));
    } else if (phaseDay <= 60) {
      setQuickWins(quickWins.map(qw => ({ ...qw, status: 'Completed' })));
      // Set all workflows to active
      setWorkflows(workflows.map(wf => ({ ...wf, status: 'Active' })));
    } else {
      setQuickWins(quickWins.map(qw => ({ ...qw, status: 'Completed' })));
      setWorkflows(workflows.map(wf => ({ ...wf, status: 'Active' })));
      // Bump maturity scores
      const updatedMaturity = { ...maturityScores };
      Object.keys(updatedMaturity).forEach((key) => {
        const item = updatedMaturity[key as keyof typeof updatedMaturity];
        item.score = Math.min(5.0, item.score + 1.2);
      });
      setMaturityScores(updatedMaturity);
    }
  };

  // Color helper for health statuses
  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'Healthy': return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'Degraded': return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'Critical': return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
      case 'Unmonitored': return 'bg-slate-500/15 text-slate-400 border border-slate-500/30';
      default: return 'bg-slate-500/15 text-slate-400';
    }
  };

  // Sentiment emoji and background
  const getSentimentBadge = (sentiment: Stakeholder['sentiment']) => {
    switch (sentiment) {
      case 'Champion': return { label: '🌟 Champion', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'Supportive': return { label: '👍 Supportive', color: 'bg-teal-500/20 text-teal-300 border-teal-500/40' };
      case 'Neutral': return { label: '😐 Neutral', color: 'bg-slate-500/20 text-slate-300 border-slate-500/40' };
      case 'Skeptical': return { label: '🤔 Skeptical', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'Resistant': return { label: '🚨 Resistant', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* HEADER SECTION */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/15 animate-pulse">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  className="text-xl font-bold tracking-tight text-white bg-transparent border border-transparent hover:border-slate-700 focus:border-cyan-500 rounded px-1 outline-none w-32"
                />
                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-cyan-500/30">
                  <input
                    type="text"
                    value={programSubtitle}
                    onChange={(e) => setProgramSubtitle(e.target.value)}
                    className="bg-transparent border-none outline-none text-cyan-400 w-32 text-center"
                  />
                </span>
              </div>
              <p className="text-xs text-slate-400">Enterprise AI Operations &amp; Observability Modernization</p>
            </div>
          </div>

          {/* Timeline and Program Day Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">Program Milestone:</span>
            {phases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setPhasePreset(Math.round((phase.startDay + phase.endDay) / 2))}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  transformationProgress >= phase.startDay && transformationProgress <= phase.endDay
                    ? index === 0 ? 'bg-cyan-600 text-white shadow-md' :
                      index === 1 ? 'bg-indigo-600 text-white shadow-md' :
                      'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {phase.name}: {phase.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* QUICK STATUS STRIP */}
      <section className="bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">Current Day:</div>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min="1"
                max="90"
                value={transformationProgress}
                onChange={(e) => setTransformationProgress(Number(e.target.value))}
                className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-sm font-bold font-mono text-cyan-400 w-12 text-center bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
                Day {transformationProgress}
              </span>
            </div>
            <span className="text-xs text-slate-500 hidden lg:inline">
              (Adjust timeline slider to simulate cumulative progress effects)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="text-xs">
              <span className="text-slate-400 mr-1.5 font-medium">Quick Wins Activated:</span>
              <span className="text-emerald-400 font-bold font-mono bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
                {activeQuickWinsCount} / {quickWins.length}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-slate-400 mr-1.5 font-medium">Active Automations:</span>
              <span className="text-indigo-400 font-bold font-mono bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-500/20">
                {workflows.filter(w => w.status === 'Active').length} Live
              </span>
            </div>
            <div className="text-xs">
              <span className="text-slate-400 mr-1.5 font-medium">Est. Weekly Saved:</span>
              <span className="text-yellow-400 font-bold font-mono bg-yellow-950/30 px-2 py-0.5 rounded border border-yellow-500/20">
                {metrics.hoursSaved} Hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC CORE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">MTTR (Res.)</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.mttr} <span className="text-xs text-slate-400 font-normal">m</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-medium">
              <TrendingDown className="w-3 h-3" />
              <span>Down from 180m</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">MTTD (Det.)</span>
              <Activity className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.mttd} <span className="text-xs text-slate-400 font-normal">m</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-medium">
              <TrendingDown className="w-3 h-3" />
              <span>Down from 35m</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm group">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">SLA Adherence</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.sla}%
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
              Target: 
              <input
                type="number"
                step="0.1"
                value={kpiTargets.sla}
                onChange={(e) => setKpiTargets({...kpiTargets, sla: parseFloat(e.target.value) || 0})}
                className="bg-transparent border-b border-emerald-400/30 w-14 text-center focus:outline-none focus:border-emerald-400"
              />%
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">Alert Noise / Mo</span>
              <ZapOff className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.alertVolume.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-medium">
              -{Math.round((1 - metrics.alertVolume / 48000) * 100)}% Alert Fatigue
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">Recurrence</span>
              <RefreshCw className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.recurrence}%
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-medium">
              Repeated Outages
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">Auto-Coverage</span>
              <Settings className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.automationCoverage}%
            </div>
            <div className="text-[10px] text-indigo-400 mt-1 font-medium">
              Self-Healing &amp; Triage
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold">Uptime Target</span>
              <Server className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-white">
              {metrics.uptime}%
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-medium">
              Critical Apps Active
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* NAVIGATION SIDEBAR */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-slate-900 rounded-xl border border-slate-800/80 overflow-hidden sticky top-24">
              <div className="p-4 bg-slate-800/50 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Phase Deliverables</span>
                <p className="text-xs text-slate-500 mt-0.5">Interact with the tabs below to configure and explore the {totalDays}-day plan.</p>
              </div>

              <nav className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab('kpi')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'kpi'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    📊 KPI Dashboard &amp; Simulator
                  </span>
                  <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded uppercase font-bold border border-cyan-500/20">All Days</span>
                </button>

                <button
                  onClick={() => setActiveTab('assets')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'assets'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    🌐 Environment Asset Discovery
                  </span>
                  <span className="text-[9px] bg-slate-850 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold border border-slate-700">{phases[0]?.name || 'Phase 1'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('stakeholders')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'stakeholders'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    👥 Stakeholders Alignment
                  </span>
                  <span className="text-[9px] bg-slate-850 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold border border-slate-700">{phases[0]?.name || 'Phase 1'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('maturity')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'maturity'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    📈 Observability Maturity
                  </span>
                  <span className="text-[9px] bg-slate-850 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold border border-slate-700">{phases[0]?.name || 'Phase 1'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('quickwins')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'quickwins'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    ⚡ Quick Wins Noise Hub
                  </span>
                  <span className="text-[9px] bg-amber-950/40 text-amber-400 px-1.5 py-0.5 rounded uppercase font-bold border border-amber-500/20">Day 30 Win</span>
                </button>

                <button
                  onClick={() => setActiveTab('automation')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'automation'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-pink-400" />
                    ⚙️ Automation Pipeline Lab
                  </span>
                  <span className="text-[9px] bg-indigo-950/40 text-indigo-400 px-1.5 py-0.5 rounded uppercase font-bold border border-indigo-500/20">{phases[1]?.name || 'Phase 2'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'roadmap'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    🗺️ Roadmap &amp; Governance
                  </span>
                  <span className="text-[9px] bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold border border-emerald-500/20">{phases[2]?.name || 'Phase 3'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('executive')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'executive'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-rose-400" />
                    👔 Executive Presenter
                  </span>
                  <span className="text-[9px] bg-rose-950/40 text-rose-400 px-1.5 py-0.5 rounded uppercase font-bold border border-rose-500/20">{phases[2]?.name || 'Final'} Pres</span>
                </button>

                <button
                  onClick={() => setActiveTab('aistack')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'aistack'
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    🧠 AI Stack Architecture
                  </span>
                  <span className="text-[9px] bg-purple-950/40 text-purple-400 px-1.5 py-0.5 rounded uppercase font-bold border border-purple-500/20">ML/MLOps</span>
                </button>
              </nav>

              {/* SIDEBAR TRANSFORMATION GOAL PROGRESS */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Program Target</span>
                  <span className="font-bold text-cyan-400 font-mono">{Math.round((transformationProgress / totalDays) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-600 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.round((transformationProgress / totalDays) * 100))}%` }}
                  />
                </div>
                
                {/* Editable Phase Deliverables */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phase Deliverables</span>
                    <button
                      onClick={() => setShowAddDeliverable(!showAddDeliverable)}
                      className="text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-0.5 rounded"
                    >
                      + Add
                    </button>
                  </div>
                  
                  {showAddDeliverable && (
                    <div className="bg-slate-950 p-2 rounded mb-2 space-y-1">
                      <input
                        type="text"
                        placeholder="Deliverable title"
                        value={newDeliverableTitle}
                        onChange={(e) => setNewDeliverableTitle(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[10px] rounded px-2 py-1"
                      />
                      <select
                        value={newDeliverablePhase}
                        onChange={(e) => setNewDeliverablePhase(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[10px] rounded px-2 py-1"
                      >
                        {phases.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            if (newDeliverableTitle.trim()) {
                              setPhaseDeliverables([...phaseDeliverables, {
                                id: Date.now().toString(),
                                phase: newDeliverablePhase,
                                title: newDeliverableTitle,
                                category: newDeliverableCategory,
                                editable: true
                              }]);
                              setNewDeliverableTitle('');
                              setShowAddDeliverable(false);
                            }
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] py-1 rounded"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddDeliverable(false)}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {phases.map(phase => (
                      <div key={phase.id}>
                        <div className="text-[10px] font-semibold text-cyan-400 uppercase">{phase.name}</div>
                        {phaseDeliverables.filter(d => d.phase === phase.id).map(deliverable => (
                          <div key={deliverable.id} className="flex items-center justify-between group py-0.5">
                            {editingDeliverable === deliverable.id ? (
                              <input
                                type="text"
                                value={deliverable.title}
                                onChange={(e) => setPhaseDeliverables(phaseDeliverables.map(d => d.id === deliverable.id ? {...d, title: e.target.value} : d))}
                                onBlur={() => setEditingDeliverable(null)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingDeliverable(null)}
                                autoFocus
                                className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] rounded px-1 py-0.5"
                              />
                            ) : (
                              <span 
                                className="text-[10px] text-slate-400 flex-1 cursor-pointer hover:text-slate-200"
                                onClick={() => deliverable.editable && setEditingDeliverable(deliverable.id)}
                              >
                                {deliverable.title}
                              </span>
                            )}
                            {deliverable.editable && (
                              <button
                                onClick={() => setPhaseDeliverables(phaseDeliverables.filter(d => d.id !== deliverable.id))}
                                className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-400 text-[10px] px-1"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN WORK AREA */}
          <section className="flex-1 min-w-0">
            
            {/* TAB 1: KPI DASHBOARD & LIVE SIMULATOR */}
            {activeTab === 'kpi' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-indigo-900/40 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Deliverable expected by Day 30 / 60 / 90</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                        📊 Live KPI Baseline Dashboard &amp; Impact Simulator
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Simulate the performance change of the enterprise after deploying AIOps deduplication rules, automated alerts routing, and self-healing.
                      </p>
                    </div>
                    <button
                      onClick={handleOptimizeAllQuickWins}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow"
                    >
                      <Zap className="w-4 h-4 fill-white" /> Apply All Quick Wins
                    </button>
                  </div>

                  {/* INTERACTIVE CONTROLS */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Simulated Program Progress:
                        </label>
                        <span className="text-xs text-cyan-400 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                          Day {transformationProgress} of 90
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="90"
                        value={transformationProgress}
                        onChange={(e) => setTransformationProgress(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Day 1 (Assessment)</span>
                        <span>Day 30 (Quick Wins)</span>
                        <span>Day 60 (Transformation)</span>
                        <span>Day 90 (Sustained)</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-300 mb-2">AIOps Cumulative Operational Improvements</div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        As you proceed through the transformation roadmap, alerts decrease due to deduplication, MTTR falls via automatic thread dumps/logs routing, and critical application uptime rises.
                      </p>
                      <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Calculated annual operations savings:
                        <span className="font-bold underline text-white">${((metrics.hoursSaved * 52 * 75) + (transformationProgress * 3000)).toLocaleString()} USD</span>
                      </div>
                    </div>
                  </div>

                  {/* REAL-TIME SVG CHART */}
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xs font-mono text-slate-400">
                        Operational MTTR Trend &amp; Noise Reduction Analysis
                      </div>
                      <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/20">
                        Interactive Live Chart
                      </span>
                    </div>

                    <div className="h-44 w-full flex items-end justify-between gap-1 pt-4 border-b border-l border-slate-800 pb-2 px-2 relative">
                      {/* Grid background lines */}
                      <div className="absolute top-1/4 left-0 w-full border-t border-slate-900 pointer-events-none" />
                      <div className="absolute top-2/4 left-0 w-full border-t border-slate-900 pointer-events-none" />
                      <div className="absolute top-3/4 left-0 w-full border-t border-slate-900 pointer-events-none" />

                      {/* Bar 1: Baseline */}
                      <div className="flex flex-col items-center flex-1 max-w-[80px]">
                        <div className="text-slate-400 text-xs font-mono font-bold">180m</div>
                        <div className="w-full bg-slate-800 h-28 rounded-t-lg mt-2 relative overflow-hidden">
                          <div className="absolute bottom-0 w-full bg-rose-600/40 h-full" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1.5 text-center">Baseline</span>
                      </div>

                      {/* Bar 2: Day 30 */}
                      <div className="flex flex-col items-center flex-1 max-w-[80px]">
                        <div className="text-amber-400 text-xs font-mono font-bold">115m</div>
                        <div className="w-full bg-slate-800 h-28 rounded-t-lg mt-2 relative overflow-hidden">
                          <div className="absolute bottom-0 w-full bg-amber-500/50 h-[64%]" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1.5 text-center">Day 30</span>
                      </div>

                      {/* Bar 3: Day 60 */}
                      <div className="flex flex-col items-center flex-1 max-w-[80px]">
                        <div className="text-indigo-400 text-xs font-mono font-bold">75m</div>
                        <div className="w-full bg-slate-800 h-28 rounded-t-lg mt-2 relative overflow-hidden">
                          <div className="absolute bottom-0 w-full bg-indigo-500/60 h-[42%]" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1.5 text-center">Day 60</span>
                      </div>

                      {/* Bar 4: Current simulated MTTR based on state */}
                      <div className="flex flex-col items-center flex-1 max-w-[100px] border-2 border-dashed border-cyan-500/30 rounded-xl p-1 bg-cyan-950/10">
                        <div className="text-cyan-400 text-xs font-mono font-bold flex items-center gap-0.5">
                          {metrics.mttr}m <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400 inline" />
                        </div>
                        <div className="w-full bg-slate-800 h-28 rounded-t-lg mt-2 relative overflow-hidden">
                          <div
                            className="absolute bottom-0 w-full bg-cyan-500/80 transition-all duration-300"
                            style={{ height: `${Math.max(12, (metrics.mttr / 180) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-cyan-400 font-bold mt-1.5 text-center">Simulated MTTR</span>
                      </div>

                      {/* Bar 5: Day 90 Target */}
                      <div className="flex flex-col items-center flex-1 max-w-[80px]">
                        <div className="text-emerald-400 text-xs font-mono font-bold">25m</div>
                        <div className="w-full bg-slate-800 h-28 rounded-t-lg mt-2 relative overflow-hidden">
                          <div className="absolute bottom-0 w-full bg-emerald-500/80 h-[14%]" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1.5 text-center">Day 90 Target</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* THE 5 CORE AIOPS OBJECTIVES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-red-950 text-red-400 rounded border border-red-500/20">
                        <ZapOff className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">1. Suppress Telemetry Noise</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Identify and silence flapping alerts (like static Cisco SD-WAN interfaces). Tuning thresholds from 5s to 30s removes fatigue immediately.
                    </p>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[11px] text-slate-400">
                      <span className="text-amber-400 font-semibold block">Key Day 30 Deliverable:</span>
                      Eliminate duplicate network log telemetry inside Splunk indexers.
                    </div>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-indigo-950 text-indigo-400 rounded border border-indigo-500/20">
                        <Activity className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">2. Modernize Observability</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Consolidate SolarWinds legacy metrics and Azure Data Lake triggers. Build Dynatrace Smartscape dependencies into an integrated health dashboard.
                    </p>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[11px] text-slate-400">
                      <span className="text-indigo-400 font-semibold block">Key Day 60 Deliverable:</span>
                      100% unified multi-cloud network mapping &amp; metrics dashboard.
                    </div>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-500/20">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">3. Autonomous Remediation</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Initiate automated self-healing workflows: grab thread dumps on Dynatrace CPU spikes, rotate logs dynamically, and clear cache automatically.
                    </p>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[11px] text-slate-400">
                      <span className="text-emerald-400 font-semibold block">Key Day 90 Deliverable:</span>
                      Self-healing auto-ticket enrichment reduces dispatch overhead by 80%.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ENVIRONMENT ASSET DISCOVERY */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">Understand Current Environment</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        🌐 Environment Asset Discovery (Network, Cloud, Application, Infra)
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Map and assess all current architectures, unmonitored blindspots, and critical operational workflows. Add newly discovered legacy nodes below.
                      </p>
                    </div>
                    <div className="text-xs bg-slate-950 text-slate-400 px-3 py-1.5 rounded border border-slate-800">
                      Total Catalogued: <span className="text-purple-400 font-bold">{assets.length} Assets</span>
                    </div>
                  </div>

                  {/* ADD NEW ASSET FORM */}
                  <form onSubmit={handleAddAsset} className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <Plus className="w-4 h-4 text-purple-400" /> Log Newly Discovered Infrastructure or Application Node
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Asset / System Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Oracle Financials DB Cluster"
                        value={newAssetName}
                        onChange={(e) => setNewAssetName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                      <select
                        value={newAssetCategory}
                        onChange={(e) => setNewAssetCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Network">Network</option>
                        <option value="Cloud">Cloud Architecture</option>
                        <option value="Application">Application</option>
                        <option value="Infrastructure">Infrastructure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Business Criticality</label>
                      <select
                        value={newAssetCriticality}
                        onChange={(e) => setNewAssetCriticality(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Critical">Critical (P1 Risk)</option>
                        <option value="High">High (P2 Risk)</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Current Monitoring Tool</label>
                      <input
                        type="text"
                        placeholder="e.g. Dynatrace, Splunk, SolarWinds, or Unmonitored"
                        value={newAssetTool}
                        onChange={(e) => setNewAssetTool(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Current State Status</label>
                      <select
                        value={newAssetStatus}
                        onChange={(e) => setNewAssetStatus(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Healthy">Healthy (Normal)</option>
                        <option value="Degraded">Degraded (Warn)</option>
                        <option value="Critical">Critical (Action Needed)</option>
                        <option value="Unmonitored">Unmonitored (Blindspot)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Architecture Notes / Pain Points</label>
                      <input
                        type="text"
                        placeholder="e.g. Handover gaps, high disk fatigue"
                        value={newAssetNotes}
                        onChange={(e) => setNewAssetNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="md:col-span-3 flex justify-end">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                      >
                        Add System to AIOps Catalog
                      </button>
                    </div>
                  </form>

                  {/* DISCOVERED ASSET LIST */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 px-3">
                      <span>SYSTEM &amp; LAYER</span>
                      <div className="flex gap-16 mr-10">
                        <span>CRITICALITY</span>
                        <span>MONITORING TOOL</span>
                        <span>HEALTH STATUS</span>
                      </div>
                    </div>

                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 hover:border-slate-700 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            {asset.category === 'Application' && <Cpu className="w-5 h-5 text-purple-400" />}
                            {asset.category === 'Cloud' && <Cloud className="w-5 h-5 text-sky-400" />}
                            {asset.category === 'Network' && <NetworkIcon className="w-5 h-5 text-emerald-400" />}
                            {asset.category === 'Infrastructure' && <Server className="w-5 h-5 text-pink-400" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{asset.name}</span>
                              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                                {asset.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{asset.notes}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end">
                          <div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                              asset.criticality === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                              asset.criticality === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-slate-900 text-slate-300 border border-slate-800'
                            }`}>
                              {asset.criticality}
                            </span>
                          </div>

                          <div className="text-xs text-slate-300 font-mono">
                            {asset.monitoringTool}
                          </div>

                          <button
                            onClick={() => toggleAssetStatus(asset.id)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer hover:opacity-90 transition-all ${getStatusColor(asset.status)}`}
                            title="Click to toggle status"
                          >
                            ● {asset.status}
                          </button>

                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="p-1.5 hover:bg-slate-900 text-slate-500 hover:text-rose-400 rounded-lg transition-all"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI RECOMMENDATION BOX */}
                  <div className="bg-purple-950/20 border border-purple-900/40 p-4 rounded-xl mt-6">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Zap className="w-4 h-4 fill-purple-400" /> Assessment Strategy &amp; AI Integration Recommendations
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Based on current system cataloging, you have <span className="font-bold text-white">{assets.filter(a => a.status === 'Unmonitored').length} unmonitored systems</span> and <span className="font-bold text-white">{assets.filter(a => a.status === 'Critical').length} critical systems degrading</span>. High-priority advice: Build immediate syslog forwarding from the Unmonitored nodes into Splunk to eliminate critical security and operational blindspots before Day 30 review.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STAKEHOLDERS ALIGNMENT & CREDIBILITY TRACKER */}
            {activeTab === 'stakeholders' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">Build Stakeholder Relationships</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        👥 Stakeholders Relationship Map &amp; Alignment Tracker
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        At this initial stage, key leaders judge your communication, credibility, and leadership presence. Track, score, and align crucial teams.
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Average Team Alignment</div>
                      <div className="text-lg font-black text-emerald-400 font-mono">
                        {Math.round(stakeholders.reduce((sum, s) => sum + s.alignment, 0) / stakeholders.length)}%
                      </div>
                    </div>
                  </div>

                  {/* STAKEHOLDER MATRIX EXPLAINER */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <div className="p-3 bg-slate-900/40 rounded border border-slate-800">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                        <UserCheck className="w-4 h-4 text-emerald-400" /> Communication Strategy
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Host weekly 1-on-1 feedback slots with Skeptical managers to explain AIOps playbooks instead of imposing high-level frameworks.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/40 rounded border border-slate-800">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                        <Award className="w-4 h-4 text-cyan-400" /> Building Credibility
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Deliver quick wins (like mutes on noisy Cisco WAN flapping alerts) first. Demonstrate real, visible downtime reduction in weeks.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/40 rounded border border-slate-800">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                        <Building className="w-4 h-4 text-indigo-400" /> Leadership Presence
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Own failures openly, share automated dashboard access with vendors and NOC teams, and run reviews with standard metrics (SLA, MTTR).
                      </p>
                    </div>
                  </div>

                  {/* ADD STAKEHOLDER FORM */}
                  <form onSubmit={handleAddStakeholder} className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Plus className="w-4 h-4 text-emerald-400" /> Add Critical Stakeholder Profile
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Stakeholder Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Vance"
                        value={newStakeholderName}
                        onChange={(e) => setNewStakeholderName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Director of Infrastructure"
                        value={newStakeholderRole}
                        onChange={(e) => setNewStakeholderRole(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Team Affiliation</label>
                      <select
                        value={newStakeholderTeam}
                        onChange={(e) => setNewStakeholderTeam(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="NOC">NOC Teams</option>
                        <option value="Infrastructure">Infrastructure Teams</option>
                        <option value="Cloud">Cloud Teams</option>
                        <option value="Security">Security / SecOps</option>
                        <option value="Service Delivery">Service Delivery</option>
                        <option value="Vendors">Key Vendors</option>
                        <option value="Leadership">Executive Leadership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">AIOps Sentiment Mood</label>
                      <select
                        value={newStakeholderSentiment}
                        onChange={(e) => setNewStakeholderSentiment(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Champion">Champion (Highly Enthusiastic)</option>
                        <option value="Supportive">Supportive (Happy to Help)</option>
                        <option value="Neutral">Neutral (Waiting for Proof)</option>
                        <option value="Skeptical">Skeptical (Reluctant to Change)</option>
                        <option value="Resistant">Resistant (Worried about Noise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Current Alignment Level ({newStakeholderAlignment}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newStakeholderAlignment}
                        onChange={(e) => setNewStakeholderAlignment(Number(e.target.value))}
                        className="w-full h-8 bg-transparent accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Collaboration Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Worried about alert deduplication filters."
                        value={newStakeholderNotes}
                        onChange={(e) => setNewStakeholderNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="md:col-span-3 flex justify-end">
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                      >
                        Register Stakeholder Profile
                      </button>
                    </div>
                  </form>

                  {/* STAKEHOLDERS CARDS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stakeholders.map((s) => {
                      const badge = getSentimentBadge(s.sentiment);
                      return (
                        <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-bold text-white">{s.name}</h4>
                                <p className="text-xs text-slate-400">{s.role} &bull; <span className="text-indigo-400 font-mono text-[11px]">{s.team}</span></p>
                              </div>
                              <button
                                onClick={() => toggleStakeholderSentiment(s.id)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer hover:opacity-80 transition-all ${badge.color}`}
                                title="Click to cycle sentiment"
                              >
                                {badge.label}
                              </button>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic">"{s.notes}"</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-900 space-y-2">
                            <div className="flex justify-between items-center text-[10px] text-slate-400">
                              <span>Credibility &amp; Alignment Score</span>
                              <span className="font-bold font-mono text-emerald-400">{s.alignment}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={s.alignment}
                              onChange={(e) => updateStakeholderAlignment(s.id, Number(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <div className="text-[9px] text-slate-500 text-right">
                              Last interaction: {s.lastInteraction}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: OBSERVABILITY MATURITY RADAR */}
            {activeTab === 'maturity' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Assess Monitoring &amp; Observability</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        📈 Observability Maturity &amp; Tooling Gap Assessment
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Review legacy silos against AI operations targets. Use the interactive sliders below to evaluate your current monitoring tiers.
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      Scale: 1.0 (Low) to 5.0 (Optimal)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* MATURITY SLIDERS */}
                    <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-850">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-slate-900 pb-2">
                        Interactive Maturity Evaluator
                      </h3>

                      {Object.keys(maturityScores).map((key) => {
                        const item = maturityScores[key as keyof typeof maturityScores];
                        return (
                          <div key={key} className="space-y-1 group">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-white capitalize flex items-center gap-2">
                                {key.replace(/([A-Z])/g, ' $1')} Monitoring
                                <button
                                  onClick={() => setEditingMaturityTool(editingMaturityTool === key ? null : key)}
                                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-amber-400 text-[10px] transition-opacity"
                                >
                                  ✎
                                </button>
                              </span>
                              <span className="font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                                {item.score.toFixed(1)} / 5.0
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              step="0.1"
                              value={item.score}
                              onChange={(e) => handleMaturityChange(key, Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            {editingMaturityTool === key ? (
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => setMaturityScores({...maturityScores, [key]: {...item, label: e.target.value}})}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-[10px] rounded px-2 py-1 mt-1"
                                onBlur={() => setEditingMaturityTool(null)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingMaturityTool(null)}
                                autoFocus
                              />
                            ) : (
                              <p className="text-[10px] text-slate-400 font-medium">{item.label}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* AI DIAGNOSTICS & GAP ANALYSIS */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-slate-900 pb-2 mb-3">
                          Real-time AI Tooling Gap Analysis
                        </h3>

                        <div className="space-y-3 text-xs text-slate-300">
                          <div className="flex gap-2">
                            <div className="p-1 text-orange-400">🔥</div>
                            <div>
                              <strong className="text-white">Splunk Gap:</strong> High volume of raw logs indexing, but zero correlation rules exist to group individual server events into coherent multi-tier outages.
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="p-1 text-emerald-400">✨</div>
                            <div>
                              <strong className="text-white">Dynatrace Integration:</strong> Deep APM application traces are running, but legacy network nodes are completely missing from the trace topology.
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="p-1 text-amber-400">⚠️</div>
                            <div>
                              <strong className="text-white">Event Correlation Score ({maturityScores.eventCorrelation.score.toFixed(1)}/5.0):</strong> Critical weakness. Without AIOps event correlation, every minor network flap triggers a standalone ticket, forcing NOC teams to manually link incidents.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 mt-4">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold mb-1">
                          RECOMMENDED REMEDIATION ACTIONS:
                        </div>
                        <ul className="text-[10px] text-slate-400 list-disc list-inside space-y-1">
                          <li>Install Splunk ITSI Event Analytics to aggregate overlapping alerts.</li>
                          <li>Sync Dynatrace Smartscape network tags with core CMDB records.</li>
                          <li>Deploy threshold tuning on flapping Cisco SD-WAN interfaces.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* OBSERVABILITY PILLARS CHART */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 text-center">
                      Target Observability Maturity Level Progress
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.keys(maturityScores).map((key) => {
                        const item = maturityScores[key as keyof typeof maturityScores];
                        return (
                          <div key={key} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center flex flex-col justify-between">
                            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-2 relative">
                              <span className="text-sm font-black text-amber-400 font-mono">{item.score.toFixed(1)}</span>
                              <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="4" />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  fill="none"
                                  stroke={item.score > 3.5 ? '#10b981' : item.score > 2.5 ? '#f59e0b' : '#ef4444'}
                                  strokeWidth="4"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - item.score / 5)}`}
                                />
                              </svg>
                            </div>
                            <span className="text-[9px] text-slate-400">{item.score > 3.5 ? 'Advanced' : item.score > 2.5 ? 'Moderate' : 'Critical Gap'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: QUICK WINS & NOISE REDUCTION HUB */}
            {activeTab === 'quickwins' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider block">Identify Quick Wins (Day 30 Expectation)</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        ⚡ Quick Wins Noise Reduction Hub (Top 10 Actions)
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Leadership demands visible momentum. Toggle completed wins below to see simulated alert noise and MTTR drop in real time on the live dashboard.
                      </p>
                    </div>
                    <button
                      onClick={handleOptimizeAllQuickWins}
                      className="bg-yellow-600 hover:bg-yellow-500 text-slate-950 text-xs font-black px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" /> Execute All Wins
                    </button>
                  </div>

                  {/* QUICK WINS BOARD */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT COLUMN: IDENTIFIED WINS */}
                    <div className="space-y-3">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Identified (Awaiting Execution)</span>
                        <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold font-mono">
                          {quickWins.filter(qw => qw.status === 'Identified').length}
                        </span>
                      </div>

                      {quickWins.filter(qw => qw.status === 'Identified').map((qw) => (
                        <div key={qw.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-amber-500/20 transition-all space-y-3">
                          <div>
                            <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                              {qw.category}
                            </span>
                            <h4 className="text-xs font-bold text-white mt-1.5">{qw.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{qw.description}</p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] border-t border-slate-900 pt-2.5">
                            <span className="text-slate-400">Impact: <strong className="text-emerald-400">{qw.impact}</strong></span>
                            <span className="text-slate-400">Effort: <strong className="text-yellow-400">{qw.effort}</strong></span>
                          </div>
                          <button
                            onClick={() => toggleQuickWinStatus(qw.id)}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs py-1.5 rounded font-semibold transition-all"
                          >
                            Mark &ldquo;In Progress&rdquo;
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* MIDDLE COLUMN: IN PROGRESS WINS */}
                    <div className="space-y-3">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">In Progress (Tuning)</span>
                        <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold font-mono">
                          {quickWins.filter(qw => qw.status === 'In Progress').length}
                        </span>
                      </div>

                      {quickWins.filter(qw => qw.status === 'In Progress').map((qw) => (
                        <div key={qw.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-cyan-500/20 transition-all space-y-3">
                          <div>
                            <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                              {qw.category}
                            </span>
                            <h4 className="text-xs font-bold text-white mt-1.5">{qw.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{qw.description}</p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] border-t border-slate-900 pt-2.5">
                            <span className="text-slate-400">Impact: <strong className="text-emerald-400">{qw.impact}</strong></span>
                            <span className="text-slate-400">Effort: <strong className="text-yellow-400">{qw.effort}</strong></span>
                          </div>
                          <button
                            onClick={() => toggleQuickWinStatus(qw.id)}
                            className="w-full bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-950 text-cyan-400 text-xs py-1.5 rounded font-semibold transition-all"
                          >
                            Mark &ldquo;Completed&rdquo;
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* RIGHT COLUMN: COMPLETED WINS */}
                    <div className="space-y-3">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completed (Live Value Saved)</span>
                        <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold font-mono">
                          {quickWins.filter(qw => qw.status === 'Completed').length}
                        </span>
                      </div>

                      {quickWins.filter(qw => qw.status === 'Completed').map((qw) => (
                        <div key={qw.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-emerald-500/20 transition-all space-y-3 bg-emerald-950/10">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] bg-emerald-900/20 text-emerald-300 px-2 py-0.5 rounded uppercase tracking-wider font-semibold border border-emerald-500/30">
                                {qw.category}
                              </span>
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{qw.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{qw.description}</p>
                          </div>
                          <div className="bg-emerald-950/20 p-2 rounded text-[10px] text-emerald-400 border border-emerald-500/10">
                            <strong>Observed Impact:</strong> {qw.metricImproved}
                          </div>
                          <button
                            onClick={() => toggleQuickWinStatus(qw.id)}
                            className="w-full bg-slate-900 hover:bg-slate-850 text-slate-400 text-xs py-1.5 rounded font-semibold transition-all"
                          >
                            Revert Status
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VISIBLE MOMENTUM TIP */}
                  <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl mt-6">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Zap className="w-4 h-4 fill-amber-400" /> Executive Momentum Tip
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Completing at least 3 quick wins before Day 30 builds incredible leadership trust. This gives you the leverage to ask for the budget necessary for complex Days 30-60 automated self-healing projects.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: AUTOMATION PIPELINE LAB */}
            {activeTab === 'automation' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-pink-400 uppercase tracking-wider block">Days 30–60 Automation &amp; Enrichment</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        ⚙️ Interactive Automation Workflow Pipeline Builder
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Configure self-healing rules, auto-ticket enrichments, and alert mutes to accelerate resolution without manual intervention.
                      </p>
                    </div>
                    <div className="text-xs bg-slate-950 text-slate-400 px-3 py-1.5 rounded border border-slate-800">
                      Active Workflows: <span className="text-pink-400 font-bold">{workflows.length}</span>
                    </div>
                  </div>

                  {/* CREATE WORKFLOW BUILDER */}
                  <form onSubmit={handleCreateWorkflow} className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 mb-6 space-y-4">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-slate-900 pb-2 flex items-center gap-1">
                      <Play className="w-4 h-4 text-pink-400" /> Assemble Auto-Healing Pipeline
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Trigger Event (SRE Alert)</label>
                        <select
                          value={customWorkflowTrigger}
                          onChange={(e) => setCustomWorkflowTrigger(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                        >
                          <option value="Dynatrace JVM Alert (>92%)">Dynatrace JVM Alert (&gt;92%)</option>
                          <option value="Kubernetes CrashLoopBackOff">Kubernetes CrashLoopBackOff</option>
                          <option value="Splunk DB Query Out of Memory">Splunk DB Query Out of Memory</option>
                          <option value="Cisco SD-WAN Interface Down">Cisco SD-WAN Interface Down</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Filter Rule (Condition)</label>
                        <select
                          value={customWorkflowCondition}
                          onChange={(e) => setCustomWorkflowCondition(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                        >
                          <option value="Service equals PaymentAPI">Service equals "PaymentAPI"</option>
                          <option value="Namespace is CoreServices">Namespace is "CoreServices"</option>
                          <option value="Criticality is Critical">Criticality is "Critical"</option>
                          <option value="Region equals US-East">Region equals "US-East"</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Self-Healing Execution Action</label>
                        <select
                          value={customWorkflowAction}
                          onChange={(e) => setCustomWorkflowAction(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                        >
                          <option value="Clear Temp Logs & Restart Container">Clear Temp Logs &amp; Restart Container</option>
                          <option value="Capture JVM Thread Dump & Auto-Enrich Ticket">Capture JVM Thread Dump &amp; Auto-Enrich Ticket</option>
                          <option value="Trigger AWS EBS Disk Expansion Script">Trigger AWS EBS Disk Expansion Script</option>
                          <option value="Mute Alert for 15m & Post to MS Teams">Mute Alert for 15m &amp; Post to MS Teams</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                      >
                        Activate Pipeline Workflow
                      </button>
                    </div>
                  </form>

                  {/* ACTIVE WORKFLOW LIST */}
                  <div className="space-y-3">
                    {workflows.map((wf) => (
                      <div key={wf.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-700 transition-all">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/20 px-2 py-0.5 rounded border border-pink-500/20">
                              TRIGGER
                            </span>
                            <span className="text-xs text-white font-bold">{wf.trigger}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[11px] text-slate-400">
                            <span>If: <strong className="text-slate-200">{wf.conditions.join(', ')}</strong></span>
                            <span className="text-slate-500">&bull;</span>
                            <span>Execute: <strong className="text-emerald-400">{wf.actions.join(', ')}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Auto-Executions</span>
                            <span className="text-xs font-mono font-bold text-slate-300">{wf.executions} runs</span>
                          </div>

                          <div className="text-right">
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Avg Time Saved</span>
                            <span className="text-xs font-mono font-bold text-yellow-400">{wf.avgTimeSavedMin} min / run</span>
                          </div>

                          <div>
                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-500/20">
                              {wf.status}
                            </span>
                          </div>

                          <button
                            onClick={() => deleteWorkflow(wf.id)}
                            className="p-1 hover:bg-slate-900 text-slate-500 hover:text-rose-400 rounded-lg transition-all"
                            title="Delete Workflow"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: ROADMAP & GOVERNANCE FRAMEWORK */}
            {activeTab === 'roadmap' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">Define AIOps Observability Roadmap</span>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      🗺️ 12-24 Month Roadmap &amp; Governance Framework
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      Keep the entire organization aligned. Track milestone progress and regular operational SLA review syncs below.
                    </p>
                  </div>

                  {/* VISUAL TIMELINE */}
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-slate-900 pb-2">
                      Modernization Phases Timeline
                    </h3>

                    <div className="relative border-l border-slate-800 ml-4 space-y-6 pb-2">
                      {roadmap.map((rm) => (
                        <div key={rm.id} className="relative pl-6 group">
                          {/* Indicator dot */}
                          <div className={`absolute -left-[6px] top-1.5 w-3 h-3 rounded-full ${
                            rm.progress === 100 ? 'bg-emerald-500 shadow shadow-emerald-500/50' :
                            rm.progress > 0 ? 'bg-indigo-500 animate-pulse' : 'bg-slate-800'
                          }`} />

                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-slate-700 transition-all">
                            {editingRoadmapItem === rm.id ? (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={rm.phase}
                                  onChange={(e) => setRoadmap(roadmap.map(r => r.id === rm.id ? {...r, phase: e.target.value} : r))}
                                  className="w-full bg-slate-900 border border-slate-800 text-indigo-400 text-[10px] font-mono rounded px-2 py-1"
                                  placeholder="Phase name"
                                />
                                <input
                                  type="text"
                                  value={rm.title}
                                  onChange={(e) => setRoadmap(roadmap.map(r => r.id === rm.id ? {...r, title: e.target.value} : r))}
                                  className="w-full bg-slate-900 border border-slate-800 text-white text-sm font-bold rounded px-2 py-1"
                                  placeholder="Title"
                                />
                                <textarea
                                  value={rm.description}
                                  onChange={(e) => setRoadmap(roadmap.map(r => r.id === rm.id ? {...r, description: e.target.value} : r))}
                                  rows={2}
                                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded px-2 py-1"
                                  placeholder="Description"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={rm.owner}
                                    onChange={(e) => setRoadmap(roadmap.map(r => r.id === rm.id ? {...r, owner: e.target.value} : r))}
                                    className="flex-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] rounded px-2 py-1"
                                    placeholder="Owner"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={rm.progress}
                                    onChange={(e) => setRoadmap(roadmap.map(r => r.id === rm.id ? {...r, progress: parseInt(e.target.value) || 0} : r))}
                                    className="w-16 bg-slate-900 border border-slate-800 text-cyan-400 text-[10px] rounded px-2 py-1"
                                    placeholder="Progress"
                                  />
                                </div>
                                <button
                                  onClick={() => setEditingRoadmapItem(null)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-3 py-1 rounded"
                                >
                                  Done
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                  <div>
                                    <span className="text-[10px] text-indigo-400 font-mono font-bold block uppercase tracking-wider">
                                      {rm.phase}
                                    </span>
                                    <h4 className="text-sm font-bold text-white">{rm.title}</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setEditingRoadmapItem(rm.id)}
                                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-cyan-400 text-[10px] transition-opacity"
                                    >
                                      ✎ Edit
                                    </button>
                                    <span className="text-xs text-slate-400 font-medium">Progress:</span>
                                    <span className="font-mono text-cyan-400 font-bold">{rm.progress}%</span>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed mb-3">{rm.description}</p>
                                <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900 pt-2">
                                  <span>Owner: <strong>{rm.owner}</strong></span>
                                  <div className="w-24 bg-slate-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-cyan-500 h-full" style={{ width: `${rm.progress}%` }} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GOVERNANCE CADENCE */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-slate-900 pb-2">
                      Operational Alignment Governance Cadence
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {governance.map((gov) => (
                        <div key={gov.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between group">
                          {editingGovernanceItem === gov.id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={gov.meeting}
                                onChange={(e) => setGovernance(governance.map(g => g.id === gov.id ? {...g, meeting: e.target.value} : g))}
                                className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded px-2 py-1"
                                placeholder="Meeting name"
                              />
                              <input
                                type="text"
                                value={gov.cadence}
                                onChange={(e) => setGovernance(governance.map(g => g.id === gov.id ? {...g, cadence: e.target.value} : g))}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-400 text-[9px] rounded px-2 py-1"
                                placeholder="Cadence"
                              />
                              <input
                                type="text"
                                value={gov.owner}
                                onChange={(e) => setGovernance(governance.map(g => g.id === gov.id ? {...g, owner: e.target.value} : g))}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-400 text-[11px] rounded px-2 py-1"
                                placeholder="Owner"
                              />
                              <select
                                value={gov.status}
                                onChange={(e) => setGovernance(governance.map(g => g.id === gov.id ? {...g, status: e.target.value as any} : g))}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[9px] rounded px-2 py-1"
                              >
                                <option value="Active">Active</option>
                                <option value="Planned">Planned</option>
                              </select>
                              <button
                                onClick={() => setEditingGovernanceItem(null)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-3 py-1 rounded w-full"
                              >
                                Done
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold">
                                    {gov.cadence}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => setEditingGovernanceItem(gov.id)}
                                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-cyan-400 text-[10px] transition-opacity"
                                    >
                                      ✎
                                    </button>
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                      gov.status === 'Active' ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-400'
                                    }`}>
                                      {gov.status}
                                    </span>
                                  </div>
                                </div>
                                <h4 className="text-xs font-bold text-white">{gov.meeting}</h4>
                                <p className="text-[11px] text-slate-400">Owner: <strong>{gov.owner}</strong></p>
                              </div>
                              <div className="mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                                Stakeholders: {gov.stakeholders.join(', ')}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: EXECUTIVE PRESENTATION DECK */}
            {activeTab === 'executive' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block">Day 90 Deliverable</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        👔 Interactive Executive Transformation Deck
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Select and customize slides on current state assessment, actual achievements, roadmap, and ROI calculations to present to leadership.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentSlideIndex === 0}
                        className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                      >
                        Prev Slide
                      </button>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1.5 rounded border border-slate-800 font-bold">
                        {currentSlideIndex + 1} / {slidesData.length}
                      </span>
                      <button
                        onClick={() => setCurrentSlideIndex(prev => Math.min(slidesData.length - 1, prev + 1))}
                        disabled={currentSlideIndex === slidesData.length - 1}
                        className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                      >
                        Next Slide
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE SLIDE CONTAINER */}
                  <div className="bg-slate-950 p-6 rounded-xl border-2 border-slate-800 relative overflow-hidden min-h-[350px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                        <div>
                          <span className="text-[10px] text-rose-400 font-mono font-bold uppercase tracking-widest block">
                            AIOps EXECUTIVE BRIEFING
                          </span>
                          <h3 className="text-lg font-black text-white">{slidesData[currentSlideIndex].title}</h3>
                          <p className="text-xs text-slate-400 italic mt-0.5">{slidesData[currentSlideIndex].subtitle}</p>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold font-mono">
                          Day 90 Presenter Mode
                        </span>
                      </div>

                      {/* SLIDE BULLETS */}
                      <div className="space-y-2">
                        {slidesData[currentSlideIndex].bullets.map((bullet, idx) => (
                          <div key={idx} className="flex gap-2 items-start text-xs text-slate-300">
                            <div className="text-rose-500 font-black shrink-0 mt-0.5">▪</div>
                            <div className="flex-1">
                              {editingSlideText === `${currentSlideIndex}-${idx}` ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={bullet}
                                    onChange={(e) => handleUpdateSlideBullet(slidesData[currentSlideIndex].id, idx, e.target.value)}
                                    className="flex-1 bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-rose-500"
                                  />
                                  <button
                                    onClick={() => setEditingSlideText(null)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold"
                                  >
                                    Done
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center gap-4 group">
                                  <span>{bullet}</span>
                                  <button
                                    onClick={() => setEditingSlideText(`${currentSlideIndex}-${idx}`)}
                                    className="text-[9px] text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all font-semibold"
                                  >
                                    [Edit Bullet]
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SLIDE FOOTER AND CHARTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-900">
                      <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                        <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Executive Takeaway Callout:</span>
                        <p className="text-xs text-slate-300 leading-relaxed italic mt-1">
                          "{slidesData[currentSlideIndex].callout}"
                        </p>
                      </div>

                      <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                        <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                          {slidesData[currentSlideIndex].chartLabel}
                        </span>

                        <div className="h-16 flex items-end gap-1.5 pt-2">
                          {slidesData[currentSlideIndex].chartData.map((d, index) => {
                            const maxVal = Math.max(...slidesData[currentSlideIndex].chartData.map(item => item.value));
                            const heightPct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="text-[9px] text-slate-400 font-mono">{d.value}</div>
                                <div className="w-full bg-slate-850 h-8 rounded-t relative overflow-hidden">
                                  <div
                                    className="absolute bottom-0 w-full bg-rose-500/70"
                                    style={{ height: `${Math.max(10, heightPct)}%` }}
                                  />
                                </div>
                                <span className="text-[8px] text-slate-500 mt-1 truncate max-w-[50px]">{d.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM EXECUTIVE PRESENTATION REPORT */}
                  <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl mt-6">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Zap className="w-4 h-4 fill-rose-400" /> Executive Presentation Tips
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Executives evaluate communication and ROI clarity during the Day 90 review. Focus heavily on how reducing MTTD and MTTR has translated into prevented retail order drops, cloud cost savings from SolarWinds consolidation, and reduced team burnout.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: AI STACK ARCHITECTURE */}
            {activeTab === 'aistack' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">ML/MLOps Infrastructure</span>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        🧠 AI Stack Architecture by Use Case
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Capture and map your AI/ML infrastructure stack across 10 layers and 15+ use cases. Plan current state, target architecture, and technology gaps.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAiStackViewMode('byUseCase')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          aiStackViewMode === 'byUseCase' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        By Use Case
                      </button>
                      <button
                        onClick={() => setAiStackViewMode('byLayer')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          aiStackViewMode === 'byLayer' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        By Layer
                      </button>
                      <button
                        onClick={() => setAiStackViewMode('matrix')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          aiStackViewMode === 'matrix' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Matrix View
                      </button>
                    </div>
                  </div>

                  {/* AI Stack Capture Form */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 mb-6">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-4 flex items-center gap-1">
                      <Plus className="w-4 h-4 text-purple-400" /> Capture AI Stack Component
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Use Case</label>
                        <select
                          value={selectedUseCase}
                          onChange={(e) => setSelectedUseCase(e.target.value as AIUseCaseType)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        >
                          {aiUseCases.map(uc => (
                            <option key={uc.value} value={uc.value}>{uc.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Technology Layer</label>
                        <select
                          value={selectedLayer}
                          onChange={(e) => setSelectedLayer(e.target.value as AILayer)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        >
                          {aiLayers.map(layer => (
                            <option key={layer.value} value={layer.value}>{layer.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Component</label>
                        <select
                          value={selectedComponentId}
                          onChange={(e) => setSelectedComponentId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select a component...</option>
                          {aiStackViewMode === 'byUseCase' 
                            ? getComponentsByUseCase(selectedUseCase).map(comp => (
                                <option key={comp.id} value={comp.id}>{comp.name}</option>
                              ))
                            : getComponentsByLayer(selectedLayer).map(comp => (
                                <option key={comp.id} value={comp.id}>{comp.name}</option>
                              ))
                          }
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Status</label>
                        <select
                          value={stackStatus}
                          onChange={(e) => setStackStatus(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        >
                          <option value="Current">Current State</option>
                          <option value="Target">Target Architecture</option>
                          <option value="Evaluating">Evaluating</option>
                          <option value="Deprecated">Deprecated</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Owner/Team</label>
                        <input
                          type="text"
                          placeholder="e.g. ML Platform Team"
                          value={stackOwner}
                          onChange={(e) => setStackOwner(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly Cost ($)</label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={stackCost}
                          onChange={(e) => setStackCost(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Utilization %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="e.g. 75"
                          value={stackUtilization}
                          onChange={(e) => setStackUtilization(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Notes & Architecture Decisions</label>
                      <textarea
                        rows={2}
                        placeholder="Document why this technology was chosen, integration points, known limitations..."
                        value={stackNotes}
                        onChange={(e) => setStackNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedComponentId('');
                          setStackNotes('');
                          setStackOwner('');
                          setStackCost('');
                          setStackUtilization('');
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        Clear Form
                      </button>
                      <button
                        onClick={() => {
                          if (!selectedComponentId) return;
                          const newStack: CapturedStack = {
                            id: Date.now().toString(),
                            useCase: selectedUseCase,
                            layer: selectedLayer,
                            componentId: selectedComponentId,
                            status: stackStatus,
                            notes: stackNotes,
                            owner: stackOwner,
                            costPerMonth: stackCost ? parseInt(stackCost) : undefined,
                            utilizationPercent: stackUtilization ? parseInt(stackUtilization) : undefined
                          };
                          setCapturedStacks([...capturedStacks, newStack]);
                          setSelectedComponentId('');
                          setStackNotes('');
                          setStackOwner('');
                          setStackCost('');
                          setStackUtilization('');
                        }}
                        disabled={!selectedComponentId}
                        className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                      >
                        Add to Stack Architecture
                      </button>
                    </div>
                  </div>

                  {/* Available Components Browser */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Component Browser */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                        {aiStackViewMode === 'byUseCase' 
                          ? `Recommended Stack for ${aiUseCases.find(uc => uc.value === selectedUseCase)?.label}`
                          : `Components in ${aiLayers.find(l => l.value === selectedLayer)?.label}`
                        }
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {(aiStackViewMode === 'byUseCase' 
                          ? getComponentsByUseCase(selectedUseCase)
                          : getComponentsByLayer(selectedLayer)
                        ).map((component) => {
                          const isSelected = capturedStacks.some(s => s.componentId === component.id);
                          return (
                            <div 
                              key={component.id}
                              onClick={() => setSelectedComponentId(component.id)}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected 
                                ? 'bg-purple-950/30 border-purple-500/50' 
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                              } ${selectedComponentId === component.id ? 'ring-2 ring-purple-500/50' : ''}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="text-xs font-bold text-white">{component.name}</div>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                                component.maturity === 'Enterprise' ? 'bg-emerald-950/40 text-emerald-400' :
                                component.maturity === 'Growth' ? 'bg-cyan-950/40 text-cyan-400' :
                                'bg-amber-950/40 text-amber-400'
                                }`}>
                                {component.maturity}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-400 mb-1">{component.vendor} • {component.category}</div>
                              <p className="text-[10px] text-slate-500 line-clamp-2">{component.description}</p>
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {component.useCases.slice(0, 3).map(uc => (
                                  <span key={uc} className="text-[8px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                                    {uc.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Captured Stack Summary */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                        Captured Stack Summary ({capturedStacks.length} components)
                      </h3>
                      
                      {capturedStacks.length === 0 ? (
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                          <p className="text-xs text-slate-500">No components captured yet.</p>
                          <p className="text-[10px] text-slate-600 mt-1">Select use case, layer, and components to build your AI stack architecture.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                          {capturedStacks.map((stack) => {
                            const component = aiStackComponents.find(c => c.id === stack.componentId);
                            if (!component) return null;
                            return (
                              <div key={stack.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-start">
                                  <div className="text-xs font-bold text-white">{component.name}</div>
                                  <button
                                    onClick={() => setCapturedStacks(capturedStacks.filter(s => s.id !== stack.id))}
                                    className="text-slate-500 hover:text-rose-400"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1">
                                  {aiUseCases.find(uc => uc.value === stack.useCase)?.label.split(' - ')[0]} • {aiLayers.find(l => l.value === stack.layer)?.label.split(' ')[0]}
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                                  stack.status === 'Current' ? 'bg-emerald-950/40 text-emerald-400' :
                                  stack.status === 'Target' ? 'bg-purple-950/40 text-purple-400' :
                                  stack.status === 'Evaluating' ? 'bg-cyan-950/40 text-cyan-400' :
                                  'bg-rose-950/40 text-rose-400'
                                  }`}>
                                  {stack.status}
                                  </span>
                                  {stack.utilizationPercent && (
                                    <span className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                                    {stack.utilizationPercent}% util
                                    </span>
                                  )}
                                </div>
                                {stack.notes && (
                                  <p className="text-[10px] text-slate-500 mt-2 italic">"{stack.notes}"</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {capturedStacks.length > 0 && (
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <div className="text-xs font-semibold text-slate-300 mb-2">Stack Statistics</div>
                          <div className="space-y-1 text-[10px]">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Total Monthly Cost:</span>
                              <span className="text-emerald-400 font-mono">
                              ${capturedStacks.reduce((sum, s) => sum + (s.costPerMonth || 0), 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Current State:</span>
                              <span className="text-white font-mono">
                              {capturedStacks.filter(s => s.status === 'Current').length} components
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Target State:</span>
                              <span className="text-purple-400 font-mono">
                              {capturedStacks.filter(s => s.status === 'Target').length} components
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Avg Utilization:</span>
                              <span className="text-cyan-400 font-mono">
                              {Math.round(capturedStacks.reduce((sum, s) => sum + (s.utilizationPercent || 0), 0) / (capturedStacks.filter(s => s.utilizationPercent).length || 1))}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Layer Coverage Matrix */}
                  {aiStackViewMode === 'matrix' && (
                    <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-4">
                        AI Stack Coverage Matrix
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-slate-800">
                              <th className="text-left py-2 px-3 text-slate-400 font-semibold">Use Case</th>
                              {aiLayers.map(layer => (
                                <th key={layer.value} className="text-center py-2 px-2 text-slate-400 font-semibold text-[10px]">
                                  {layer.label.split(' ')[0]}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {aiUseCases.slice(0, 8).map((useCase) => (
                              <tr key={useCase.value} className="border-b border-slate-900">
                                <td className="py-2 px-3 text-slate-300 font-medium">{useCase.label.split(' - ')[0]}</td>
                                {aiLayers.map(layer => {
                                  const count = capturedStacks.filter(
                                    s => s.useCase === useCase.value && s.layer === layer.value
                                  ).length;
                                  return (
                                    <td key={layer.value} className="text-center py-2 px-2">
                                      {count > 0 ? (
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold">
                                          {count}
                                        </span>
                                      ) : (
                                        <span className="inline-block w-2 h-2 rounded-full bg-slate-800"></span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Technology Recommendations */}
                  <div className="mt-6 bg-purple-950/20 border border-purple-900/40 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Brain className="w-4 h-4" /> AI Stack Architecture Recommendations
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Based on your selected use case <strong>{aiUseCases.find(uc => uc.value === selectedUseCase)?.label}</strong>, 
                      we recommend establishing components across {(aiStackViewMode === 'byUseCase' ? getComponentsByUseCase(selectedUseCase) : getComponentsByLayer(selectedLayer)).length} available technologies. 
                      Key focus areas: Start with <strong>Data Engineering</strong> and <strong>Experiment Tracking</strong> foundations, 
                      then build toward <strong>Model Registry</strong> and <strong>Monitoring</strong> for production readiness.
                      Average enterprise AI stack contains 15-25 components across 8-10 layers.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* FOOTER - MINIMAL */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-600 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p>{programTitle} {programSubtitle}</p>
        </div>
      </footer>
    </div>
  );
}

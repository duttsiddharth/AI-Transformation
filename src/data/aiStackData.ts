export type AIUseCaseType = 
  | 'AIOps'
  | 'MLOps'
  | 'LLMOps'
  | 'PredictiveMaintenance'
  | 'AnomalyDetection'
  | 'RecommendationSystems'
  | 'ComputerVision'
  | 'NLP_Pipelines'
  | 'GenerativeAI'
  | 'AutoML'
  | 'FraudDetection'
  | 'DemandForecasting'
  | 'HealthcareAI'
  | 'SecurityGovernance'
  | 'DataEngineering';

export type AILayer = 
  | 'DataEngineering'
  | 'FeatureStore'
  | 'ModelDevelopment'
  | 'TrainingInfrastructure'
  | 'ModelRegistry'
  | 'ServingInference'
  | 'MonitoringObservability'
  | 'SecurityGovernance'
  | 'ExperimentTracking'
  | 'PipelineOrchestration';

export type DeploymentType = 'SaaS' | 'SelfHosted' | 'Hybrid' | 'CloudNative' | 'OpenSource';

export interface AIStackComponent {
  id: string;
  name: string;
  category: string;
  vendor: string;
  deploymentType: DeploymentType;
  maturity: 'Enterprise' | 'Growth' | 'Emerging' | 'Experimental';
  description: string;
  useCases: AIUseCaseType[];
  compatibleWith: string[];
}

export interface CapturedStack {
  id: string;
  useCase: AIUseCaseType;
  layer: AILayer;
  componentId: string;
  status: 'Current' | 'Target' | 'Evaluating' | 'Deprecated';
  notes: string;
  owner: string;
  costPerMonth?: number;
  utilizationPercent?: number;
}

export const aiUseCases: { value: AIUseCaseType; label: string; description: string }[] = [
  {
    value: 'AIOps',
    label: 'AIOps - AI for IT Operations',
    description: 'Anomaly detection, event correlation, automated remediation, predictive maintenance of infrastructure'
  },
  {
    value: 'MLOps',
    label: 'MLOps - Machine Learning Operations',
    description: 'End-to-end ML lifecycle management, model deployment, monitoring, and retraining pipelines'
  },
  {
    value: 'LLMOps',
    label: 'LLMOps - Large Language Model Ops',
    description: 'Foundation model management, prompt engineering, fine-tuning, RAG pipelines, inference optimization'
  },
  {
    value: 'PredictiveMaintenance',
    label: 'Predictive Maintenance',
    description: 'Equipment failure prediction, maintenance scheduling, IoT sensor analytics, downtime prevention'
  },
  {
    value: 'AnomalyDetection',
    label: 'Anomaly Detection & Security',
    description: 'Fraud detection, intrusion detection, behavioral analytics, outlier identification'
  },
  {
    value: 'RecommendationSystems',
    label: 'Recommendation Systems',
    description: 'Personalization engines, content recommendations, product suggestions, collaborative filtering'
  },
  {
    value: 'ComputerVision',
    label: 'Computer Vision',
    description: 'Image classification, object detection, facial recognition, medical imaging, quality inspection'
  },
  {
    value: 'NLP_Pipelines',
    label: 'NLP Pipelines',
    description: 'Text classification, sentiment analysis, entity extraction, document processing, chatbots'
  },
  {
    value: 'GenerativeAI',
    label: 'Generative AI Applications',
    description: 'Content generation, code generation, synthetic data, creative AI, multimodal models'
  },
  {
    value: 'AutoML',
    label: 'AutoML - Automated Machine Learning',
    description: 'Automated feature engineering, hyperparameter tuning, model selection, no-code ML'
  },
  {
    value: 'FraudDetection',
    label: 'Fraud Detection & Risk',
    description: 'Transaction monitoring, risk scoring, identity verification, anti-money laundering'
  },
  {
    value: 'DemandForecasting',
    label: 'Demand Forecasting',
    description: 'Sales prediction, inventory optimization, supply chain planning, capacity planning'
  },
  {
    value: 'HealthcareAI',
    label: 'Healthcare & Life Sciences AI',
    description: 'Medical imaging, drug discovery, patient outcome prediction, clinical trial optimization'
  },
  {
    value: 'SecurityGovernance',
    label: 'AI Security & Governance',
    description: 'Model explainability, bias detection, compliance monitoring, AI risk management'
  },
  {
    value: 'DataEngineering',
    label: 'AI Data Engineering',
    description: 'Data pipelines for ML, data quality, feature engineering infrastructure, data labeling'
  }
];

export const aiLayers: { value: AILayer; label: string; description: string }[] = [
  {
    value: 'DataEngineering',
    label: 'Data Engineering & Preparation',
    description: 'Data ingestion, ETL/ELT pipelines, data lakes, data warehouses, data quality, labeling tools'
  },
  {
    value: 'FeatureStore',
    label: 'Feature Store & Management',
    description: 'Feature engineering, feature storage, online/offline features, feature versioning, sharing'
  },
  {
    value: 'ModelDevelopment',
    label: 'Model Development & Training',
    description: 'Notebooks, IDEs, frameworks, distributed training, hyperparameter tuning, experiment tracking'
  },
  {
    value: 'TrainingInfrastructure',
    label: 'Training Infrastructure & Compute',
    description: 'GPU clusters, TPUs, training schedulers, spot instances, distributed training frameworks'
  },
  {
    value: 'ModelRegistry',
    label: 'Model Registry & Versioning',
    description: 'Model versioning, artifact storage, lineage tracking, approval workflows, staging gates'
  },
  {
    value: 'ServingInference',
    label: 'Model Serving & Inference',
    description: 'Real-time inference, batch prediction, model servers, edge deployment, optimization, caching'
  },
  {
    value: 'MonitoringObservability',
    label: 'Monitoring & Observability',
    description: 'Model performance monitoring, data drift, concept drift, latency tracking, alerting'
  },
  {
    value: 'SecurityGovernance',
    label: 'Security, Governance & Compliance',
    description: 'Model explainability, bias detection, PII handling, access control, audit trails, compliance'
  },
  {
    value: 'ExperimentTracking',
    label: 'Experiment Tracking & Metadata',
    description: 'Run tracking, hyperparameter logging, metric comparison, artifact management, reproducibility'
  },
  {
    value: 'PipelineOrchestration',
    label: 'Pipeline Orchestration & CI/CD',
    description: 'ML pipelines, workflow orchestration, CI/CD for ML, GitOps, testing, deployment automation'
  }
];

export const aiStackComponents: AIStackComponent[] = [
  // DATA ENGINEERING LAYER
  {
    id: 'data-databricks',
    name: 'Databricks Lakehouse',
    category: 'Data Lakehouse',
    vendor: 'Databricks',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Unified analytics platform with Delta Lake, Spark, and MLflow integration',
    useCases: ['AIOps', 'MLOps', 'PredictiveMaintenance', 'RecommendationSystems', 'FraudDetection'],
    compatibleWith: ['mlflow', 'training-ray', 'serving-mlflow']
  },
  {
    id: 'data-snowflake',
    name: 'Snowflake Data Cloud',
    category: 'Data Warehouse',
    vendor: 'Snowflake',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Cloud-native data warehouse with ML integrations and data sharing',
    useCases: ['MLOps', 'DemandForecasting', 'FraudDetection', 'RecommendationSystems'],
    compatibleWith: ['model-h2o', 'serving-aws-sagemaker']
  },
  {
    id: 'data-aws-glue',
    name: 'AWS Glue',
    category: 'ETL Service',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Serverless data integration for ETL, data catalog, and data preparation',
    useCases: ['AIOps', 'MLOps', 'AnomalyDetection', 'PredictiveMaintenance'],
    compatibleWith: ['feature-aws-fm', 'training-aws-trainium']
  },
  {
    id: 'data-apache-spark',
    name: 'Apache Spark',
    category: 'Distributed Processing',
    vendor: 'Apache Foundation',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Unified analytics engine for large-scale data processing with MLlib',
    useCases: ['MLOps', 'RecommendationSystems', 'AnomalyDetection', 'NLP_Pipelines'],
    compatibleWith: ['training-kubeflow', 'pipeline-airflow']
  },
  {
    id: 'data-kafka',
    name: 'Apache Kafka',
    category: 'Streaming Platform',
    vendor: 'Apache Foundation',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Distributed event streaming platform for real-time data pipelines',
    useCases: ['AIOps', 'AnomalyDetection', 'FraudDetection', 'RecommendationSystems'],
    compatibleWith: ['serving-ksql', 'monitoring-prometheus']
  },
  {
    id: 'data-aws-s3',
    name: 'AWS S3 + Athena',
    category: 'Object Storage & Query',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Scalable object storage with SQL query capabilities',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines', 'GenerativeAI'],
    compatibleWith: ['training-aws-sagemaker', 'model-aws-registry']
  },
  {
    id: 'data-labelbox',
    name: 'Labelbox',
    category: 'Data Labeling',
    vendor: 'Labelbox',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Training data platform for labeling, collaboration, and quality assurance',
    useCases: ['ComputerVision', 'NLP_Pipelines', 'GenerativeAI'],
    compatibleWith: ['training-aws-sagemaker', 'model-huggingface']
  },
  {
    id: 'data-scale',
    name: 'Scale AI',
    category: 'Data Labeling',
    vendor: 'Scale AI',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Data platform for AI with annotation, validation, and collection',
    useCases: ['ComputerVision', 'NLP_Pipelines', 'GenerativeAI', 'AutoML'],
    compatibleWith: ['training-kubeflow', 'model-vertex']
  },
  {
    id: 'data-dbt',
    name: 'dbt (Data Build Tool)',
    category: 'Data Transformation',
    vendor: 'dbt Labs',
    deploymentType: 'Hybrid',
    maturity: 'Enterprise',
    description: 'Transform data in warehouses with version control and testing',
    useCases: ['MLOps', 'DemandForecasting', 'FraudDetection'],
    compatibleWith: ['data-snowflake', 'data-databricks']
  },
  {
    id: 'data-delta-lake',
    name: 'Delta Lake',
    category: 'Storage Layer',
    vendor: 'Linux Foundation',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Open-source storage layer for reliable data lakes with ACID transactions',
    useCases: ['MLOps', 'AIOps', 'PredictiveMaintenance', 'AnomalyDetection'],
    compatibleWith: ['data-apache-spark', 'mlflow']
  },

  // FEATURE STORE LAYER
  {
    id: 'feature-feast',
    name: 'Feast',
    category: 'Feature Store',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Open-source feature store for ML with online and offline feature serving',
    useCases: ['MLOps', 'RecommendationSystems', 'FraudDetection', 'DemandForecasting'],
    compatibleWith: ['data-databricks', 'serving-mlflow', 'training-kubeflow']
  },
  {
    id: 'feature-tecton',
    name: 'Tecton',
    category: 'Feature Platform',
    vendor: 'Tecton',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Enterprise feature platform with real-time feature engineering',
    useCases: ['FraudDetection', 'RecommendationSystems', 'MLOps', 'AIOps'],
    compatibleWith: ['training-ray', 'serving-aws-sagemaker']
  },
  {
    id: 'feature-aws-fm',
    name: 'AWS Feature Store',
    category: 'Managed Feature Store',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Fully managed storage for ML features with online/offline stores',
    useCases: ['MLOps', 'AIOps', 'FraudDetection'],
    compatibleWith: ['training-aws-sagemaker', 'data-aws-s3']
  },
  {
    id: 'feature-vertex',
    name: 'Vertex AI Feature Store',
    category: 'Feature Store',
    vendor: 'Google Cloud',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Centralized repository for serving ML features at scale',
    useCases: ['MLOps', 'RecommendationSystems', 'DemandForecasting'],
    compatibleWith: ['training-vertex', 'model-vertex']
  },
  {
    id: 'feature-hopsworks',
    name: 'Hopsworks',
    category: 'Feature Store',
    vendor: 'Logical Clocks',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Open-source feature store with MLOps platform integration',
    useCases: ['MLOps', 'AnomalyDetection', 'PredictiveMaintenance'],
    compatibleWith: ['training-kubeflow', 'model-mlflow']
  },

  // MODEL DEVELOPMENT LAYER
  {
    id: 'model-jupyter',
    name: 'Jupyter Notebooks/Lab',
    category: 'Development Environment',
    vendor: 'Project Jupyter',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Interactive computing environment for data science and ML experimentation',
    useCases: ['MLOps', 'AutoML', 'NLP_Pipelines', 'ComputerVision', 'GenerativeAI'],
    compatibleWith: ['data-databricks', 'experiment-mlflow', 'model-huggingface']
  },
  {
    id: 'model-vscode',
    name: 'VS Code + Extensions',
    category: 'IDE',
    vendor: 'Microsoft',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Code editor with Python, Jupyter, and ML extensions',
    useCases: ['MLOps', 'LLMOps', 'ComputerVision', 'NLP_Pipelines'],
    compatibleWith: ['training-azure-ml', 'model-azure']
  },
  {
    id: 'model-pycharm',
    name: 'PyCharm Professional',
    category: 'IDE',
    vendor: 'JetBrains',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Python IDE with data science tools and Jupyter integration',
    useCases: ['MLOps', 'NLP_Pipelines', 'ComputerVision'],
    compatibleWith: ['training-kubeflow', 'experiment-mlflow']
  },
  {
    id: 'model-huggingface',
    name: 'Hugging Face Transformers',
    category: 'Model Library',
    vendor: 'Hugging Face',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'State-of-the-art NLP and multimodal models with training tools',
    useCases: ['LLMOps', 'NLP_Pipelines', 'GenerativeAI', 'AutoML'],
    compatibleWith: ['training-aws-sagemaker', 'serving-hf-inference', 'model-mlflow']
  },
  {
    id: 'model-pytorch',
    name: 'PyTorch',
    category: 'ML Framework',
    vendor: 'Meta AI',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Open-source ML framework with dynamic computation graphs',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines', 'GenerativeAI', 'LLMOps'],
    compatibleWith: ['training-ray', 'serving-torchserve', 'experiment-wandb']
  },
  {
    id: 'model-tensorflow',
    name: 'TensorFlow',
    category: 'ML Framework',
    vendor: 'Google',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'End-to-end open-source platform for ML with Keras API',
    useCases: ['MLOps', 'ComputerVision', 'RecommendationSystems', 'AnomalyDetection'],
    compatibleWith: ['training-vertex', 'serving-tfserving', 'model-tf-hub']
  },
  {
    id: 'model-scikit',
    name: 'Scikit-learn',
    category: 'ML Library',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Simple and efficient tools for predictive data analysis',
    useCases: ['AutoML', 'MLOps', 'FraudDetection', 'DemandForecasting'],
    compatibleWith: ['model-jupyter', 'serving-mlflow']
  },
  {
    id: 'model-xgboost',
    name: 'XGBoost',
    category: 'Gradient Boosting',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Optimized distributed gradient boosting library',
    useCases: ['FraudDetection', 'DemandForecasting', 'RecommendationSystems', 'AIOps'],
    compatibleWith: ['training-aws-sagemaker', 'serving-mlflow']
  },
  {
    id: 'model-langchain',
    name: 'LangChain',
    category: 'LLM Framework',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Framework for developing applications powered by language models',
    useCases: ['LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['serving-fastapi', 'model-openai', 'model-huggingface']
  },
  {
    id: 'model-llamaindex',
    name: 'LlamaIndex',
    category: 'RAG Framework',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Data framework for LLM applications with RAG capabilities',
    useCases: ['LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['model-openai', 'serving-fastapi', 'data-pinecone']
  },

  // TRAINING INFRASTRUCTURE LAYER
  {
    id: 'training-aws-sagemaker',
    name: 'AWS SageMaker',
    category: 'ML Platform',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Fully managed service to build, train, and deploy ML models',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines', 'FraudDetection'],
    compatibleWith: ['data-aws-s3', 'serving-aws-sagemaker', 'model-aws-registry']
  },
  {
    id: 'training-vertex',
    name: 'Google Vertex AI',
    category: 'ML Platform',
    vendor: 'Google Cloud',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Unified AI platform for building, deploying, and scaling ML models',
    useCases: ['MLOps', 'GenerativeAI', 'AutoML', 'ComputerVision'],
    compatibleWith: ['feature-vertex', 'model-tensorflow', 'serving-vertex']
  },
  {
    id: 'training-azure-ml',
    name: 'Azure Machine Learning',
    category: 'ML Platform',
    vendor: 'Microsoft',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Enterprise-grade ML service for building and deploying models',
    useCases: ['MLOps', 'AnomalyDetection', 'PredictiveMaintenance', 'LLMOps'],
    compatibleWith: ['model-azure', 'serving-azure-ml']
  },
  {
    id: 'training-kubeflow',
    name: 'Kubeflow',
    category: 'ML Orchestration',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Kubernetes-native platform for ML workflows',
    useCases: ['MLOps', 'AIOps', 'RecommendationSystems'],
    compatibleWith: ['pipeline-airflow', 'model-mlflow', 'serving-kserving']
  },
  {
    id: 'training-ray',
    name: 'Ray + Anyscale',
    category: 'Distributed Compute',
    vendor: 'Anyscale',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Unified framework for scaling AI and Python workloads',
    useCases: ['MLOps', 'LLMOps', 'GenerativeAI', 'RecommendationSystems'],
    compatibleWith: ['training-aws-sagemaker', 'serving-ray-serve']
  },
  {
    id: 'training-databricks-ml',
    name: 'Databricks ML Runtime',
    category: 'ML Platform',
    vendor: 'Databricks',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Optimized Apache Spark with ML frameworks and GPU support',
    useCases: ['MLOps', 'PredictiveMaintenance', 'AnomalyDetection'],
    compatibleWith: ['data-databricks', 'mlflow']
  },
  {
    id: 'training-nvidia',
    name: 'NVIDIA AI Enterprise',
    category: 'GPU Infrastructure',
    vendor: 'NVIDIA',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Suite of AI tools and frameworks optimized for NVIDIA GPUs',
    useCases: ['ComputerVision', 'GenerativeAI', 'LLMOps', 'NLP_Pipelines'],
    compatibleWith: ['model-pytorch', 'model-tensorflow', 'serving-triton']
  },
  {
    id: 'training-lambda',
    name: 'Lambda Cloud',
    category: 'GPU Cloud',
    vendor: 'Lambda',
    deploymentType: 'CloudNative',
    maturity: 'Growth',
    description: 'Cloud GPU instances for deep learning and AI training',
    useCases: ['ComputerVision', 'GenerativeAI', 'LLMOps'],
    compatibleWith: ['model-pytorch', 'model-huggingface']
  },
  {
    id: 'training-coreweave',
    name: 'CoreWeave',
    category: 'GPU Cloud',
    vendor: 'CoreWeave',
    deploymentType: 'CloudNative',
    maturity: 'Growth',
    description: 'Kubernetes-native GPU cloud for compute-intensive workloads',
    useCases: ['LLMOps', 'GenerativeAI', 'ComputerVision'],
    compatibleWith: ['training-kubeflow', 'serving-kserving']
  },

  // MODEL REGISTRY LAYER
  {
    id: 'mlflow',
    name: 'MLflow',
    category: 'ML Lifecycle',
    vendor: 'Databricks',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Open-source platform for ML lifecycle management and model registry',
    useCases: ['MLOps', 'AIOps', 'AutoML', 'RecommendationSystems'],
    compatibleWith: ['data-databricks', 'serving-mlflow', 'model-jupyter']
  },
  {
    id: 'model-aws-registry',
    name: 'Amazon SageMaker Model Registry',
    category: 'Model Registry',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Centralized catalog for managing ML model versions and approvals',
    useCases: ['MLOps', 'FraudDetection', 'AIOps'],
    compatibleWith: ['training-aws-sagemaker', 'serving-aws-sagemaker']
  },
  {
    id: 'model-vertex',
    name: 'Vertex AI Model Registry',
    category: 'Model Registry',
    vendor: 'Google Cloud',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Central repository for managing and versioning ML models',
    useCases: ['MLOps', 'GenerativeAI', 'AutoML'],
    compatibleWith: ['training-vertex', 'feature-vertex']
  },
  {
    id: 'model-azure',
    name: 'Azure ML Model Registry',
    category: 'Model Registry',
    vendor: 'Microsoft',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Version and manage ML models with approval workflows',
    useCases: ['MLOps', 'PredictiveMaintenance', 'AnomalyDetection'],
    compatibleWith: ['training-azure-ml', 'serving-azure-ml']
  },
  {
    id: 'model-neptune',
    name: 'Neptune.ai',
    category: 'ML Metadata Store',
    vendor: 'Neptune',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Metadata store for MLOps with experiment tracking and model registry',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines'],
    compatibleWith: ['model-pytorch', 'training-kubeflow']
  },

  // SERVING/INFERENCE LAYER
  {
    id: 'serving-aws-sagemaker',
    name: 'SageMaker Endpoints',
    category: 'Managed Inference',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Fully managed real-time and batch inference hosting',
    useCases: ['MLOps', 'FraudDetection', 'RecommendationSystems', 'AIOps'],
    compatibleWith: ['training-aws-sagemaker', 'monitoring-aws-cloudwatch']
  },
  {
    id: 'serving-vertex',
    name: 'Vertex AI Endpoints',
    category: 'Managed Inference',
    vendor: 'Google Cloud',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Scalable model serving with automatic scaling and monitoring',
    useCases: ['MLOps', 'GenerativeAI', 'AutoML'],
    compatibleWith: ['training-vertex', 'model-vertex']
  },
  {
    id: 'serving-azure-ml',
    name: 'Azure ML Managed Endpoints',
    category: 'Managed Inference',
    vendor: 'Microsoft',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Real-time and batch inference with blue-green deployments',
    useCases: ['MLOps', 'PredictiveMaintenance', 'AnomalyDetection'],
    compatibleWith: ['training-azure-ml', 'model-azure']
  },
  {
    id: 'serving-mlflow',
    name: 'MLflow Model Serving',
    category: 'Model Serving',
    vendor: 'Databricks',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Deploy MLflow models as REST endpoints',
    useCases: ['MLOps', 'AIOps', 'AutoML'],
    compatibleWith: ['mlflow', 'model-jupyter']
  },
  {
    id: 'serving-torchserve',
    name: 'TorchServe',
    category: 'Model Server',
    vendor: 'PyTorch / AWS',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Flexible serving framework for PyTorch models',
    useCases: ['ComputerVision', 'NLP_Pipelines', 'GenerativeAI'],
    compatibleWith: ['model-pytorch', 'training-aws-sagemaker']
  },
  {
    id: 'serving-tfserving',
    name: 'TensorFlow Serving',
    category: 'Model Server',
    vendor: 'Google',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Flexible, high-performance serving system for ML models',
    useCases: ['MLOps', 'ComputerVision', 'RecommendationSystems'],
    compatibleWith: ['model-tensorflow', 'training-vertex']
  },
  {
    id: 'serving-triton',
    name: 'NVIDIA Triton',
    category: 'Inference Server',
    vendor: 'NVIDIA',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'Optimized inference server for deep learning and LLMs',
    useCases: ['ComputerVision', 'LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['training-nvidia', 'model-pytorch', 'model-tensorflow']
  },
  {
    id: 'serving-kserving',
    name: 'KServe',
    category: 'Kubernetes Serving',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Kubernetes-native model serving with serverless scaling',
    useCases: ['MLOps', 'AIOps', 'RecommendationSystems'],
    compatibleWith: ['training-kubeflow', 'model-mlflow']
  },
  {
    id: 'serving-ray-serve',
    name: 'Ray Serve',
    category: 'Scalable Serving',
    vendor: 'Anyscale',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Scalable model serving built on Ray',
    useCases: ['LLMOps', 'GenerativeAI', 'RecommendationSystems'],
    compatibleWith: ['training-ray', 'model-huggingface']
  },
  {
    id: 'serving-fastapi',
    name: 'FastAPI + Docker',
    category: 'Custom Serving',
    vendor: 'Open Source',
    deploymentType: 'SelfHosted',
    maturity: 'Enterprise',
    description: 'High-performance API framework for custom model serving',
    useCases: ['LLMOps', 'NLP_Pipelines', 'ComputerVision'],
    compatibleWith: ['model-pytorch', 'model-tensorflow', 'model-langchain']
  },
  {
    id: 'serving-openai',
    name: 'OpenAI API',
    category: 'LLM API',
    vendor: 'OpenAI',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Access to GPT-4, GPT-3.5, embeddings, and fine-tuning APIs',
    useCases: ['LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['model-langchain', 'model-llamaindex']
  },
  {
    id: 'serving-anthropic',
    name: 'Anthropic Claude API',
    category: 'LLM API',
    vendor: 'Anthropic',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Access to Claude models for safe and helpful AI applications',
    useCases: ['LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['model-langchain']
  },
  {
    id: 'serving-hf-inference',
    name: 'Hugging Face Inference API',
    category: 'Model API',
    vendor: 'Hugging Face',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Instant access to 100k+ models via API',
    useCases: ['NLP_Pipelines', 'ComputerVision', 'GenerativeAI'],
    compatibleWith: ['model-huggingface']
  },
  {
    id: 'serving-cohere',
    name: 'Cohere API',
    category: 'NLP API',
    vendor: 'Cohere',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Text generation, embeddings, and classification APIs',
    useCases: ['NLP_Pipelines', 'LLMOps', 'GenerativeAI'],
    compatibleWith: ['model-langchain']
  },
  {
    id: 'serving-pinecone',
    name: 'Pinecone',
    category: 'Vector Database',
    vendor: 'Pinecone',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Managed vector database for semantic search and RAG',
    useCases: ['LLMOps', 'GenerativeAI', 'RecommendationSystems'],
    compatibleWith: ['model-llamaindex', 'model-langchain']
  },
  {
    id: 'serving-weaviate',
    name: 'Weaviate',
    category: 'Vector Database',
    vendor: 'Weaviate',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Open-source vector search engine with ML integrations',
    useCases: ['LLMOps', 'GenerativeAI', 'NLP_Pipelines'],
    compatibleWith: ['model-llamaindex', 'model-langchain']
  },

  // MONITORING/OBSERVABILITY LAYER
  {
    id: 'monitoring-evidently',
    name: 'Evidently AI',
    category: 'ML Monitoring',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Tools to evaluate, test, and monitor ML models in production',
    useCases: ['MLOps', 'FraudDetection', 'DemandForecasting'],
    compatibleWith: ['serving-mlflow', 'model-jupyter']
  },
  {
    id: 'monitoring-whylogs',
    name: 'WhyLabs / whylogs',
    category: 'Data Logging',
    vendor: 'WhyLabs',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Open-source library for logging and monitoring data and ML models',
    useCases: ['MLOps', 'AIOps', 'AnomalyDetection'],
    compatibleWith: ['serving-aws-sagemaker', 'serving-mlflow']
  },
  {
    id: 'monitoring-arize',
    name: 'Arize AI',
    category: 'ML Observability',
    vendor: 'Arize',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'ML observability platform for monitoring model performance',
    useCases: ['MLOps', 'RecommendationSystems', 'FraudDetection'],
    compatibleWith: ['serving-aws-sagemaker', 'training-vertex']
  },
  {
    id: 'monitoring-fiddler',
    name: 'Fiddler',
    category: 'Model Performance Management',
    vendor: 'Fiddler',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Model monitoring with explainability and fairness',
    useCases: ['MLOps', 'FraudDetection', 'RecommendationSystems'],
    compatibleWith: ['training-aws-sagemaker', 'model-huggingface']
  },
  {
    id: 'monitoring-aws-cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'Cloud Monitoring',
    vendor: 'AWS',
    deploymentType: 'CloudNative',
    maturity: 'Enterprise',
    description: 'Monitoring and observability for AWS resources and applications',
    useCases: ['AIOps', 'MLOps', 'AnomalyDetection'],
    compatibleWith: ['serving-aws-sagemaker', 'training-aws-sagemaker']
  },
  {
    id: 'monitoring-dynatrace',
    name: 'Dynatrace',
    category: 'APM & Observability',
    vendor: 'Dynatrace',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'AI-powered observability platform with Davis AI engine',
    useCases: ['AIOps', 'MLOps', 'AnomalyDetection'],
    compatibleWith: ['serving-fastapi', 'serving-mlflow']
  },
  {
    id: 'monitoring-datadog',
    name: 'Datadog',
    category: 'Cloud Monitoring',
    vendor: 'Datadog',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Cloud monitoring as a service with ML-powered alerts',
    useCases: ['AIOps', 'MLOps', 'AnomalyDetection'],
    compatibleWith: ['training-kubeflow', 'serving-kserving']
  },
  {
    id: 'monitoring-prometheus',
    name: 'Prometheus + Grafana',
    category: 'Open Monitoring',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Systems monitoring and alerting toolkit with visualization',
    useCases: ['MLOps', 'AIOps', 'RecommendationSystems'],
    compatibleWith: ['training-kubeflow', 'serving-kserving']
  },
  {
    id: 'monitoring-weights-biases',
    name: 'Weights & Biases',
    category: 'Experiment Tracking',
    vendor: 'W&B',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'MLOps platform for experiment tracking and model management',
    useCases: ['MLOps', 'ComputerVision', 'GenerativeAI', 'LLMOps'],
    compatibleWith: ['model-pytorch', 'model-tensorflow', 'training-kubeflow']
  },
  {
    id: 'monitoring-comet',
    name: 'Comet ML',
    category: 'Experiment Management',
    vendor: 'Comet',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Platform for tracking, comparing, and optimizing experiments',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines'],
    compatibleWith: ['model-pytorch', 'model-tensorflow']
  },

  // SECURITY/GOVERNANCE LAYER
  {
    id: 'security-great',
    name: 'Great Expectations',
    category: 'Data Validation',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Framework for data validation and documentation',
    useCases: ['MLOps', 'FraudDetection', 'DemandForecasting'],
    compatibleWith: ['data-databricks', 'pipeline-airflow']
  },
  {
    id: 'security-privacy',
    name: 'Privacy Preserving ML',
    category: 'Privacy Tech',
    vendor: 'Various',
    deploymentType: 'Hybrid',
    maturity: 'Emerging',
    description: 'Tools for differential privacy, federated learning, and secure ML',
    useCases: ['FraudDetection', 'RecommendationSystems', 'HealthcareAI'],
    compatibleWith: ['model-pytorch', 'training-kubeflow']
  },
  {
    id: 'security-bias',
    name: 'AI Fairness 360 / What-If Tool',
    category: 'Bias Detection',
    vendor: 'IBM / Google',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Comprehensive metrics and algorithms to check for biases in models',
    useCases: ['MLOps', 'FraudDetection', 'RecommendationSystems'],
    compatibleWith: ['model-tensorflow', 'model-pytorch']
  },
  {
    id: 'security-opa',
    name: 'Open Policy Agent (OPA)',
    category: 'Policy Enforcement',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Policy-based control for cloud-native applications including ML pipelines',
    useCases: ['MLOps', 'AIOps', 'SecurityGovernance'],
    compatibleWith: ['training-kubeflow', 'serving-kserving']
  },
  {
    id: 'security-model-cards',
    name: 'Model Cards Toolkit',
    category: 'Model Documentation',
    vendor: 'Google',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Framework for documenting ML model intended use and limitations',
    useCases: ['MLOps', 'GenerativeAI', 'LLMOps'],
    compatibleWith: ['model-tensorflow', 'mlflow']
  },

  // EXPERIMENT TRACKING LAYER
  {
    id: 'experiment-mlflow',
    name: 'MLflow Tracking',
    category: 'Experiment Tracking',
    vendor: 'Databricks',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Track experiments, parameters, metrics, and artifacts',
    useCases: ['MLOps', 'AutoML', 'ComputerVision', 'NLP_Pipelines'],
    compatibleWith: ['model-jupyter', 'training-kubeflow']
  },
  {
    id: 'experiment-wandb',
    name: 'Weights & Biases',
    category: 'Experiment Tracking',
    vendor: 'W&B',
    deploymentType: 'SaaS',
    maturity: 'Growth',
    description: 'Track experiments, visualize metrics, compare runs',
    useCases: ['MLOps', 'LLMOps', 'GenerativeAI', 'ComputerVision'],
    compatibleWith: ['model-pytorch', 'model-tensorflow', 'training-ray']
  },
  {
    id: 'experiment-tensorboard',
    name: 'TensorBoard',
    category: 'Visualization',
    vendor: 'Google',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Visualization toolkit for TensorFlow experiments and metrics',
    useCases: ['MLOps', 'ComputerVision', 'NLP_Pipelines'],
    compatibleWith: ['model-tensorflow', 'training-vertex']
  },
  {
    id: 'experiment-sacred',
    name: 'Sacred',
    category: 'Experiment Management',
    vendor: 'Open Source',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Tool to configure, organize, log and reproduce experiments',
    useCases: ['MLOps', 'NLP_Pipelines', 'ComputerVision'],
    compatibleWith: ['model-pytorch', 'model-jupyter']
  },

  // PIPELINE ORCHESTRATION LAYER
  {
    id: 'pipeline-airflow',
    name: 'Apache Airflow',
    category: 'Workflow Orchestration',
    vendor: 'Apache Foundation',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Platform to programmatically author, schedule, and monitor workflows',
    useCases: ['MLOps', 'DataEngineering', 'AIOps'],
    compatibleWith: ['training-kubeflow', 'data-databricks']
  },
  {
    id: 'pipeline-prefect',
    name: 'Prefect',
    category: 'Workflow Orchestration',
    vendor: 'Prefect',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Modern workflow orchestration with Python-native approach',
    useCases: ['MLOps', 'DataEngineering', 'AIOps'],
    compatibleWith: ['model-jupyter', 'data-databricks']
  },
  {
    id: 'pipeline-dagster',
    name: 'Dagster',
    category: 'Data Orchestrator',
    vendor: 'Elementl',
    deploymentType: 'OpenSource',
    maturity: 'Growth',
    description: 'Cloud-native orchestrator for data assets and ML pipelines',
    useCases: ['MLOps', 'DataEngineering', 'AIOps'],
    compatibleWith: ['data-dbt', 'model-jupyter']
  },
  {
    id: 'pipeline-metaflow',
    name: 'Metaflow',
    category: 'ML Workflow',
    vendor: 'Netflix / Outerbounds',
    deploymentType: 'Hybrid',
    maturity: 'Growth',
    description: 'Human-centric framework for data science workflows',
    useCases: ['MLOps', 'RecommendationSystems', 'DemandForecasting'],
    compatibleWith: ['training-aws-sagemaker', 'model-pytorch']
  },
  {
    id: 'pipeline-argo',
    name: 'Argo Workflows',
    category: 'Container Orchestration',
    vendor: 'Intuit',
    deploymentType: 'OpenSource',
    maturity: 'Enterprise',
    description: 'Container-native workflow engine for Kubernetes',
    useCases: ['MLOps', 'AIOps', 'GenerativeAI'],
    compatibleWith: ['training-kubeflow', 'serving-kserving']
  },
  {
    id: 'pipeline-gitlab',
    name: 'GitLab CI/CD',
    category: 'CI/CD Platform',
    vendor: 'GitLab',
    deploymentType: 'Hybrid',
    maturity: 'Enterprise',
    description: 'DevOps platform with built-in CI/CD for ML pipelines',
    useCases: ['MLOps', 'AIOps', 'LLMOps'],
    compatibleWith: ['training-kubeflow', 'serving-fastapi']
  },
  {
    id: 'pipeline-github',
    name: 'GitHub Actions',
    category: 'CI/CD Automation',
    vendor: 'GitHub',
    deploymentType: 'SaaS',
    maturity: 'Enterprise',
    description: 'Automated workflows for ML model training and deployment',
    useCases: ['MLOps', 'LLMOps', 'GenerativeAI'],
    compatibleWith: ['model-huggingface', 'serving-hf-inference']
  }
];

// Helper functions
export const getComponentsByUseCase = (useCase: AIUseCaseType): AIStackComponent[] => {
  return aiStackComponents.filter(comp => comp.useCases.includes(useCase));
};

export const getComponentsByLayer = (layer: AILayer): AIStackComponent[] => {
  const layerMapping: Record<AILayer, string[]> = {
    'DataEngineering': ['Data Lakehouse', 'Data Warehouse', 'ETL Service', 'Distributed Processing', 'Streaming Platform', 'Object Storage & Query', 'Data Labeling', 'Data Transformation', 'Storage Layer'],
    'FeatureStore': ['Feature Store', 'Feature Platform', 'Managed Feature Store'],
    'ModelDevelopment': ['Development Environment', 'IDE', 'Model Library', 'ML Framework', 'ML Library', 'Gradient Boosting', 'LLM Framework', 'RAG Framework'],
    'TrainingInfrastructure': ['ML Platform', 'ML Orchestration', 'Distributed Compute', 'GPU Infrastructure', 'GPU Cloud'],
    'ModelRegistry': ['ML Lifecycle', 'Model Registry', 'ML Metadata Store'],
    'ServingInference': ['Managed Inference', 'Model Serving', 'Model Server', 'Inference Server', 'Kubernetes Serving', 'Scalable Serving', 'Custom Serving', 'LLM API', 'Model API', 'NLP API', 'Vector Database'],
    'MonitoringObservability': ['ML Monitoring', 'Data Logging', 'ML Observability', 'Model Performance Management', 'Cloud Monitoring', 'APM & Observability', 'Experiment Tracking', 'Experiment Management', 'Open Monitoring', 'Visualization'],
    'SecurityGovernance': ['Data Validation', 'Privacy Tech', 'Bias Detection', 'Policy Enforcement', 'Model Documentation'],
    'ExperimentTracking': ['Experiment Tracking', 'Visualization', 'Experiment Management'],
    'PipelineOrchestration': ['Workflow Orchestration', 'Data Orchestrator', 'ML Workflow', 'Container Orchestration', 'CI/CD Platform', 'CI/CD Automation']
  };
  
  const categories = layerMapping[layer] || [];
  return aiStackComponents.filter(comp => categories.includes(comp.category));
};

export const getCompatibleComponents = (componentId: string): AIStackComponent[] => {
  const component = aiStackComponents.find(c => c.id === componentId);
  if (!component) return [];
  return aiStackComponents.filter(c => component.compatibleWith.includes(c.id));
};
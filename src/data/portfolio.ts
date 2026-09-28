export type SkillItem = {
  name: string;
  percentage: number;
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

export type Project = {
  title: string;
  slug: string;
  status: string;
  domain: string;
  backend?: string;
  summary: string;
  details: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  workflow: string[];
};

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Certification = {
  title: string;
  description: string;
  certificateUrl: string;
};

export const portfolio = {
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" }
  ],
  candidate: {
    name: "Shri Harihara Suthan M",
    role: "AI Developer / AI Developer Intern",
    location: "COIMBATORE, TAMIL NADU",
    email: "shrihari.m2006@gmail.com"
  },
  links: {
    github: "https://github.com/shrihari0118",
    linkedin: "https://www.linkedin.com/in/shri-harihara-suthan-2423b8282/"
  },
  hero: {
    summary:
      "Final-year B.Tech Information Technology student focused on practical AI application development, LLM-powered systems, RAG pipelines, FastAPI backends and production-minded AI engineering.",
    portrait: {
      src: "/images/shrihari-profile.jpg",
      alt: "Shri Harihara Suthan M",
      width: 720,
      height: 900
    },
    focusChips: [
      "LLM-powered applications",
      "RAG pipelines",
      "FastAPI AI backends",
      "AI automation",
      "Production-minded systems"
    ]
  },
  about:
    "Shri Harihara Suthan M is a final-year B.Tech Information Technology student focused on building practical AI systems that move beyond isolated demos. His work centers on LLM-powered applications, Retrieval-Augmented Generation pipelines, FastAPI backends and machine-learning workflows. He is especially interested in project-oriented engineering where AI agents, automation and API-driven systems solve real user problems with clear structure. Across study assistants, travel-planning tools and predictive simulation projects, he approaches development with a production mindset: reliable data flow, maintainable backend boundaries, measurable outputs and continuous engineering improvement. He continues to strengthen his foundations in databases, Linux, Git, Docker, cloud fundamentals and software design while turning emerging AI ideas into usable, well-organized applications.",
  skills: [
    {
      title: "Languages",
      skills: [
        { name: "Python", percentage: 88 },
        { name: "Java", percentage: 68 },
        { name: "JavaScript", percentage: 68 }
      ]
    },
    {
      title: "AI & LLMs",
      skills: [
        { name: "Machine Learning", percentage: 80 },
        { name: "Generative AI", percentage: 82 },
        { name: "RAG", percentage: 82 },
        { name: "Prompt Engineering", percentage: 80 }
      ]
    },
    {
      title: "Backend & APIs",
      skills: [
        { name: "FastAPI", percentage: 85 },
        { name: "REST APIs", percentage: 82 },
        { name: "Database Optimization", percentage: 68 }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", percentage: 78 },
        { name: "MongoDB", percentage: 75 }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS Fundamentals", percentage: 60 },
        { name: "Docker", percentage: 65 },
        { name: "Git / GitHub", percentage: 85 },
        { name: "Linux", percentage: 68 }
      ]
    },
    {
      title: "CS Fundamentals",
      skills: [
        { name: "DSA Basics", percentage: 68 },
        { name: "OOP", percentage: 78 }
      ]
    }
  ],
  projects: [
    {
      title: "AI Personal Study Assistant",
      slug: "ai-personal-study-assistant",
      status: "Completed / Active Project",
      domain: "Generative AI / RAG",
      backend: "FastAPI",
      summary:
        "Built a Retrieval-Augmented Generation study assistant for document-grounded question answering using FastAPI, LLMs, ChromaDB and Sentence Transformer embeddings.",
      details:
        "AI Personal Study Assistant accepts study document input, processes the content into usable text, chunks the material into retrieval-friendly segments and creates embeddings for semantic search. The system stores vectorized chunks in ChromaDB, retrieves the most relevant context for a learner's question, and passes that context into an LLM for grounded, context-aware question answering. A FastAPI layer exposes the RAG workflow through clean API boundaries so document processing, retrieval and response generation remain maintainable as the project evolves.",
      technologies: ["Python", "FastAPI", "RAG", "ChromaDB", "Sentence Transformers", "LLMs"],
      githubUrl: "https://github.com/shrihari0118/AI-PERSONAL-STUDY-ASSISTANT",
      liveUrl: "",
      workflow: [
        "01 Document Processing",
        "02 Chunking & Embeddings",
        "03 ChromaDB Vector Storage",
        "04 Semantic Retrieval",
        "05 LLM Context Generation",
        "06 FastAPI API Layer"
      ]
    },
    {
      title: "Tripzy - AI Trip Planner",
      slug: "tripzy-ai-trip-planner",
      status: "Active / Ongoing",
      domain: "Generative AI / Travel Technology",
      backend: "FastAPI",
      summary:
        "Built an LLM-powered travel-planning platform that generates personalized itineraries through FastAPI, structured prompts and AI-driven recommendation workflows.",
      details:
        "Tripzy collects structured trip inputs, converts user preferences and destination constraints into prompt-ready context, and uses an LLM planning flow to generate personalized itinerary output. The backend combines prompt construction with deterministic application logic for validation, recommendation structure and REST API behavior. FastAPI exposes the planning workflow so generated recommendations can be integrated cleanly with a frontend or future travel-planning interface.",
      technologies: ["Python", "FastAPI", "LLMs", "Prompt Engineering", "REST APIs"],
      githubUrl: "https://github.com/shrihari0118/TRIPZY-AI",
      liveUrl: "",
      workflow: [
        "01 Trip Input",
        "02 Prompt / Context Builder",
        "03 LLM Planning",
        "04 Recommendation Logic",
        "05 FastAPI Backend",
        "06 Itinerary Output"
      ]
    },
    {
      title: "Forest Fire Prediction & Simulation",
      slug: "forest-fire-prediction",
      status: "Research / Prototype",
      domain: "Machine Learning / Environmental AI",
      backend: "",
      summary:
        "Developed a deep-learning-based forest-fire prediction and simulation system using U-Net, LSTM and Cellular Automata concepts to support emergency-response planning.",
      details:
        "Forest Fire Prediction & Simulation focuses on environmental and geospatial data that can inform fire-risk modeling. The workflow covers preprocessing input factors, applying U-Net and LSTM concepts for prediction, analyzing fire-risk patterns, and using Cellular Automata to simulate possible spread behavior. The resulting visualization and response-oriented output are intended to support emergency-response planning by making risk areas and scenario movement easier to interpret.",
      technologies: ["Python", "Machine Learning", "Deep Learning", "U-Net", "LSTM", "Cellular Automata"],
      githubUrl: "",
      liveUrl: "",
      workflow: [
        "01 Environmental Data",
        "02 Data Preprocessing",
        "03 U-Net / LSTM Prediction",
        "04 Fire-Risk Analysis",
        "05 Cellular Automata Simulation",
        "06 Visualization / Response Output"
      ]
    }
  ],
  experience: {
    company: "Yaane Technologies",
    role: "AI-Enabled Engineering Intern",
    period: "Jun 2025 - Jul 2025",
    description:
      "Worked on AI-enabled engineering workflows with structured exposure to professional software development. The internship included Bolt.new research, rapid prototyping, AI-assisted development and productivity analysis across practical development tasks. Shri collaborated with teammates, contributed to shared discussions, and observed how collaborative work, iteration and documentation support reliable delivery. The experience strengthened his understanding of how AI tools can accelerate application development while still requiring clear requirements, technical judgment and disciplined workflow."
  },
  certifications: [
    {
      title: "Oracle Certified Foundations Associate - AI Foundations",
      description: "Credential covering foundational AI concepts, terminology and applied understanding of modern intelligent systems.",
      certificateUrl: ""
    },
    {
      title: "Introduction to Amazon Web Services",
      description: "Training in cloud computing principles, AWS core services and platform fundamentals for application deployment.",
      certificateUrl: ""
    },
    {
      title: "CodeAlpha Certificate of Completion",
      description: "Certificate recognizing completion and outstanding performance across assigned software-development work.",
      certificateUrl: ""
    }
  ],
  education: [
    {
      degree: "B.Tech, Information Technology",
      institution: "KGiSL Institute of Technology, Coimbatore",
      period: "2023 - Present",
      detail: "CGPA: 8.36",
      description:
        "Final-year IT program building foundations across software engineering, databases, algorithms, web technologies and AI-focused application development."
    },
    {
      degree: "Higher Secondary Certificate - Computer Science",
      institution: "National Model Matriculation Higher Secondary School, Coimbatore",
      period: "2022 - 2023",
      detail: "",
      description: ""
    }
  ],
  contact: {
    heading: "Let's Build Something Together",
    description:
      "I'm open to AI development opportunities, internships, collaborative projects and conversations around building practical intelligent systems. If you'd like to discuss an opportunity, project or technical collaboration, feel free to reach out.",
    formProvider: "Web3Forms",
    environmentVariable: "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY"
  }
} as const;

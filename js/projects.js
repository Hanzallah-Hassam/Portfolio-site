// Project Data and Filtering System
const projectsData = [
    {
        id: 1,
        title: 'AI Customer Support Bot',
        category: 'chatbots',
        shortDescription: 'Intelligent chatbot that handles customer inquiries with 90% accuracy, reducing response time by 70%.',
        fullDescription: 'Developed a sophisticated AI-powered customer support chatbot using LangChain and OpenAI GPT-4. The system integrates with existing CRM databases and provides contextual, accurate responses to customer queries. Features include sentiment analysis, multi-language support, and seamless handoff to human agents when needed. The bot successfully handles over 1000 conversations daily with a 90% customer satisfaction rate.',
        techStack: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'PostgreSQL', 'Redis'],
        image: 'assets/images/project-1.jpg',
        features: [
            'Natural language understanding with context awareness',
            'Integration with existing CRM and ticketing systems',
            'Multi-language support (10+ languages)',
            'Sentiment analysis for priority routing',
            'Real-time analytics dashboard',
            'Seamless human agent handoff'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    },
    {
        id: 2,
        title: 'Autonomous Research Agent',
        category: 'ai-agents',
        shortDescription: 'Self-directed AI agent that conducts comprehensive research, analyzes data, and generates detailed reports.',
        fullDescription: 'Created an autonomous AI research agent using AutoGen and GPT-4 that can independently plan and execute complex research tasks. The agent breaks down research objectives, searches multiple data sources, synthesizes information, and produces well-structured reports. It uses Pinecone for vector storage and retrieval, enabling efficient handling of large knowledge bases. The system has been used for market research, competitive analysis, and academic literature reviews.',
        techStack: ['Python', 'AutoGen', 'GPT-4', 'Pinecone', 'BeautifulSoup', 'Pandas'],
        image: 'assets/images/project-2.jpg',
        features: [
            'Autonomous task planning and execution',
            'Multi-source data aggregation and synthesis',
            'Advanced web scraping with respect for robots.txt',
            'Vector-based semantic search',
            'Citation tracking and source verification',
            'Customizable report templates'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    },
    {
        id: 3,
        title: 'Sentiment Analysis Pipeline',
        category: 'nlp-tools',
        shortDescription: 'Real-time sentiment analysis system processing 100K+ social media posts daily with 95% accuracy.',
        fullDescription: 'Built a robust sentiment analysis pipeline using state-of-the-art NLP models from HuggingFace and SpaCy. The system processes social media feeds, customer reviews, and survey responses in real-time, providing actionable insights through a comprehensive dashboard. Deployed on AWS with auto-scaling capabilities to handle traffic spikes. Features multi-aspect sentiment analysis, emotion detection, and trend identification.',
        techStack: ['Python', 'HuggingFace', 'SpaCy', 'AWS Lambda', 'DynamoDB', 'Streamlit'],
        image: 'assets/images/project-3.jpg',
        features: [
            'Real-time processing with < 100ms latency',
            'Multi-aspect sentiment analysis',
            'Emotion detection (joy, anger, sadness, etc.)',
            'Trend identification and alerting',
            'Interactive visualization dashboard',
            'API for third-party integrations'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    },
    {
        id: 4,
        title: 'E-commerce Data Warehouse',
        category: 'data-engineering',
        shortDescription: 'Scalable data warehouse processing 10M+ daily transactions with advanced analytics capabilities.',
        fullDescription: 'Designed and implemented a cloud-native data warehouse using Snowflake and dbt for a large e-commerce platform. The solution consolidates data from 15+ sources including transactional databases, marketing platforms, and customer service systems. Built ETL pipelines using Python and Airflow, with data quality checks at every stage. The warehouse powers business intelligence dashboards and ML models, enabling data-driven decision making across the organization.',
        techStack: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'AWS', 'Tableau'],
        image: 'assets/images/project-4.jpg',
        features: [
            'Multi-source data integration (15+ sources)',
            'Automated ETL pipelines with error handling',
            'Data quality monitoring and alerting',
            'Dimensional modeling for analytics',
            'Real-time data streaming for critical metrics',
            'Role-based access control and audit logging'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    },
    {
        id: 5,
        title: 'Real-time Chat Application',
        category: 'full-stack',
        shortDescription: 'Feature-rich chat application supporting 10K+ concurrent users with end-to-end encryption.',
        fullDescription: 'Developed a modern, scalable chat application using React, Node.js, and Socket.io. Features include real-time messaging, group chats, file sharing, and end-to-end encryption. The backend uses MongoDB for data persistence and Redis for session management and caching. Implemented WebRTC for video/audio calls. The application is containerized with Docker and deployed on Kubernetes for high availability and automatic scaling.',
        techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
        image: 'assets/images/project-5.jpg',
        features: [
            'Real-time messaging with typing indicators',
            'Group chats and channels',
            'End-to-end encryption for privacy',
            'File sharing with drag-and-drop',
            'Video and audio calling (WebRTC)',
            'Message search and threading',
            'Custom emoji and reactions',
            'Mobile-responsive design'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    },
    {
        id: 6,
        title: 'Document Q&A System',
        category: 'chatbots',
        shortDescription: 'RAG-powered chatbot that answers questions from enterprise documents with source citations.',
        fullDescription: 'Created an intelligent document question-answering system using Retrieval-Augmented Generation (RAG). The system ingests various document formats (PDF, DOCX, TXT), processes them using advanced chunking strategies, and stores embeddings in ChromaDB. Users can ask natural language questions and receive accurate answers with source citations. Built a user-friendly interface using Streamlit, with features for document management, query history, and answer quality feedback.',
        techStack: ['Python', 'RAG', 'ChromaDB', 'Streamlit', 'LangChain', 'OpenAI'],
        image: 'assets/images/project-6.jpg',
        features: [
            'Multi-format document ingestion (PDF, DOCX, TXT)',
            'Advanced text chunking and embedding',
            'Semantic search with vector similarity',
            'Source citation and confidence scoring',
            'Query history and bookmarking',
            'Answer quality feedback loop',
            'Document version tracking',
            'Custom fine-tuning capabilities'
        ],
        demoUrl: '#',
        sourceUrl: '#'
    }
];

// Project filtering and rendering
(function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    let currentFilter = 'all';
    let currentProjectIndex = 0;
    
    // Render projects
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);
        
        // Fade out current projects
        const currentCards = projectsGrid.querySelectorAll('.project-card');
        currentCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-out');
            }, index * 50);
        });
        
        // Wait for fade out, then update grid
        setTimeout(() => {
            projectsGrid.innerHTML = '';
            
            filteredProjects.forEach((project, index) => {
                const card = createProjectCard(project);
                projectsGrid.appendChild(card);
                
                // Staggered fade in
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }, 300);
    }
    
    // Create project card HTML
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card animate-on-scroll';
        card.dataset.projectId = project.id;
        
        card.innerHTML = `
            <div class="relative">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x200/22D3EE/FFFFFF?text=${encodeURIComponent(project.title)}'">
                <span class="category-badge">${formatCategory(project.category)}</span>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${project.shortDescription}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.techStack.slice(0, 3).map(tech => `
                        <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">${tech}</span>
                    `).join('')}
                    ${project.techStack.length > 3 ? `<span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">+${project.techStack.length - 3}</span>` : ''}
                </div>
                <button class="text-cyan-500 hover:text-cyan-600 font-medium text-sm flex items-center transition-colors">
                    View Details
                    <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        `;
        
        card.addEventListener('click', () => openProjectModal(project));
        
        return card;
    }
    
    // Format category for display
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Open project modal
    function openProjectModal(project) {
        currentProjectIndex = projectsData.findIndex(p => p.id === project.id);
        
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-6" onerror="this.src='https://via.placeholder.com/800x300/22D3EE/FFFFFF?text=${encodeURIComponent(project.title)}'">
            
            <div class="flex items-center justify-between mb-4">
                <span class="category-badge">${formatCategory(project.category)}</span>
                <div class="flex gap-2">
                    <button id="prevProject" class="w-10 h-10 bg-gray-100 hover:bg-cyan-500 hover:text-white rounded-full flex items-center justify-center transition-colors" title="Previous project">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button id="nextProject" class="w-10 h-10 bg-gray-100 hover:bg-cyan-500 hover:text-white rounded-full flex items-center justify-center transition-colors" title="Next project">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900 mb-4">${project.title}</h2>
            
            <p class="text-gray-600 mb-6 leading-relaxed">${project.fullDescription}</p>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Tech Stack</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.techStack.map(tech => `
                        <span class="tech-badge text-sm">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul class="space-y-2">
                    ${project.features.map(feature => `
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-cyan-500 mt-1 mr-3"></i>
                            <span class="text-gray-600">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="flex gap-4">
                <a href="${project.demoUrl}" class="btn-primary" target="_blank" rel="noopener">
                    <i class="fas fa-external-link-alt mr-2"></i>
                    Live Demo
                </a>
                <a href="${project.sourceUrl}" class="btn-secondary" target="_blank" rel="noopener">
                    <i class="fab fa-github mr-2"></i>
                    Source Code
                </a>
            </div>
        `;
        
        // Add navigation handlers
        document.getElementById('prevProject').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateProject(-1);
        });
        
        document.getElementById('nextProject').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateProject(1);
        });
        
        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Navigate between projects in modal
    function navigateProject(direction) {
        currentProjectIndex = (currentProjectIndex + direction + projectsData.length) % projectsData.length;
        openProjectModal(projectsData[currentProjectIndex]);
    }
    
    // Close modal
    function closeProjectModal() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Modal close handlers
    projectModal.querySelector('.modal-close').addEventListener('click', closeProjectModal);
    projectModal.querySelector('.modal-overlay').addEventListener('click', closeProjectModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeProjectModal();
        }
        // Arrow key navigation in modal
        if (!projectModal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') navigateProject(-1);
            if (e.key === 'ArrowRight') navigateProject(1);
        }
    });
    
    // Filter button handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            currentFilter = filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Render filtered projects
            renderProjects(filter);
        });
    });
    
    // Initial render
    renderProjects();
})();

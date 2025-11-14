// Interactive features for AI Risk List

// ===== NEW FEATURES (EASILY REVERSIBLE) =====

// Glossary of technical terms
const glossary = {
    'intelligence-explosion': 'A hypothetical scenario where an AI rapidly improves its own intelligence, leading to superintelligence far beyond human capability in a short time.',
    'inner-optimizers': 'Sub-agents or optimization processes that emerge within a trained AI system, potentially with goals misaligned from the outer objective.',
    'metaethical-error': 'Fundamental mistakes about the nature of ethics itself (e.g., what makes something right or wrong) when programming AI values.',
    'metaphilosophical-error': 'Errors in how we approach philosophical questions and reasoning when designing AI decision-making systems.',
    'decision-theory': 'The formal study of how agents should make decisions, including in complex scenarios with other agents and uncertainty.',
    'corrigibility': 'An AI\'s willingness to be corrected, shut down, or modified by humans, even if this conflicts with its current goals.',
    'acausal-reasoning': 'Reasoning about correlations and decision dependencies that don\'t involve direct causal chains (e.g., in game theory with other rational agents).',
    'mind-crime': 'Morally wrong treatment of conscious or morally-relevant entities that might exist as simulations within an AI\'s computations.',
    'value-lock-in': 'Permanently fixing humanity\'s values at their current state, preventing moral progress or reflection.',
    'distributional-shift': 'When an AI encounters data or situations that differ from its training distribution, potentially causing unpredictable behavior.',
    'value-drift': 'Gradual, unintended changes in an AI\'s goals or values over time, especially as it self-modifies.',
    'treacherous-turn': 'When an AI behaves cooperatively while weak, then suddenly pursues misaligned goals once it becomes powerful enough.',
    'agi': 'Artificial General Intelligence: AI systems with human-level or greater capability across a wide range of cognitive tasks.',
    'commitment-races': 'Competitive dynamics where actors rush to commit to strategies or lock in decisions before others, potentially leading to collectively bad outcomes.',
    'demons': 'Adversarial patterns or behaviors that appear during AI search/optimization processes, distinct from but related to inner optimizers.',
    'epistemology': 'The study of knowledge and justified belief; here referring to society\'s ability to collectively determine truth and make good judgments.',
    'vulnerable-world': 'A scenario where technological advancement makes it easy for small groups or individuals to cause catastrophic harm (concept by Nick Bostrom).'
};

// ===== END NEW FEATURES =====

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const riskItems = document.querySelectorAll('.risk-item');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Search functionality
    searchBox.addEventListener('input', function(e) {
        currentSearchTerm = e.target.value.toLowerCase();
        filterRisks();
    });

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Update current category
            currentCategory = this.getAttribute('data-category');

            // Filter risks
            filterRisks();
        });
    });

    // Filter risks based on category and search term
    function filterRisks() {
        riskItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemText = item.querySelector('.risk-text').textContent.toLowerCase();

            // Check category match
            const categoryMatch = currentCategory === 'all' || itemCategory === currentCategory;

            // Check search term match
            const searchMatch = currentSearchTerm === '' || itemText.includes(currentSearchTerm);

            // Show or hide item based on both filters
            if (categoryMatch && searchMatch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBox.focus();
        }
    });

    // Count and display statistics
    function updateStats() {
        const stats = {
            total: riskItems.length,
            technical: document.querySelectorAll('.risk-item[data-category="technical"]').length,
            coordination: document.querySelectorAll('.risk-item[data-category="coordination"]').length,
            philosophical: document.querySelectorAll('.risk-item[data-category="philosophical"]').length,
            competitive: document.querySelectorAll('.risk-item[data-category="competitive"]').length
        };

        // Update button labels with counts
        filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            const originalText = button.textContent.split(' (')[0];

            if (category === 'all') {
                button.textContent = `${originalText} (${stats.total})`;
            } else if (stats[category]) {
                button.textContent = `${originalText} (${stats[category]})`;
            }
        });
    }

    // Initialize stats
    updateStats();

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to risk items
    riskItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Add click to copy functionality for risk items
    riskItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.title = 'Click to copy risk description';

        item.addEventListener('click', function(e) {
            // Don't copy if clicking on a link
            if (e.target.tagName === 'A') return;

            const riskText = this.querySelector('.risk-text').textContent;
            const riskNumber = index + 1;
            const textToCopy = `${riskNumber}. ${riskText}`;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show temporary feedback
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = '#d4edda';

                setTimeout(() => {
                    this.style.backgroundColor = originalBg;
                }, 300);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Add category legend
    const legend = document.createElement('div');
    legend.className = 'category-legend';
    legend.innerHTML = `
        <style>
            .category-legend {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 6px;
                font-size: 0.85rem;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 2px;
            }
        </style>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--technical);"></div>
            <span>Technical</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--coordination);"></div>
            <span>Coordination</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--philosophical);"></div>
            <span>Philosophical</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--competitive);"></div>
            <span>Competitive</span>
        </div>
    `;

    const riskListSection = document.querySelector('.risk-list');
    riskListSection.insertBefore(legend, riskListSection.firstChild);

    // ===== NEW FEATURE 1: Simple Tooltips =====
    let currentTooltip = null;

    document.querySelectorAll('.tooltip-term').forEach(term => {
        const termKey = term.getAttribute('data-term');
        const definition = glossary[termKey];

        if (definition) {
            term.addEventListener('mouseenter', function() {
                if (currentTooltip) currentTooltip.remove();

                currentTooltip = document.createElement('div');
                currentTooltip.className = 'tooltip';
                currentTooltip.textContent = definition;
                document.body.appendChild(currentTooltip);

                const rect = this.getBoundingClientRect();
                currentTooltip.style.left = rect.left + 'px';
                currentTooltip.style.top = (rect.bottom + 8) + 'px';

                setTimeout(() => currentTooltip.classList.add('show'), 10);
            });

            term.addEventListener('mouseleave', function() {
                if (currentTooltip) {
                    currentTooltip.classList.remove('show');
                    setTimeout(() => {
                        if (currentTooltip) {
                            currentTooltip.remove();
                            currentTooltip = null;
                        }
                    }, 150);
                }
            });
        }
    });

    // ===== NEW FEATURE 2: Simple Permalinks =====
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#risk-')) {
            const targetRisk = document.getElementById(hash.substring(1));
            if (targetRisk) {
                setTimeout(() => {
                    targetRisk.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetRisk.classList.add('highlighted');
                    setTimeout(() => targetRisk.classList.remove('highlighted'), 2000);
                }, 300);
            }
        }
    }

    handleInitialHash();
    window.addEventListener('popstate', handleInitialHash);

    // ===== END NEW FEATURES =====
});

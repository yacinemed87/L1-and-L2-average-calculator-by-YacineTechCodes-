// semester4.js - Specific code for Semester 4

// Toggle module configurations for modules with TD + TP

// Database toggle config
const dbToggleConfig = {
    moduleId: 'database',
    title: 'Database',
    coefficient: 2,
    mergedMode: {
        fields: [
            { name: 'dbControl', placeholder: 'Control (70%)' },
            { name: 'dbTdTp', placeholder: 'TD + TP (30%)' }
        ]
    },
    separateMode: {
        fields: [
            { name: 'dbControl', placeholder: 'Control (70%)' },
            { name: 'dbTd', placeholder: 'TD (15%)' },
            { name: 'dbTp', placeholder: 'TP (15%)' }
        ]
    }
};

// Operating Systems toggle config
const osToggleConfig = {
    moduleId: 'os',
    title: 'Operating Systems',
    coefficient: 3,
    mergedMode: {
        fields: [
            { name: 'osControl', placeholder: 'Control (67%)' },
            { name: 'osTdTp', placeholder: 'TD + TP (33%)' }
        ]
    },
    separateMode: {
        fields: [
            { name: 'osControl', placeholder: 'Control (67%)' },
            { name: 'osTd', placeholder: 'TD (16.5%)' },
            { name: 'osTp', placeholder: 'TP (16.5%)' }
        ]
    }
};

// Network Communication toggle config
const networkToggleConfig = {
    moduleId: 'network',
    title: 'Network Communication',
    coefficient: 3,
    mergedMode: {
        fields: [
            { name: 'networkControl', placeholder: 'Control (60%)' },
            { name: 'networkTdTp', placeholder: 'TD + TP (40%)' }
        ]
    },
    separateMode: {
        fields: [
            { name: 'networkControl', placeholder: 'Control (60%)' },
            { name: 'networkTd', placeholder: 'TD (20%)' },
            { name: 'networkTp', placeholder: 'TP (20%)' }
        ]
    }
};


// Initialize state for Semester 4 (include all possible fields)
const state = initializeState({
    // Unit 1
    dbControl: '',
    dbTdTp: '',          // Merged mode
    dbTd: '',            // Separate mode - TD
    dbTp: '',            // Separate mode - TP
    osControl: '',
    osTdTp: '',          // Merged mode
    osTd: '',            // Separate mode - TD
    osTp: '',            // Separate mode - TP
    swEngControl: '', swEngTd: '',

    // Unit 2
    graphTheoryControl: '', graphTheoryTd: '',
    networkControl: '',
    networkTdTp: '',     // Merged mode
    networkTd: '',       // Separate mode - TD
    networkTp: '',       // Separate mode - TP
    webDevControl: '', webDevTp: '',

    // Unit 3
    legalControl: '',
    english3Control: ''
});

// References to toggle module controllers
let dbToggle = null;
let osToggle = null;
let networkToggle = null;


// Calculation Formulas
const formulas = {
    Database: values => {
        if (dbToggle && dbToggle.isMerged()) {
            return 0.70 * values.dbControl + 0.30 * values.dbTdTp;
        } else {
            return 0.70 * values.dbControl + 0.15 * values.dbTd + 0.15 * values.dbTp;
        }
    },
    OperatingSystems: values => {
        if (osToggle && osToggle.isMerged()) {
            return 0.67 * values.osControl + 0.33 * values.osTdTp;
        } else {
            return 0.67 * values.osControl + 0.165 * values.osTd + 0.165 * values.osTp;
        }
    },
    SoftwareEngineering: values => 0.67 * values.swEngControl + 0.33 * values.swEngTd,
    GraphTheory: values => 0.70 * values.graphTheoryControl + 0.30 * values.graphTheoryTd,
    NetworkCommunication: values => {
        if (networkToggle && networkToggle.isMerged()) {
            return 0.60 * values.networkControl + 0.40 * values.networkTdTp;
        } else {
            return 0.60 * values.networkControl + 0.20 * values.networkTd + 0.20 * values.networkTp;
        }
    },
    WebDevelopment: values => 0.50 * values.webDevControl + 0.50 * values.webDevTp,
    LegalAspects: values => 1.00 * values.legalControl,
    English3: values => 1.00 * values.english3Control
};

// Module name mapping
const moduleNames = {
    'Database': 'Database',
    'Operating Systems': 'OperatingSystems',
    'Software Engineering': 'SoftwareEngineering',
    'Graph Theory': 'GraphTheory',
    'Network Communication': 'NetworkCommunication',
    'Web Development': 'WebDevelopment',
    'Legal & Economic Aspects': 'LegalAspects',
    'English 3': 'English3'
};

// Update calculations for Semester 4
function updateCalculations() {
    const numbers = parseGrades(state.grades);

    // Module grades
    state.results.modules = {
        Database: formulas.Database(numbers),
        OperatingSystems: formulas.OperatingSystems(numbers),
        SoftwareEngineering: formulas.SoftwareEngineering(numbers),
        GraphTheory: formulas.GraphTheory(numbers),
        NetworkCommunication: formulas.NetworkCommunication(numbers),
        WebDevelopment: formulas.WebDevelopment(numbers),
        LegalAspects: formulas.LegalAspects(numbers),
        English3: formulas.English3(numbers)
    };

    // Unit averages
    state.results.unit1 = (
        state.results.modules.Database * 2 +
        state.results.modules.OperatingSystems * 3 +
        state.results.modules.SoftwareEngineering * 2
    ) / 7;

    state.results.unit2 = (
        state.results.modules.GraphTheory * 2 +
        state.results.modules.NetworkCommunication * 3 +
        state.results.modules.WebDevelopment * 2
    ) / 7;

    state.results.unit3 = (
        state.results.modules.LegalAspects * 1 +
        state.results.modules.English3 * 1
    ) / 2;

    // Final result (total weighted average)
    state.results.finalResult = (
        state.results.modules.Database * 2 +
        state.results.modules.OperatingSystems * 3 +
        state.results.modules.SoftwareEngineering * 2 +
        state.results.modules.GraphTheory * 2 +
        state.results.modules.NetworkCommunication * 3 +
        state.results.modules.WebDevelopment * 2 +
        state.results.modules.LegalAspects * 1 +
        state.results.modules.English3 * 1
    ) / 16; // Total coefficients = 16

    updateDisplay(state, moduleNames);
}

// Initialize the page
function init() {
    // Create input handlers with specific state
    const handleInputFn = (e) => handleInput(e, state, updateCalculations);
    const handleBlurFn = (e) => handleBlur(e, state, updateCalculations);

    const unitSections = document.getElementById('unitSections');

    // =============================================
    // Unit 1: Fundamental (with toggleable modules)
    // =============================================
    const unit1Div = document.createElement('div');
    unit1Div.className = 'unit-section';

    const unit1Header = document.createElement('div');
    unit1Header.className = 'unit-header';
    const unit1Title = document.createElement('h2');
    unit1Title.textContent = 'Unit 1: Fundamental';
    const unit1Grade = document.createElement('span');
    unit1Grade.className = 'unit-grade';
    unit1Grade.textContent = '0.00';
    unit1Header.appendChild(unit1Title);
    unit1Header.appendChild(unit1Grade);
    unit1Div.appendChild(unit1Header);

    const unit1Grid = document.createElement('div');
    unit1Grid.className = 'grid md:grid-cols-3';

    // Database (toggleable)
    dbToggle = createToggleableModule(
        dbToggleConfig, state, updateCalculations, handleInputFn, handleBlurFn
    );
    unit1Grid.appendChild(dbToggle.element);

    // Operating Systems (toggleable)
    osToggle = createToggleableModule(
        osToggleConfig, state, updateCalculations, handleInputFn, handleBlurFn
    );
    unit1Grid.appendChild(osToggle.element);

    // Software Engineering (no toggle - only TD, no TP)
    unit1Grid.appendChild(createModule({
        title: 'Software Engineering',
        coefficient: 2,
        fields: [
            { name: 'swEngControl', placeholder: 'Control (67%)' },
            { name: 'swEngTd', placeholder: 'TD (33%)' }
        ]
    }, handleInputFn, handleBlurFn));

    unit1Div.appendChild(unit1Grid);
    unitSections.appendChild(unit1Div);

    // =============================================
    // Unit 2: Fundamental (with toggleable modules)
    // =============================================
    const unit2Div = document.createElement('div');
    unit2Div.className = 'unit-section';

    const unit2Header = document.createElement('div');
    unit2Header.className = 'unit-header';
    const unit2Title = document.createElement('h2');
    unit2Title.textContent = 'Unit 2: Fundamental';
    const unit2Grade = document.createElement('span');
    unit2Grade.className = 'unit-grade';
    unit2Grade.textContent = '0.00';
    unit2Header.appendChild(unit2Title);
    unit2Header.appendChild(unit2Grade);
    unit2Div.appendChild(unit2Header);

    const unit2Grid = document.createElement('div');
    unit2Grid.className = 'grid md:grid-cols-3';

    // Graph Theory (no toggle - only TD, no TP)
    unit2Grid.appendChild(createModule({
        title: 'Graph Theory',
        coefficient: 2,
        fields: [
            { name: 'graphTheoryControl', placeholder: 'Control (70%)' },
            { name: 'graphTheoryTd', placeholder: 'TD (30%)' }
        ]
    }, handleInputFn, handleBlurFn));

    // Network Communication (toggleable)
    networkToggle = createToggleableModule(
        networkToggleConfig, state, updateCalculations, handleInputFn, handleBlurFn
    );
    unit2Grid.appendChild(networkToggle.element);

    // Web Development (no toggle - only TP, no TD)
    unit2Grid.appendChild(createModule({
        title: 'Web Development',
        coefficient: 2,
        fields: [
            { name: 'webDevControl', placeholder: 'Control (50%)' },
            { name: 'webDevTp', placeholder: 'TP (50%)' }
        ]
    }, handleInputFn, handleBlurFn));

    unit2Div.appendChild(unit2Grid);
    unitSections.appendChild(unit2Div);

    // =============================================
    // Unit 3: Methodological
    // =============================================
    unitSections.appendChild(createUnit({
        title: 'Unit 3: Methodological',
        gridClass: 'md:grid-cols-2',
        modules: [
            {
                title: 'Legal & Economic Aspects',
                coefficient: 1,
                fields: [
                    { name: 'legalControl', placeholder: 'Control (100%)' }
                ]
            },
            {
                title: 'English 3',
                coefficient: 1,
                fields: [
                    { name: 'english3Control', placeholder: 'Control (100%)' }
                ]
            }
        ]
    }, handleInputFn, handleBlurFn));

    // =============================================
    // Custom save/load system with toggle mode detection
    // =============================================
    let savedGrades = JSON.parse(localStorage.getItem('savedGradesSemester4new')) || [];
    const savesList = document.getElementById('savesList');

    // Custom load handler with mode detection
    function customLoadGrades(save) {
        // Detect and apply correct modes for all toggle modules
        const allToggles = [
            { toggle: dbToggle, config: dbToggleConfig },
            { toggle: osToggle, config: osToggleConfig },
            { toggle: networkToggle, config: networkToggleConfig }
        ];

        allToggles.forEach(({ toggle, config }) => {
            const shouldBeMerged = detectToggleModeFromSave(save.grades, config);
            toggle.setMode(shouldBeMerged);
        });

        // Clear all values
        Object.keys(state.grades).forEach(key => {
            state.grades[key] = '';
            const input = document.querySelector(`input[name="${key}"]`);
            if (input) input.value = '';
        });

        // Load saved values
        Object.keys(save.grades).forEach(key => {
            if (key in state.grades) {
                const savedValue = save.grades[key];
                state.grades[key] = savedValue;
                const input = document.querySelector(`input[name="${key}"]`);
                if (input) {
                    input.value = savedValue !== '' ? savedValue : '';
                }
            }
        });

        updateCalculations();
        requestAnimationFrame(() => updateCalculations());
    }

    // Custom saves list renderer
    function updateSavesListCustom() {
        if (!savesList) return;
        savesList.innerHTML = '<h4>Saved Grades:</h4>';

        if (savedGrades.length === 0) {
            savesList.innerHTML += '<p>No saves found.</p>';
            return;
        }

        savedGrades.forEach((save, index) => {
            const saveItem = document.createElement('div');
            saveItem.className = 'save-item';

            const loadButton = document.createElement('button');
            loadButton.textContent = `${save.name} (${save.timestamp})`;
            loadButton.className = 'load-save-button';
            loadButton.addEventListener('click', () => {
                customLoadGrades(save);
                const loadBtn = document.getElementById('loadButton');
                if (loadBtn) {
                    const originalText = loadBtn.textContent;
                    loadBtn.textContent = 'Loaded!';
                    setTimeout(() => loadBtn.textContent = originalText, 2000);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️';
            deleteButton.className = 'delete-button';
            deleteButton.title = 'Delete this save';
            deleteButton.addEventListener('click', () => {
                if (confirm(`Delete save "${save.name}"?`)) {
                    savedGrades.splice(index, 1);
                    localStorage.setItem('savedGradesSemester4new', JSON.stringify(savedGrades));
                    updateSavesListCustom();
                }
            });

            saveItem.appendChild(loadButton);
            saveItem.appendChild(deleteButton);
            savesList.appendChild(saveItem);
        });
    }

    updateSavesListCustom();

    // Setup save button
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const saveName = prompt("Enter a name for this save:");
            if (!saveName || saveName.trim() === '') return;

            const saveData = {
                name: saveName.trim(),
                grades: { ...state.grades },
                timestamp: new Date().toLocaleString()
            };

            savedGrades.push(saveData);
            localStorage.setItem('savedGradesSemester4new', JSON.stringify(savedGrades));
            updateSavesListCustom();
            alert('Grades saved successfully!');
        });
    }

    // Setup load button
    const loadButton = document.getElementById('loadButton');
    if (loadButton) {
        loadButton.addEventListener('click', () => {
            if (savedGrades.length === 0) {
                alert("No saved grades found!");
                return;
            }
            updateSavesListCustom();
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', init);
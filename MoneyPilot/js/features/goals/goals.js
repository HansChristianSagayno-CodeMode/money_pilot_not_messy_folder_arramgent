import { data } from '../../core/state.js';
import { openModal, closeModal } from '../../core/navigation.js'; 

// --- LOCAL HELPERS (To prevent crash until you build a utils folder) ---
function formatPHP(num) {
    return '₱' + parseFloat(num).toLocaleString('en-PH', {minimumFractionDigits: 2});
}

function getEmptyState(msg, action, btnText) {
    return `
        <div class="empty-state">
            <p style="margin-bottom:1rem;">${msg}</p>
            <button class="btn btn-primary" onclick="${action}">${btnText}</button>
        </div>
    `;
}

// --- GOALS LOGIC ---
export function renderGoals() {
    const container = document.getElementById('goal-container');
    if(!container) return;
    
    if(data.goals.length === 0) {
        container.innerHTML = getEmptyState('No goals', "openModal('goalModal')", 'Add Goal');
        container.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    const income = data.records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
    const expense = data.records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
    const savings = Math.max(0, income - expense);

    container.innerHTML = data.goals.map(g => {
        const pct = Math.min(100, (savings / g.target) * 100);
        return `
        <div class="card">
            <div style="display:flex; gap:15px;">
                <div style="width:50px; height:50px; background:var(--primary-light); color:var(--primary); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
                    <i class="fa-solid ${g.icon}"></i>
                </div>
                <div style="flex:1;">
                    <div style="font-weight:700;">${g.name}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">Target: ${formatPHP(g.target)}</div>
                    <div style="margin-top:10px; height:6px; background:var(--bg-body); border-radius:10px; overflow:hidden;">
                        <div style="height:100%; width:${pct}%; background:var(--success);"></div>
                    </div>
                </div>
                <i class="fa-solid fa-trash" style="color:#cbd5e1; cursor:pointer;" onclick="alert('Delete functionality pending')"></i>
            </div>
        </div>
    `}).join('');
}

export function addGoal(e) {
    e.preventDefault();
    const icon = document.querySelector('input[name="goalIcon"]:checked').value;
    data.goals.push({
        id: Date.now(),
        name: document.getElementById('goalName').value,
        target: parseFloat(document.getElementById('goalTarget').value),
        date: document.getElementById('goalDate').value,
        icon: icon
    });
    renderGoals();
    closeModal('goalModal');
}

export function fillGoal(name, target) {
    document.getElementById('goalName').value = name;
    document.getElementById('goalTarget').value = target;
    calculateGoalAI();
}

export function calculateGoalAI() {
    const target = parseFloat(document.getElementById('goalTarget').value);
    const dateStr = document.getElementById('goalDate').value;
    const preview = document.getElementById('goalAIPreview');
    
    if(target && dateStr) {
        const months = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24 * 30);
        if(months <= 0) {
            preview.innerText = "Please choose a future date.";
            preview.style.color = "var(--danger)";
            return;
        }
        const monthly = target / months;
        preview.innerHTML = `To reach this, save <strong style="color:var(--primary)">${formatPHP(monthly)}</strong> per month.`;
        preview.style.color = "var(--text-main)";
    }
}

// Bind functions to window so the inline HTML handlers work
window.addGoal = addGoal;
window.fillGoal = fillGoal;
window.calculateGoalAI = calculateGoalAI;
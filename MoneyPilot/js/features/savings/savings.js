import { data } from '../../core/state.js';

// --- LOCAL HELPERS ---
function formatPHP(num) {
    return '₱' + parseFloat(num).toLocaleString('en-PH', {minimumFractionDigits: 2});
}

// --- SAVINGS PLANNER LOGIC ---
export function renderPlannerPage() {
    const goal = data.planner.mainGoal;
    document.getElementById('planner-main-goal').value = goal;
    
    let divisor = data.planner.period === 'Daily' ? 365 : data.planner.period === 'Weekly' ? 52 : 12;
    const perPeriod = goal / divisor;
    document.getElementById('planner-calc-result').innerHTML = `${formatPHP(perPeriod)} <span style="font-size:1rem; font-weight:400;">/ ${data.planner.period}</span>`;

    const container = document.getElementById('planner-items-list');
    const totalCost = data.planner.items.reduce((s,i) => s + i.cost, 0);
    document.getElementById('planner-count-badge').innerText = `${data.planner.items.length} / 9`;

    container.innerHTML = data.planner.items.length ? data.planner.items.map(i => `
        <div class="planner-list-item">
            <div><div style="font-weight:600;">${i.name}</div><div style="font-size:0.8rem; color:var(--text-muted);">${formatPHP(i.cost)}</div></div>
            <i class="fa-solid fa-times" style="color:var(--danger); cursor:pointer;" onclick="deleteItem('planner', ${i.id})"></i>
        </div>
    `).join('') : '<div style="text-align:center; padding:20px; color:var(--text-muted);">No items</div>';

    const donut = document.getElementById('planner-donut');
    if(donut) {
        const pct = goal > 0 ? (totalCost / goal) * 100 : 0;
        const color = pct > 100 ? 'var(--danger)' : 'var(--success)';
        donut.style.background = `conic-gradient(${color} 0% ${pct}%, var(--border) ${pct}% 100%)`;
        document.getElementById('planner-donut-val').innerText = Math.round(pct) + '%';
    }
}

export function updatePlannerSettings() {
    data.planner.mainGoal = parseFloat(document.getElementById('planner-main-goal').value) || 0;
    data.planner.period = document.getElementById('planner-period').value;
    renderPlannerPage();
}

export function addPlannerItem() {
    const name = document.getElementById('new-item-name').value;
    const cost = parseFloat(document.getElementById('new-item-cost').value);
    if(!name || !cost) { alert("Please enter name and cost"); return; }
    
    data.planner.items.push({ id: Date.now(), name, cost });
    document.getElementById('new-item-name').value = '';
    document.getElementById('new-item-cost').value = '';
    renderPlannerPage();
}

window.updatePlannerSettings = updatePlannerSettings;
window.addPlannerItem = addPlannerItem;
import { data } from '../../core/state.js';
import { openModal, closeModal } from '../../core/navigation.js'; 

// --- LOCAL HELPERS (Added here to prevent crash until you build a utils folder) ---
function formatPHP(num) {
    return '₱' + parseFloat(num).toLocaleString('en-PH', {minimumFractionDigits: 2});
}

function formatDate(str) {
    if(!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getEmptyState(msg, action, btnText) {
    return `
        <div class="empty-state">
            <p style="margin-bottom:1rem;">${msg}</p>
            <button class="btn btn-primary" onclick="${action}">${btnText}</button>
        </div>
    `;
}

// --- DEBTS LOGIC ---
export function renderDebts() {
    const container = document.getElementById('debt-container');
    if(!container) return;
    
    if(data.debts.length === 0) {
        container.innerHTML = getEmptyState('No debts', "openModal('debtModal')", 'Add Debt');
        container.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    container.innerHTML = data.debts.map(d => `
        <div class="card" style="border-left:4px solid var(--danger);">
            <div style="display:flex; justify-content:space-between;">
                <span style="font-weight:700;">${d.name}</span>
                <span class="filter-badge" style="background:#FEE2E2; color:var(--danger); border:none;">Due ${formatDate(d.date)}</span>
            </div>
            <h3 style="margin:10px 0;">${formatPHP(d.amount)}</h3>
            <button class="btn btn-outline" style="font-size:0.8rem; padding:6px;" onclick="alert('Delete functionality pending')">Paid</button>
        </div>
    `).join('');
}

export function addDebt(e) {
    e.preventDefault();
    data.debts.push({
        id: Date.now(),
        name: document.getElementById('debtName').value,
        amount: parseFloat(document.getElementById('debtAmount').value),
        date: document.getElementById('debtDate').value
    });
    renderDebts();
    closeModal('debtModal');
}

// Bind to window so HTML inline onclick still works
window.addDebt = addDebt;
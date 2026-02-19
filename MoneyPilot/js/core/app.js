import { initNavigation } from './navigation.js';
import { dummy_data, data } from './state.js'; // Imported data here for deleteItem
import { initDashboard } from '../features/dashboard.js';
import { renderDebts } from '../features/debts/debts.js';
import { renderGoals } from '../features/goals/goals.js';
import { renderBudgets } from '../features/budgets/budgets.js';
import { renderPlannerPage } from '../features/savings/savings.js';

export function renderAll() {
    renderDebts();
    renderGoals();
    renderBudgets();
    renderPlannerPage();
}


export function deleteItem(type, id) {
    if(confirm('Delete this item?')) {
        if(type === 'planner') {
            data.planner.items = data.planner.items.filter(i => i.id !== id);
        } else {
            data[type] = data[type].filter(item => item.id !== id);
        }
        renderAll();
    }
}
window.deleteItem = deleteItem; // Attach to window for HTML onClick

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initDashboard(dummy_data);
    renderAll();
});
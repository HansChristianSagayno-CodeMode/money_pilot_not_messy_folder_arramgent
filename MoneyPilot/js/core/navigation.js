export function initNavigation() {
    const navItems = document.querySelectorAll(".nav__item");
    const tabs = document.querySelectorAll(".tab");
    const pageTitle = document.querySelector(".page-title");

    navItems.forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove("active"));
            tabs.forEach(tab => tab.classList.remove("active"));

            this.classList.add("active");
            const target = this.dataset.tab;
            const selectedTab = document.getElementById(target);

            if (selectedTab) {
                selectedTab.classList.add("active");
            }
            pageTitle.textContent = this.textContent;
        });
    });
}

export function openModal(id) {
    document.getElementById(id).style.display = 'flex'; 
}

export function closeModal(id) {
    document.getElementById(id).style.display = 'none'; 
}

// Bind to window so HTML onclick="" works!
window.openModal = openModal;
window.closeModal = closeModal;
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

// function to handle checkboxes
function handleCheck(e) {
    
    let inBetween = false;

    if (e.shiftKey && this.checked) {

        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this;
}


// Event listener for checked box
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))

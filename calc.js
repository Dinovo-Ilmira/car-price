document.addEventListener('DOMContentLoaded', function() {
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const ownersSelect = document.getElementById('owners');
    const calculateButton = document.getElementById('calculate');
    const priceSpan = document.getElementById('price');

    brandSelect.addEventListener('change', function() {
        modelSelect.innerHTML = ''; 

        const selectedBrand = this.value;
        const models = {
            'Reno': ['Model A', 'Model B', 'Model C'],
            'Opel': ['Model X', 'Model Y', 'Model Z'],
            'Mazda': ['Model 1', 'Model 2', 'Model 3'],
            'Jaguar': ['Model I', 'Model II', 'Model III']
        };

        models[selectedBrand].forEach(function(model) {
            const option = document.createElement('option');
            option.textContent = model;
            option.value = model;
            modelSelect.appendChild(option);
        });
    });

    const conditionRadios = document.querySelectorAll('input[name="condition"]');
    conditionRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.value === 'used') {
                ownersSelect.disabled = false;
            } else {
                ownersSelect.disabled = true;
            }
        });
    });

    calculateButton.addEventListener('click', function() {
        const selectedBrand = brandSelect.value;
        const selectedModel = modelSelect.value;
        const selectedFuel = document.querySelector('input[name="fuel"]:checked').value;
        const engineVolume = parseFloat(document.getElementById('engine').value);
        const selectedCondition = document.querySelector('input[name="condition"]:checked').value;
        const selectedOwners = ownersSelect.value || 'n/a';
        const selectedPayments = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(el => el.value);

        let basePrice = 10000;
        let totalPrice = basePrice;
        totalPrice += engineVolume * 500; 
        if (selectedCondition === 'used') {
            totalPrice *= 0.8; 
            if (selectedOwners === '3+') {
                totalPrice *= 0.9; 
            }
        }
        selectedPayments.forEach(function(payment) {
            if (payment === 'card') {
                totalPrice *= 1.05; 
            } else if (payment === 'invoice') {
                totalPrice *= 0.95; 
            }
        });

        priceSpan.textContent = '$' + totalPrice.toFixed(2); 
    });
});

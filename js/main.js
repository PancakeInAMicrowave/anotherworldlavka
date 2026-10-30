const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
orderButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const productName = button.dataset.product;
		selectedProductInput.value = productName;
		orderDialog.showModal();
	});
});

closeDialogButton.addEventListener('click',() => {
	orderDialog.close();
});

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const emailInput = document.getElementById('order-email');
const phoneInput = document.getElementById('order-phone');
orderForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formElements = Array.from(orderForm.elements);

	formElements.forEach((element) => {
		if (element.willValida) {
			element.removeAttribute('aria-invalid');
		}
	});

	const hasEmail = emailInput.value.trim() !== '';
	const hasPhone = phoneInput.value.trim() !== '';
	if(!hasEmail && !hasPhone){
		phoneInput.setCustomValidity('Пожалуйста, укажите E-mail или телефон');
	}
	else{
		phoneInput.setCustomValidity('');
	}

	if (!orderForm.checkValidity()){
		formElements.forEach((element)=>{
			if(element.willValidate && !element.checkValidity()){
				element.setAttribute('aria-invalid', 'true');
			}
		});
		orderForm.reportValidity();
		return;
	}
	successMessage.hidden = false;
	orderForm.reset();
	orderDialog.close();
});
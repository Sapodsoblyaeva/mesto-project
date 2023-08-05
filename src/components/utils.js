function renderLoading(isLoading, buttonName) {
  if (isLoading) {
    buttonName.textContent = "Сохранение...";
  } else {
    buttonName.textContent = "Сохранить";
  }
}

function resetForm(formName) {
  formName.reset();
}

export { renderLoading, resetForm };

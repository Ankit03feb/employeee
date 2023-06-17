let employees = [];

const form = document.getElementById('employee-form');
const addedEmployeesDiv = document.getElementById('added-employees');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const professionInput = document.getElementById('profession');
  const ageInput = document.getElementById('age');

  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();

  if (name === '' || profession === '' || age === '') {
    showMessage('error', 'Please fill in all the fields.');
    return;
  }

  const newEmployee = {
    id: employees.length + 1,
    name: name,
    profession: profession,
    age: age
  };

  employees.push(newEmployee);
  renderEmployees();

  showMessage('success', 'Employee added successfully.');

  nameInput.value = '';
  professionInput.value = '';
  ageInput.value = '';
});

function renderEmployees() {
  addedEmployeesDiv.innerHTML = '';

  employees.forEach(function(employee) {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee');

    const employeeData = document.createElement('p');
    employeeData.textContent = `ID: ${employee.id}, Name: ${employee.name}, Profession: ${employee.profession}, Age: ${employee.age}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Employee';
    deleteButton.addEventListener('click', function() {
      deleteEmployee(employee.id);
      employeeDiv.remove();
    });

    employeeDiv.appendChild(employeeData);
    employeeDiv.appendChild(deleteButton);
    addedEmployeesDiv.appendChild(employeeDiv);
  });
}

function deleteEmployee(id) {
  employees = employees.filter(function(employee) {
    return employee.id !== id;
  });
}

function showMessage(type, message) {
  const messageDiv = document.createElement('div');
  
  if (type === 'success') {
    messageDiv.classList.add('success-message');
  } else if (type === 'error') {
    messageDiv.classList.add('error-message');
  }

  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  setTimeout(function() {
    messageDiv.remove();
  }, 3000);
}

renderEmployees();


const form = document.getElementById('resultForm');
const addButton = document.getElementById('add-result');
const searchInput = document.getElementById('searchInput');

// Validation constraints
const MIN_SCORE = 0;
const MAX_SCORE = 100;

let students = JSON.parse(localStorage.getItem('students')) || [];

// Load existing students on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTable(students);
    setupRealtimeValidation();
});

// Add event listener to the button instead of form submit if using button type="button"
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (validateAllInputs()) {
        addResult();
    } else {
        alert('Please correct the errors in the form before submitting.');
    }
});

// Search functionality
searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredStudents);
});

function setupRealtimeValidation() {
    const inputs = document.querySelectorAll('#resultForm input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
    });

    // Also validate name on blur
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('blur', function () {
        if (this.value.trim() === "") {
            setInvalid(this);
        } else {
            setValid(this);
        }
    });
}

function validateInput(e) {
    const input = e.target;
    const value = parseFloat(input.value);

    if (isNaN(value) || value < MIN_SCORE || value > MAX_SCORE) {
        setInvalid(input);
    } else {
        setValid(input);
    }
}

function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

function validateAllInputs() {
    let isValid = true;

    // Validate Name
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        setInvalid(nameInput);
        isValid = false;
    } else {
        setValid(nameInput);
    }

    // Validate Scores
    const scoreInputs = document.querySelectorAll('#resultForm input[type="number"]');
    scoreInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < MIN_SCORE || value > MAX_SCORE) {
            setInvalid(input);
            isValid = false;
        } else {
            setValid(input);
        }
    });

    return isValid;
}

function addResult() {

    var name = document.getElementById('name').value;
    var eng = Number(document.getElementById('eng').value);
    var fre = Number(document.getElementById('fre').value);
    var arabic = Number(document.getElementById('arabic').value);
    var math = Number(document.getElementById('math').value);
    var his = Number(document.getElementById('his').value);
    var ict = Number(document.getElementById('ict').value);

    var t = calcTotal(eng, fre, arabic, math, his, ict);
    var per = calcper(t);
    var g = getGrade(per);

    const newStudent = { name, eng, fre, arabic, math, his, ict, t, per, g };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Clear search and show all
    searchInput.value = '';
    renderTable(students);
    resetForm();

}

function calcTotal(eng, fre, arabic, math, his, ict) {

    var total = eng + fre + arabic + math + his + ict;
    return total;
}

function calcper(total) {
    var percentage = (total / 600) * 100;
    return percentage;

}

function getGrade(percentage) {
    var grade;
    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 85) {
        grade = "A";
    }
    else if (percentage >= 80) {
        grade = "B+";
    }
    else if (percentage >= 75) {
        grade = "B";
    }
    else if (percentage >= 70) {
        grade = "C+";
    }
    else if (percentage >= 65) {
        grade = "C";
    }
    else if (percentage >= 60) {
        grade = "D+";
    }
    else if (percentage >= 50) {
        grade = "D-";
    }
    else {
        grade = "F";
    }
    return grade;
}

function renderTable(data) {
    const tbody = document.querySelector('#results tbody');
    tbody.innerHTML = '';

    data.forEach(student => {
        var tr = document.createElement('tr');

        const createTd = (text) => {
            var td = document.createElement('td');
            td.innerHTML = text;
            tr.appendChild(td);
        };

        createTd(student.name);
        createTd(student.eng);
        createTd(student.fre);
        createTd(student.arabic);
        createTd(student.math);
        createTd(student.his);
        createTd(student.ict);
        createTd(student.t);
        createTd(Number(student.per).toFixed(2) + "%");
        createTd(student.g);

        tbody.appendChild(tr);
    });
}

function resetForm() {
    const inputs = document.querySelectorAll('#resultForm input');
    inputs.forEach(input => {
        input.value = "";
        input.classList.remove('is-valid', 'is-invalid');
    });
}

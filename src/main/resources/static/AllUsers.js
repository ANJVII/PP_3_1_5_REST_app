async function allUsers() {
    const users = await fetch('http://localhost:8080/admin/users');
    const listUsers = await users.json();

    console.log(listUsers);
    listUsers.forEach(user => allUsersHTML(user))
}

window.addEventListener('DOMContentLoaded', allUsers);

function allUsersHTML({id, name, surname, department, salary,phone, email, role}) {
    const tbody = document.getElementById('tableUsers');

    tbody.insertAdjacentHTML('beforeend', `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${surname}</td>
        <td>${department}</td>
        <td>${salary}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td style="text-align: center">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    th:data-bs-target="#editModal${id}">
                Edit
            </button>
        <td style="text-align: center">
            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                    th:data-bs-target="#deleteModal${id}">
                Delete
            </button>
        </td>`);
}
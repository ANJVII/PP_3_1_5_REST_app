async function allUsers() {
    const users = await fetch('http://localhost:8080/admin/users');
    const persist = await fetch('http://localhost:8080/user/profile');
    const listUsers = await users.json();
    const jsonPersist = await persist.json();

    aboutUser(jsonPersist);
    console.log(listUsers);
    listUsers.forEach(user => allUsersHTML(user))
}

window.addEventListener('DOMContentLoaded', allUsers);

function aboutUser({id, name, lastName, department, salary, phoneNumber, email, role}) {
    const topHeader = document.getElementById('topHeaderAdmin');
    const aboutAdmin = document.getElementById('oneAdmin');

    topHeader.insertAdjacentHTML('beforeend', `<span class="navbar-text" tabIndex="-1" aria-disabled="true"
        style="text-align: right"><b>${email}</b> with roles: ${role}</span>`)

    aboutAdmin.insertAdjacentHTML('beforeend', `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${lastName}</td>
        <td>${department}</td>
        <td>${salary}</td>
        <td>${phoneNumber}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td style="text-align: center">`)
}

function allUsersHTML({id, name, lastName, department, salary, phoneNumber, email, password, role}) {
    const tbody = document.getElementById('tableUsers');

    tbody.insertAdjacentHTML('beforeend', `<tr id="user-${id}">
        <td>${id}</td>
        <td>${name}</td>
        <td>${lastName}</td>
        <td>${department}</td>
        <td>${salary}</td>
        <td>${phoneNumber}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td style="text-align: center">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#editModal" data-bs-whatever="${id}" data-name="${name}" data-lastName="${lastName}"
                    data-department="${department}" data-salary="${salary}" data-phoneNumber="${phoneNumber}" data-email="${email}"
                    data-password="${password}" data-roles="${role}">
                Edit
            </button>
        <td style="text-align: center">
            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                    data-bs-target="#deleteModal" data-bs-whatever="${id}" data-name="${name}" data-lastName="${lastName}"
                    data-department="${department}" data-salary="${salary}" data-phoneNumber="${phoneNumber}" data-email="${email}"
                    data-password="${password}" data-roles="${role}">
                Delete
            </button>
        </td>`);
}
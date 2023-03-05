async function profile(id) {
    const users = await fetch(`http://localhost:8080/profile-${id}`);
    const oneUser = await users.json();

    console.log(oneUser);
    showUserHTML(oneUser);
}

window.addEventListener('DOMContentLoaded', profile);

function showUserHTML({id, name, surname, department, salary,phone, email, role}) {
    const tbody = document.getElementById('oneUser');
    const topHeader = document.getElementById('topHeader');

    tbody.insertAdjacentHTML('beforeend', `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${surname}</td>
        <td>${department}</td>
        <td>${salary}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td style="text-align: center">`);

    topHeader.insertAdjacentHTML('beforeend', `<span class="navbar-text" tabIndex="-1" aria-disabled="true">
        <b>${email}</b> with roles: ${role}</span>`)
}
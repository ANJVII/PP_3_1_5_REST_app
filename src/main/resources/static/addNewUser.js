document.getElementById("nav-New-user-tab").addEventListener('click', createNewRoles);

async function createNewRoles() {
    const roles = await fetch('http://localhost:8080/admin/roles');
    const rolesJson = await roles.json();
    rolesJson.forEach(role => {
        let element = document.createElement("option");
        element.text = role.name.substring(5);
        element.value = role.id;
        $('#roles')[0].appendChild(element);
    })
}

const addUserForm = document.querySelector('.add-new-user');
addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = addUserForm.name.value;
    const surname = addUserForm.lastName.value;
    const department = addUserForm.department.value;
    const salary = addUserForm.salary.value;
    const phoneNumber = addUserForm.phoneNumber.value;
    const email = addUserForm.email.value;
    const password = addUserForm.password.value;

    let rolesNewUser = [];
    for (let i = 0; i < addUserForm.roles.options.length; i++) {
        if (addUserForm.roles.options[i].selected) rolesNewUser.push({
            id: addUserForm.roles.options[i].value,
            name: addUserForm.roles.options[i].name
        });
    }

    const JsonBody = JSON.stringify({
        id: null,
        name: name,
        lastName: surname,
        department: department,
        salary: salary,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        roles: rolesNewUser
    });

    const userId = await fetch('http://localhost:8080/admin/saveUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JsonBody
    })


    addUserForm.reset();
    const userData = await userId.json();

    const res = await fetch(`http://localhost:8080/admin/profile-${userData}`);
    const dataRes = await res.json();
    document.getElementById("nav-All-users-tab").click();
    newUserHTML(dataRes);

    function newUserHTML({id, name, lastName, department, salary, phoneNumber, email, password, role}) {
        const tbodyNew = document.getElementById('tableUsers');
        tbodyNew.insertAdjacentHTML("beforeend", `<tr id="user-${id}">
                <td>${id}</td>
                <td>${name}</td>
                <td>${lastName}</td>
                <td>${department}</td>
                <td>${salary}</td>
                <td>${phoneNumber}</td>
                <td>${email}</td>
                <td>${role}</td>
                
                <td style="text-align: center">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"
                 data-bs-whatever="${id}" data-name="${name}" data-lastName="${lastName}" data-department="${department}"
                  data-salary="${salary}" data-phoneNumber="${phoneNumber}" data-email="${email}" data-password="${password}"
                   data-roles="${role}">
                </button>
                
                <td style="text-align: center">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                 data-bs-whatever="${id}" data-name="${name}" data-lastName="${lastName}" 
                 data-department="${department}" data-salary="${salary}" data-phoneNumber="${phoneNumber}" data-email="${email}" 
                 data-password="${password}" data-roles="${role}">Delete
                 </button>
                 </td>`)
    }
})
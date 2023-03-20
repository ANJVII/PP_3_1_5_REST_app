let booleanEditRoles = true;
const exampleModal = document.getElementById('editModal')
const editUser = document.querySelector('.edit-user-form')
exampleModal.addEventListener('show.bs.modal', async function (event) {
    // Кнопка, которая активировала модальное окно
    var button = event.relatedTarget
    // Извлечь информацию из атрибутов data-bs-* attributes
    var id = button.getAttribute('data-bs-whatever')
    var name = button.getAttribute('data-name')
    var lastName = button.getAttribute('data-lastName')
    var department = button.getAttribute('data-department')
    var salary = button.getAttribute('data-salary')
    var phoneNumber = button.getAttribute('data-phoneNumber')
    var email = button.getAttribute('data-email')
    var password = button.getAttribute('data-password')
    // При необходимости вы можете инициировать запрос AJAX здесь
    // а затем выполните обновление в обратном вызове.
    //
    console.log({id,name,lastName,department,salary,phoneNumber,email})
    // Обновите содержимое модального окна
    // var modalTitle = exampleModal.querySelector('.modal-title')
    var form = document.forms['formEditUser']
    form.id.value = id;
    form.name.value = name;
    form.lastName.value = lastName;
    form.department.value = department;
    form.salary.value = salary;
    form.phoneNumber.value = phoneNumber;
    form.email.value = email;
    form.password.value = password;


    const roles = await fetch('http://localhost:8080/admin/roles');
    const rolesJson = await roles.json();
    if(booleanEditRoles) {
        rolesJson.forEach(role => {
            let element = document.createElement("option");
            element.text = role.name.substring(5);
            element.value = role.id;
            $('#roleEdit')[0].appendChild(element);
        })
    }
    booleanEditRoles = false;
})

editUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    var form = document.forms['formEditUser']
    const id = form.id.value;
    const name = form.name.value;
    const surname = form.lastName.value;
    const department = form.department.value;
    const salary = form.salary.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(form.roles.options.length);

    let rolesNewUser = [];
    for (let i = 0; i < form.roles.options.length; i++) {
        if (form.roles.options[i].selected) rolesNewUser.push({
            id: form.roles.options[i].value,
            name: form.roles.options[i].name
        });
    }

    const JsonBodyEdit = JSON.stringify({
        id: id,
        name:name,
        lastName:surname,
        department:department,
        salary:salary,
        phoneNumber:phoneNumber,
        email:email,
        password:password,
        roles: rolesNewUser
    });
    console.log(JsonBodyEdit);

    const res = await fetch('http://localhost:8080/admin/updateUser', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JsonBodyEdit
    })

    const userId = await res.json();
    const resUser = await fetch(`http://localhost:8080/admin/profile-${userId}`);
    const dataUser = await resUser.json();
    newUserEdit(dataUser);

    function newUserEdit({id, name, lastName, department, salary, phoneNumber, email, password, role}) {
        document.getElementById(`user-${id}`).innerHTML = `<tr id="user-${id}">
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
                   data-roles="${role}"> Edit </button>
                
                <td style="text-align: center">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                 data-bs-whatever="${id}" data-name="${name}" data-lastName="${lastName}" 
                 data-department="${department}" data-salary="${salary}" data-phoneNumber="${phoneNumber}" data-email="${email}" 
                 data-password="${password}" data-roles="${role}">Delete
                 </button>
                 </td>
                 </tr>` ;

    }
})



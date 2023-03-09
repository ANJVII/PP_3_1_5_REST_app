let booleanDeleteRoles = true;
var exampleModalDelete = document.getElementById('deleteModal');
var buttonDel = document.getElementById('delete');
exampleModalDelete.addEventListener('show.bs.modal', async function (event) {
    // Кнопка, которая активировала модальное окно
    var buttonDelete = event.relatedTarget
    // Извлечь информацию из атрибутов data-bs-* attributes
    var id = buttonDelete.getAttribute('data-bs-whatever')
    var name = buttonDelete.getAttribute('data-name')
    var lastName = buttonDelete.getAttribute('data-lastName')
    var department = buttonDelete.getAttribute('data-department')
    var salary = buttonDelete.getAttribute('data-salary')
    var phoneNumber = buttonDelete.getAttribute('data-phoneNumber')
    var email = buttonDelete.getAttribute('data-email')
    var password = buttonDelete.getAttribute('data-password')
    // При необходимости вы можете инициировать запрос AJAX здесь
    // а затем выполните обновление в обратном вызове.
    //
    // Обновите содержимое модального окна
    var form = document.forms['formDeleteUser']
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
    if(booleanDeleteRoles) {
        rolesJson.forEach(role => {
            let element = document.createElement("option");
            element.text = role.name.substring(5);
            element.value = role.id;
            $('#roleDelete')[0].appendChild(element);
        })
        booleanDeleteRoles = false;
    }

    buttonDel.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            document.getElementById(`user-${id}`).remove();
        await fetch(`http://localhost:8080/admin/deleteUser-${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        }catch (Exception) {
        }
    })
})
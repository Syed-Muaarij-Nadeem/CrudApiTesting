const apiUrl = 'https://672dddc3fd897971564407e3.mockapi.io/hotalmanagement/e1/name';

$(document).ready(function () {
    // Fetch and display employee data
    function fetchEmployees() {
        $.get(apiUrl, function (employees) {
            $('#employeeList').empty();
            employees.forEach(employee => {
                const listItem = $(`
                    <li>
                        <div class="employee-details">
                            <div class="employee-name">${employee.name}</div>
                            <div class="employee-address">Address: ${employee.address}</div>
                            <div class="employee-designation">Designation: ${employee.designation}</div>
                        </div>
                        <div class="employee-buttons">
                            <button class="btn-warning edit-btn" data-id="${employee.id}">Edit</button>
                            <button class="btn-danger delete-btn" data-id="${employee.id}">Delete</button>
                        </div>
                    </li>
                `);
                $('#employeeList').append(listItem);
            });
        });
    }

    // Load employee data into form for editing
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        $.get(`${apiUrl}/${id}`, function (employee) {
            $('#employeeId').val(employee.id);
            $('#name').val(employee.name);
            $('#address').val(employee.address);
            $('#designation').val(employee.designation);
        });
    });

    // Create or update employee
    $('#employeeForm').on('submit', function (e) {
        e.preventDefault();
        const id = $('#employeeId').val();
        const employeeData = {
            name: $('#name').val(),
            address: $('#address').val(),
            designation: $('#designation').val()
        };

        if (id) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(employeeData),
                success: fetchEmployees
            });
        } else {
            $.post(apiUrl, employeeData, fetchEmployees);
        }

        this.reset();
    });

    // Delete employee
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `${apiUrl}/${id}`,
            method: 'DELETE',
            success: fetchEmployees
        });
    });

    // Initial fetch of employee data
    fetchEmployees();
});

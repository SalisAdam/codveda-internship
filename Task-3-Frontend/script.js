const apiUrl = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", fetchUsers);

function fetchUsers() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById("userTableBody");
            tableBody.innerHTML = "";

            data.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(${user.id}, '${user.name}')">Edit</button>
                            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
}

function saveUser() {
    const id = document.getElementById("userId").value;
    const name = document.getElementById("username").value;

    if (!name) {
        showToast("Please enter a name", true);
        return;
    }

    if (id) {
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
        .then(() => {
            showToast("User updated successfully!");
            resetForm();
            fetchUsers();
        });
    } else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
        .then(() => {
            showToast("User added successfully!");
            resetForm();
            fetchUsers();
        });
    }
}

function editUser(id, name) {
    document.getElementById("userId").value = id;
    document.getElementById("username").value = name;
    document.getElementById("saveBtn").textContent = "Update User";
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => {
            showToast("User deleted successfully!");
            fetchUsers();
        });
    }
}

function resetForm() {
    document.getElementById("userId").value = "";
    document.getElementById("username").value = "";
    document.getElementById("saveBtn").textContent = "Add User";
}

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.background = isError ? "#dc3545" : "#28a745";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
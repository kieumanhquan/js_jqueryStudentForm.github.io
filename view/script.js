$(document).ready(function () {
    'use strict';
    let id = 0;
    let list = [];
    let isEdit = false;
    let index = -1;
    let isValidation = false;

    const url = "data.json";

    window.addEventListener('load', function () {
        const fetchJson = async () => {
            try {
                const data = await fetch(url);
                const response = await data.json();
                response.student.map((i) => {
                    list.push(i);
                    $("#table-data").append("<tr id='" + i.id + "'>" +
                        " <th scope=\"row\"><input class=\"form-check-input\" type=\"checkbox\" value ='" + i.id + "'></th scope=\"row\">" +
                        "<td class='no' style='display: none'>" + id + "</td>" +
                        "<td class='name'>" + i.name + "</td>" +
                        "<td class='birthday'>" + i.birthday + "</td>" +
                        "<td class='phone'>" + i.phone + "</td>" +
                        "<td class='hometown'>" + i.hometown + "</td>" +
                        "</tr>");
                    id++;
                })
                console.log(list)
            } catch (error) {
                console.log(error);
            }
        };
        fetchJson();
    }, false);

    $("#save-button").click(function () {
        const name = $("#name").val();
        const birthday = $("#birthday").val();
        const phoneNumber = $("#phone").val();
        const hometown = $("#hometown").val();
        validate(name, birthday, phoneNumber, hometown);

        if (isValidation) {
            isValidation = false;
            return 0;
        }

        if (isEdit) {
            update(name, birthday, phoneNumber, hometown);
            isEdit = false;
            return 0;
        }

        $("#table-data").append("<tr id='" + id + "'>" +
            " <th scope=\"row\"><input class=\"form-check-input\" type=\"checkbox\" value ='" + id + "'></th scope=\"row\">" +
            "<td class='no' style='display: none'>" + id + "</td>" +
            "<td class='name'>" + name + "</td>" +
            "<td class='birthday'>" + birthday + "</td>" +
            "<td class='phone'>" + phoneNumber + "</td>" +
            "<td class='hometown'>" + hometown + "</td>" +
            "</tr>");
        const obj = {id, name, birthday, phoneNumber, hometown};
        list.push(obj);
        clearForm();
        id++;
    })

    $("#save-reset").click(function () {
        clearForm();
    })

    $("#table-data").change(function () {
        let count = countChecked();
        if (count === 0) {
            $("#edit").prop('disabled', true);
            $("#delete").prop('disabled', true);
        } else {
            $("#edit").prop('disabled', false);
            $("#delete").prop('disabled', false);
        }
    });

    $("#edit").click(function () {
        let count = countChecked();
        if (count === 1) {
            index = indexRowIsChecked();
            let rowData = $('#table-data').find('tr#' + index);

            document.getElementById('name').value = rowData.children('.name').text();
            document.getElementById('birthday').value = rowData.children('.birthday').text();
            document.getElementById('phone').value = rowData.children('.phone').text();
            document.getElementById('hometown').value = rowData.children('.hometown').text();

            isEdit = true;
        } else {
            alert("B???n ch??? ???????c s???a th??ng tin c???a 1 sinh vi??n");
        }
    })

    $("#delete").click(function () {
        let text = "B???n c?? ch???c ch???n mu???n x??a sinh vi??n ??ang ch???n?";
        if (confirm(text) === true) {
            for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
                if (checkbox.checked === true) {
                    let index = checkbox.value;
                    let rowData = $('#table-data').find('tr#' + index);
                    rowData.remove();
                }
            }
        }
    })

    const indexRowIsChecked = () => {
        let index = -1;
        for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
            if (checkbox.checked === true) {
                index = checkbox.value;
                console.log(index);
                break;
            }
        }
        return index;
    }

    const update = (name, birthday, phone, hometown) => {
        list[index].name = name;
        list[index].birthday = index;
        list[index].phone = phone;
        list[index].hometown = hometown;

        let rowData = $('#table-data').find('tr#' + index);
        rowData.children('.name').text(name);
        rowData.children('.birthday').text(birthday);
        rowData.children('.phone').text(phone);
        rowData.children('.hometown').text(hometown);

        index = -1;
        clearForm();
    }


    const countChecked = () => {
        let count = 0;
        for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
            if (checkbox.checked === true) {
                count++;
            }
        }
        return count;
    }
    const clearForm = () => {
        document.getElementById("name").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("hometown").value = "";
    }

    const validate = (name, birthday, phone, hometown) => {
        let check = false;
        phone = String(phone);
        birthday = String(birthday)
        hometown = String(hometown)
        if (name === '' || name.length > 8) {
            if (name === '') {
                document.getElementById('name_error').innerHTML = "Xin m???i nh???p t??n";
            } else {
                document.getElementById('name_error').innerHTML = "T??n ph???i ??t h??n 8 k?? t???";
            }
            check = true;
        } else {
            document.getElementById('name_error').innerHTML = "";
        }
        if (birthday === '' || Date.parse(birthday) >= new Date()) {
            if (birthday === '') {
                document.getElementById('birthday_error').innerHTML = "Xin m???i nh???p ng??y sinh";
            } else {
                document.getElementById('birthday_error').innerHTML = "Ng??y sinh ph???i l???n h??n ng??y hi???n t???i";
            }
            check = true;
        } else {
            document.getElementById('birthday_error').innerHTML = "";
        }
        if (phone === '' || phone.length !== 10) {
            if (phone === '') {
                document.getElementById('phone_error').innerHTML = "Xin m???i nh???p s??? ??i???n tho???i";
            } else {
                document.getElementById('phone_error').innerHTML = "S??? ??i???n tho???i ph???i ????ng 10 s???";
            }
            check = true;
        } else {
            document.getElementById('phone_error').innerHTML = "";
        }
        if (hometown === '') {
            document.getElementById('hometown_error').innerHTML = "Xin m???i nh???p qu??";
            check = true;
        } else {
            document.getElementById('hometown_error').innerHTML = "";
        }
        isValidation = check;
    }

});
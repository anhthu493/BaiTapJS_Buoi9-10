var arrayNV = [];
function getValueNhanVien(event) {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var passWord = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value * 1;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value * 1;
  var nhanVien = new NhanVien();
  nhanVien.tknv = taiKhoan;
  nhanVien.name = hoTen;
  nhanVien.email = Email;
  nhanVien.password = passWord;
  nhanVien.datepicker = ngayLam;
  nhanVien.luongCB = luongCB;
  nhanVien.chucvu = chucVu;
  nhanVien.gioLam = gioLam;
  return nhanVien;
}
document.getElementById("btnThemNV").onclick = function () {
  var nhanVien = getValueNhanVien();
  if (nhanVien) {
    arrayNV.push(nhanVien);
    reset();
    saveDataLocal("arrayNV", arrayNV);
    hienThiDuLieu();
  }
};
function reset() {
  var InputAll = document.querySelectorAll("form input,form select");
  for (var i = 0; i < InputAll.length; i++) {
    InputAll[i].value = "";
  }
}
function saveDataLocal(key, value) {
  var stringify = JSON.stringify(value);
  localStorage.setItem(key, stringify);
}
function hienThiDuLieu(array) {
  if (array == undefined) {
    array = arrayNV;
  }
  var noiDung = "";
  for (var i = 0; i < array.length; i++) {
    var nhanVien = array[i];
    var newNhanVien = new NhanVien();
    nhanVien = Object.assign(newNhanVien, nhanVien);
    noiDung += `
      <tr>
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.datepicker}</td>
        <td>${nhanVien.chucvu}</td>
        <td>${nhanVien.LuongCB}</td>
        <td>
        <button onclick="deleteNV('${nhanVien.tknv}')" class="btn btn-danger">Xoá</button>
        <button data-target="#myModal" data-toggle="modal" onclick="getNV('${nhanVien.tknv}')"  class="btn btn-warning ml-3">Sửa</button>
      </td>
      </tr>
      `;
  }
  document.getElementById("tableDanhSach").innerHTML = noiDung;
}
function getDataLocalStorage(key) {
  var data = localStorage.getItem("arrayNV");
  if (data) {
    var parseJSON = JSON.parse(data);
    arrayNV = parseJSON;
    hienThiDuLieu();
  }
}

getDataLocalStorage();

function deleteNV(tknv) {
  var index = -1;
  for (var i = 0; i < arrayNV.length; i++) {
    if (arrayNV[i].tknv == tknv) {
      index = i;
    }
  }
  if (index != -1) {
    arrayNV.splice(index, 1);
    saveDataLocal("arrayNV", arrayNV);
    hienThiDuLieu();
  }
}

function getNV(tknv) {
  var index = {};
  for (var i = 0; i < arrayNV.length; i++) {
    var nhanVien = arrayNV[i];
    if (nhanVien.tknv == tknv) {
      index = nhanVien;
    }
  }
  var inputArr = document.querySelectorAll("form input, form select");
  for (var i = 0; i < inputArr.length; i++) {
    var DOM = inputArr[i];
    var id = DOM.id;
    DOM.value = index[id];
  }
  document.getElementById("tknv").readOnly = true;
}
function updateUser() {
  var nhanVien = getValueNhanVien();
  for (var i = 0; i < arrayNV.length; i++) {
    if (nhanVien.tknv == arrayNV[i].tknv) {
      arrayNV[i] = nhanVien;
    }
  }
  saveDataLocal("arrayNV", arrayNV);
  reset();
  hienThiDuLieu();
}
document.getElementById("btnCapNhat").onclick = updateUser;

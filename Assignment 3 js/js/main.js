var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
 
var siteList = [];

var alertSite = document.getElementById('alertSite');


if(localStorage.getItem("sites") != null) {
    siteList = JSON.parse(localStorage.getItem("sites"))
    displaySiteList()
}

function addsite() {
    if (validationSiteName()==true && validationSiteUrl()==true) {
        var site = {
            sitename: siteNameInput.value,
            siteurl: siteUrlInput.value,
        };
      
        siteList.push(site);
        console.log(siteList);
       
        clearInputs();
  
        localStorage.setItem('sites', JSON.stringify(siteList));
    }
    
    displaySiteList();
}

function clearInputs() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

function displaySiteList() {
    var siteBox = '';
    for (var i = 0; i < siteList.length; i++) {
        siteBox += `<tr>
            <td>${i}</td>
            <td>${siteList[i].sitename}</td>
            <td><a href="${siteList[i].siteurl}" target="_blank"><button class="btn btn-success">Visit</button></a></td>
            <td><button class="btn btn-danger" onclick='deleteSite(${i})'>Delete</button></td>
        </tr>`;
    }
    document.getElementById('tBody').innerHTML = siteBox;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    console.log(siteList);

    displaySiteList();
}

function validationSiteName() {
    var text = siteNameInput.value;
    var regexName = /^[A-Za-z ]{2,}$/;

    if (regexName.test(text)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false;
    }
}

function validationSiteUrl() {
    var url = siteUrlInput.value;
    var regexURL = /^([http:|https:|www.])/;

    if (regexURL.test(url)) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        alertSite.classList.add("d-none")
        return true;

    } else {
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        alertSite.classList.remove("d-none");
        return false;
       
    }
}
function closeAlert() {
    document.querySelector('.alert').style.display = 'none';
}

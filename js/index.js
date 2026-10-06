let fullNameInput = document.getElementById("fullName");
let phoneNumberInput = document.getElementById("phoneNumber");
let emailInput = document.getElementById("email");
let addressInput = document.getElementById("address");
let selectGroupInput = document.getElementById("selectGroup");
let notesInput = document.getElementById("notes");
let contactPhotoInput = document.getElementById("contactPhotoInput");
let favoriteCheck = document.getElementById("favoriteCheck");
let emergencyCheck = document.getElementById("emergencyCheck");
let searchInput = document.getElementById("searchInput");
 let saveContact = document.getElementById("saveContact")

let contactList = [];

if (localStorage.getItem("contactsContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactsContainer"));
  displayContact();
  displayFavorites(); 
  displayEmergency();
  updateStats(); 
}


function AddContact() {

  if (validate(fullNameInput , "msgName") && validate(phoneNumberInput , "msgPhoneNumber") && validate(emailInput , "msgEmail") && validate(selectGroupInput , "msgSelectGroup")) {
    let contact = {
    fullName: fullNameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
    select: selectGroupInput.value,
    notes: notesInput.value,
    image: contactPhotoInput.files[0]
      ? `images/${contactPhotoInput.files[0].name}`
      : "images/avatar-2.jpg",
    favorite: favoriteCheck.checked,
    emergency: emergencyCheck.checked,
  };
  contactList.push(contact);

  localStorage.setItem("contactsContainer", JSON.stringify(contactList));
  displayContact();
  clearContact();
  bootstrap.Modal.getInstance(
    document.getElementById("addContactModal")
  ).hide();
  }


}

function displayContact() {
  let cartona = "";

  for (let i = 0; i < contactList.length; i++) {
    cartona += `
        <div class="col-md-4 col-lg-6 mb-4">
                  <div class="inner bg-white p-4">
                    <div class="inner rounded-4">
                      <div class="img-container">
                        <img
                          style="height: 60px; width: 60px"
                          class="rounded-4 me-3"
                          src="${contactList[i].image}"
                          alt=""
                        />
                      </div>
                      <div class="d-flex flex-column">
                        <h3 class="fs-6 pt-1">${contactList[i].fullName}</h3>
                        <div class="d-flex">
                          <div
                            class="icon-p p-1 d-flex justify-content-center align-items-center rounded-2 me-2"
                          >
                            <i
                              class="fa-solid fa-phone"
                              style="color: rgb(21, 93, 252)"
                            ></i>
                          </div>
                          <span>${contactList[i].phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 d-flex align-items-center">
                      <span class="icon-p2 p-1 rounded-2 me-2"
                        ><i
                          class="fa-solid fa-envelope"
                          style="color: rgb(127, 34, 254)"
                        ></i
                      ></span>
                      <span>${contactList[i].email}</span>
                    </div>
                    <div class="mt-2 d-flex align-items-center">
                      <span class="icon-p3 p-1 rounded-2 me-2"
                        ><i
                          class="fa-solid fa-location-dot"
                          style="color: rgb(0, 153, 102)"
                        ></i
                      ></span>
                      <span>${contactList[i].address}</span>
                    </div>
                    <div class="icon-p4 py-1 px-2 mt-2 rounded-2">family</div>
                  </div>
                  <div
                    class="footer d-flex align-items-center justify-content-between pt-3 p-3"
                  >
                    <!-- رقم الواتساب  -->
                    <div>
                      <a
                        href="https://wa.me/${contactList[i].phoneNumber}"
                        class="icon-p5 rounded-2 p-2 me-2"
                      >
                        <i
                          class="fa-solid fa-phone"
                          style="color: rgb(0, 153, 102)"
                        ></i>
                      </a>
                      <!-- الايميل  -->
                      <a href="mailto:${contactList[i].email}" class="icon-p2 p-2 rounded-2">
                        <i
                          class="fa-solid fa-envelope"
                          style="color: rgb(127, 34, 254)"
                        ></i>
                      </a>
                    </div>

                    <!-- النجوم و التعديل و الحذف -->
                    <div>
                      <!-- النجوم -->
                      <span 
                      onclick="addFavorite(${i})"
                      class="icon-p6 me-3">
                        <i
                          class="fa-regular fa-star"
                          style="color: #9da5b2"
                        ></i>
                      </span>
                      <!-- القلب -->
                      <span 
                      
                      class="icon-p6 me-3">
                        <i
                        onclick="addEmergency(${i})"
                          class="fa-regular fa-heart"
                          style="color: #9da5b2"
                        ></i>
                      </span>
                      <!-- التعديل -->
                      <button 
                      onclick="setUpdate(${i})"
                      id="updateBtn" class="icon-p7 me-3 border-0 bg-transparent">
                        <i class="fa-solid fa-pen" style="color: #6a7282"></i>
                      </button>

                      <!-- الحذف -->
                      <button onclick="deleteCantact(${i})" class="icon-p7 me-3 border-0 bg-transparent">
                        <i class="fa-solid fa-trash" style="color: #6a7282"></i>
                      </button>
                    </div>
                  </div>
                </div>
    
    
    `;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function clearContact() {
  fullNameInput.value = "";
  phoneNumberInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  selectGroupInput.value = "";
  notesInput.value = "";
  contactPhotoInput.value = "";
  favoriteCheck.checked = false;
  emergencyCheck.checked = false;
}
function deleteCantact(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contactsContainer", JSON.stringify(contactList));
      displayContact();

      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
      });
    }
  });
}

let indexUpdate;
function setUpdate(index){
 indexUpdate = index;
      fullNameInput.value = contactList[index].fullName ,
     phoneNumberInput.value = contactList[index].phoneNumber ,
     emailInput.value = contactList[index].email,
     addressInput.value =contactList[index].address,
    selectGroupInput.value = contactList[index].select,
     notesInput.value = contactList[index].notes,
     favoriteCheck.checked =contactList[index].favorite,
    emergencyCheck.checked = contactList[index].emergency

let modalElement = document.getElementById("addContactModal");
 let modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  modal.show();

    saveContact.setAttribute("onclick","Update()")
}
function Update(){
  contactList[indexUpdate].fullName =  fullNameInput.value,
  contactList[indexUpdate].phoneNumber = phoneNumberInput.value,
   contactList[indexUpdate].email = emailInput.value ,
   contactList[indexUpdate].address = addressInput.value,
   contactList[indexUpdate].select = selectGroupInput.value,
   contactList[indexUpdate].notes = notesInput.value,
   contactList[indexUpdate].favorite = favoriteCheck.checked ,
   contactList[indexUpdate].emergency = emergencyCheck.checked

    localStorage.setItem("contactsContainer", JSON.stringify(contactList));
  displayContact();
  clearContact();

    saveContact.setAttribute("onclick","AddContact()")

     bootstrap.Modal.getInstance(
    document.getElementById("addContactModal")
  ).hide();
}

function searchContact() {
  let cartona = "";

  for (let i = 0; i < contactList.length; i++) {
    if(contactList[i].fullName.toLowerCase().includes(searchInput.value.toLowerCase())){

    cartona += `
        <div class="col-6">
                  <div class="inner bg-white p-4">
                    <div class="inner rounded-4">
                      <div class="img-container">
                        <img
                          style="height: 60px; width: 60px"
                          class="rounded-4 me-3"
                          src="${contactList[i].image}"
                          alt=""
                        />
                      </div>
                      <div class="d-flex flex-column">
                        <h3 class="fs-6 pt-1">${contactList[i].fullName}</h3>
                        <div class="d-flex">
                          <div
                            class="icon-p p-1 d-flex justify-content-center align-items-center rounded-2 me-2"
                          >
                            <i
                              class="fa-solid fa-phone"
                              style="color: rgb(21, 93, 252)"
                            ></i>
                          </div>
                          <span>${contactList[i].phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 d-flex align-items-center">
                      <span class="icon-p2 p-1 rounded-2 me-2"
                        ><i
                          class="fa-solid fa-envelope"
                          style="color: rgb(127, 34, 254)"
                        ></i
                      ></span>
                      <span>${contactList[i].email}</span>
                    </div>
                    <div class="mt-2 d-flex align-items-center">
                      <span class="icon-p3 p-1 rounded-2 me-2"
                        ><i
                          class="fa-solid fa-location-dot"
                          style="color: rgb(0, 153, 102)"
                        ></i
                      ></span>
                      <span>${contactList[i].address}</span>
                    </div>
                    <div class="icon-p4 py-1 px-2 mt-2 rounded-2">family</div>
                  </div>
                  <div
                    class="footer d-flex align-items-center justify-content-between pt-3"
                  >
                    <!-- رقم الواتساب  -->
                    <div>
                      <a
                        href="https://wa.me/${contactList[i].phoneNumber}"
                        class="icon-p5 rounded-2 p-2 me-2"
                      >
                        <i
                          class="fa-solid fa-phone"
                          style="color: rgb(0, 153, 102)"
                        ></i>
                      </a>
                      <!-- الايميل  -->
                      <a href="mailto:${contactList[i].email}" class="icon-p2 p-2 rounded-2">
                        <i
                          class="fa-solid fa-envelope"
                          style="color: rgb(127, 34, 254)"
                        ></i>
                      </a>
                    </div>

                    <!-- النجوم و التعديل و الحذف -->
                    <div>
                      <!-- النجوم -->
                      <span class="icon-p6 me-3">
                        <i
                          class="fa-regular fa-star"
                          style="color: #9da5b2"
                        ></i>
                      </span>
                      <!-- القلب -->
                      <span class="icon-p6 me-3">
                        <i
                          class="fa-regular fa-heart"
                          style="color: #9da5b2"
                        ></i>
                      </span>
                      <!-- التعديل -->
                      <button 
                      onclick="setUpdate(${i})"
                      id="updateBtn" class="icon-p7 me-3 border-0 bg-transparent">
                        <i class="fa-solid fa-pen" style="color: #6a7282"></i>
                      </button>

                      <!-- الحذف -->
                      <button onclick="deleteCantact(${i})" class="icon-p7 me-3 border-0 bg-transparent">
                        <i class="fa-solid fa-trash" style="color: #6a7282"></i>
                      </button>
                    </div>
                  </div>
                </div>
    
    
    `;
  }
}
  document.getElementById("demo").innerHTML = cartona;
}

// total , favorite , emergency
function updateStats() {
 let total = contactList.length;

 let favoriteCount = 0;
 let emergencyCount = 0;

 for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite) {
      favoriteCount++;  
    }
    if (contactList[i].emergency) {
      emergencyCount++;
    } 

  }

  document.getElementById("total").innerHTML = total;
  document.getElementById("favorite").innerHTML = favoriteCount;
  document.getElementById("emergency").innerHTML = emergencyCount;

}

function displayFavorites() {
    let favoritesBox = "";

    for (let i = 0; i < contactList.length; i++) {
        if (contactList[i].favorite) {
            // التحقق إذا كانت القيمة صورة أم حروف
           let initials = contactList[i].fullName 
                ? contactList[i].fullName.trim().substring(0, 2).toUpperCase() 
                : "CN";

            let avatarContent = contactList[i].image && contactList[i].image.trim() !== ""
                ? `<img src="${contactList[i].image}" class="w-100 h-100 rounded-3 object-fit-cover" alt="avatar">`
                : `<div class="w-100 h-100 bg-orange text-white fw-bold d-flex align-items-center justify-content-center rounded-3 fs-6">
                    ${initials}
                   </div>`;

            favoritesBox += `
            <div class="contact-card d-flex align-items-center justify-content-between p-2 rounded-4 bg-light mb-2">
                <div class="d-flex align-items-center gap-3">
                    <div class="avatar-box text-white fw-bold d-flex align-items-center justify-content-center rounded-3 fs-6 overflow-hidden" style=" height: 40px; width: 40px;">
                        ${avatarContent}
                    </div>
                    <div>
                        <div class="fw-bold text-dark lh-sm">${contactList[i].fullName}</div>
                        <small class="text-muted d-block">${contactList[i].phoneNumber}</small>
                    </div>
                </div>
                <a href="tel:${contactList[i].phoneNumber}" class="btn btn-call-fav rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>
            `;
        }
    }

    document.getElementById("favorites").innerHTML = favoritesBox || '<div class="text-muted text-center py-2 fs-7">No favorites yet</div>';
}

function displayEmergency() {
    let emergencyBox = "";

    for (let i = 0; i < contactList.length; i++) {
        if (contactList[i].emergency) {
            // التحقق إذا كانت القيمة صورة أم حروف
           let initials = contactList[i].fullName 
                ? contactList[i].fullName.trim().substring(0, 2).toUpperCase() 
                : "CN";

            let avatarContent = contactList[i].image && contactList[i].image.trim() !== ""
                ? `<img src="${contactList[i].image}" class="w-100 h-100 rounded-3 object-fit-cover" alt="avatar">`
                : `<div class="w-100 h-100 bg-orange text-white fw-bold d-flex align-items-center justify-content-center rounded-3 fs-6">
                    ${initials}
                   </div>`;

            emergencyBox += `
            <div class="contact-card d-flex align-items-center justify-content-between p-2 rounded-4 bg-light mb-2">
                <div class="d-flex align-items-center gap-3">
                    <div class="avatar-box text-white fw-bold d-flex align-items-center justify-content-center rounded-3 fs-6 overflow-hidden" style=" height: 40px; width: 40px;">
                        ${avatarContent}
                    </div>
                    <div>
                        <div class="fw-bold text-dark lh-sm">${contactList[i].fullName}</div>
                        <small class="text-muted d-block">${contactList[i].phoneNumber}</small>
                    </div>
                </div>
                <a href="tel:${contactList[i].phoneNumber}" class="btn btn-call-emerg rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>
            `;
        }
    }

    document.getElementById("emergencyContainer").innerHTML = emergencyBox || '<div class="text-muted text-center py-2 fs-7">No emergency contacts</div>';
}

function addFavorite(index) {

  contactList[index].favorite = !contactList[index].favorite;
  localStorage.setItem("contactsContainer", JSON.stringify(contactList));
  displayFavorites();
  displayContact();
  updateStats();

}
function addEmergency(index) {
  contactList[index].emergency = !contactList[index].emergency;
  localStorage.setItem("contactsContainer", JSON.stringify(contactList));
  displayEmergency();
  displayContact();
  updateStats();
}





function validate(element , msgId) {
  let text = element.value;
  let regex = {
    fullName: /^(?!\s)[a-zA-Z\u0600-\u06FF\s']{2,50}(?<!\s)$/,
    phoneNumber: /^01[0125][0-9]{8}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    selectGroup: /^(family|friends|work|other)$/i 
  }
  let msg = document.getElementById(msgId);

  if(regex[element.id].test(text)) {
     element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  }else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}
}


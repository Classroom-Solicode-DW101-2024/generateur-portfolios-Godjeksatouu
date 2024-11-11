class Project {
  constructor(title, githubLink, skills, date) {
    this.title = title;
    this.githubLink = githubLink;
    this.skills = skills;
    this.date = date;
  }
}

class Etudiant {
  constructor(fname, lname, email, phone, group) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone = phone;
    this.group = group;
    this.projects = [];
  }
}

function SubmitEtudiantForm() {
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const group = document.getElementById("group");
  const FnameError = document.getElementById("FnameError");
  const LnameError = document.getElementById("LnameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const groupError = document.getElementById("groupError");
  let isValid = true;

  if (fname.value.trim().length >= 5) {
    fname.classList.remove("invalid");
    fname.classList.add("valid");
    FnameError.textContent = "";
  } else {
    fname.classList.remove("valid");
    fname.classList.add("invalid");
    FnameError.textContent = "First name must be at least 5 characters.";
    isValid = false;
  }

  if (lname.value.trim().length >= 3) {
    lname.classList.remove("invalid");
    lname.classList.add("valid");
    LnameError.textContent = "";
  } else {
    lname.classList.remove("valid");
    lname.classList.add("invalid");
    LnameError.textContent = "Last name must be at least 3 characters.";
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@solicode\.com$/;
  if (emailPattern.test(email.value.trim())) {
    email.classList.remove("invalid");
    email.classList.add("valid");
    emailError.textContent = "";
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailError.textContent = "Email must end with @solicode.com.";
    isValid = false;
  }

  const phonePattern = /^\+212\d{9}$/;
  if (phonePattern.test(phone.value.trim())) {
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    phoneError.textContent = "";
  } else {
    phone.classList.remove("valid");
    phone.classList.add("invalid");
    phoneError.textContent =
      "Phone number must start with +212 and contain 9 digits.";
    isValid = false;
  }

  if (group.value !== "") {
    group.classList.remove("invalid");
    group.classList.add("valid");
    groupError.textContent = "";
  } else {
    group.classList.remove("valid");
    group.classList.add("invalid");
    groupError.textContent = "Please select a group.";
    isValid = false;
  }

  if (isValid) {
    const newStudent = new Etudiant(
      fname.value,
      lname.value,
      email.value,
      phone.value,
      group.value
    );
    localStorage.setItem("studentSaved", JSON.stringify(newStudent));
    window.location.href = "form_project.html";
  }
}
function addProject() {
  const title = document.getElementById("title");
  const githubLink = document.getElementById("github");
  const skills = Array.from(
    document.querySelectorAll("input[name='skills']:checked")
  ).map((checkbox) => checkbox.value);
  const date = document.getElementById("date");

  const titleError = document.getElementById("titleError");
  const githubError = document.getElementById("githubError");
  const dateError = document.getElementById("dateError");

  let isValid = true;

  if (title.value.trim().length >= 3) {
    title.classList.remove("invalid");
    title.classList.add("valid");
    titleError.textContent = "";
  } else {
    title.classList.remove("valid");
    title.classList.add("invalid");
    titleError.textContent = "Title must be at least 3 characters.";
    isValid = false;
  }

  const githubPattern =
    /^https:\/\/github\.com\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;
  if (githubPattern.test(githubLink.value.trim())) {
    githubLink.classList.remove("invalid");
    githubLink.classList.add("valid");
    githubError.textContent = "";
  } else {
    githubLink.classList.remove("valid");
    githubLink.classList.add("invalid");
    githubError.textContent =
      "Link must be a valid GitHub URL (https://github.com/username/repo).";
    isValid = false;
  }

  if (date.value) {
    date.classList.remove("invalid");
    date.classList.add("valid");
    dateError.textContent = "";
  } else {
    date.classList.remove("valid");
    date.classList.add("invalid");
    dateError.textContent = "Please select a date.";
    isValid = false;
  }

  if (isValid) {
    const project = new Project(
      title.value,
      githubLink.value,
      skills,
      date.value
    );

    let student = JSON.parse(localStorage.getItem("studentSaved"));
    if (student) {
      student.projects.push(project);
      localStorage.setItem("studentSaved", JSON.stringify(student));
    }

    document.querySelector("form").reset();
    displayProjectCard(project);
  }
}
function displayProjectCard(project) {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
        <h3>Project Title: ${project.title}</h3>
        <p><strong>GitHub Link:</strong> <a href="${
          project.githubLink
        }" target="_blank">${project.githubLink}</a></p>
        <p><strong>Skills:</strong> ${project.skills.join(", ")}</p>
        <p><strong>Date:</strong> ${project.date}</p>
    `;

  document.getElementById("newprojectform").appendChild(projectCard);
}

function finishPortfolio() {
  window.location.href = "finish.html";
}

function displayFinishPage() {
  const studentData = JSON.parse(localStorage.getItem("studentSaved"));
  if (!studentData) {
    alert("No student data found!");
    return;
  }

  const studentInfoDiv = document.createElement("div");
  studentInfoDiv.classList.add("student-info");
  studentInfoDiv.innerHTML = `
        <h2>Student: ${studentData.fname} ${studentData.lname}</h2>
        <p><strong>Email:</strong> ${studentData.email}</p>
        <p><strong>Phone:</strong> ${studentData.phone}</p>
        <p><strong>Group:</strong> ${studentData.group}</p>
    `;

  const projectPlace = document.getElementById("projectPlace");
  projectPlace.appendChild(studentInfoDiv);

  studentData.projects.forEach((project) => {
    const projectDetails = document.createElement("div");
    projectDetails.classList.add("project-details");
    projectDetails.innerHTML = `
            <h3>Project Title: ${project.title}</h3>
            <p><strong>Skills:</strong> ${project.skills.join(", ")}</p>
            <p><strong>Date:</strong> ${project.date}</p>
            <p><strong>GitHub Link:</strong> <a href="${
              project.githubLink
            }" target="_blank">${project.githubLink}</a></p>
  
        `;
    projectPlace.appendChild(projectDetails);
  });
}

if (document.title === "Student Portfolio") {
  window.onload = displayFinishPage;
}
function saveFormAsPDF() {
  const formElement = document.getElementById("myForm");

  const options = {
    margin: 1,
    filename: "form.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(formElement).save();
}

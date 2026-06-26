
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("full_name");
    const studentCode = document.getElementById("student_code");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    
    const birthYear = document.getElementById("birth_year");
    
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const formStatus = document.getElementById("formStatusMessage");

    const nameRegex = /^[\u0600-\u06FF\s]+$/; 
    const phoneRegex = /^09\d{9}$/; 
    const codeRegex = /^\d{8,10}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const digitsOnlyRegex = /^\d+$/; 

    let isValid = true;

    function showError(inputElement, errorElementId, message) {
      const errorSpan = document.getElementById(errorElementId);
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
      if (inputElement) inputElement.style.borderColor = "#ef4444"; 
      isValid = false;
    }

    function clearError(inputElement, errorElementId) {
      const errorSpan = document.getElementById(errorElementId);
      errorSpan.style.display = "none";
      if (inputElement) inputElement.style.borderColor = "#cbd5e1";
    }

    function persianToEnglishDigits(str) {
      const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
      for (let i = 0; i < 10; i++) {
        str = str.replace(persianDigits[i], i);
      }
      return str;
    }

    if (fullName.value.trim() === "") {
      showError(fullName, "nameError", "نام و نام خانوادگی اجباری است.");
    } else if (!nameRegex.test(fullName.value.trim())) {
      showError(fullName, "nameError", "نام فقط باید شامل حروف فارسی و فاصله باشد.");
    } else {
      clearError(fullName, "nameError");
    }

    if (studentCode.value.trim() === "") {
      showError(studentCode, "codeError", "شماره دانشجویی اجباری است.");
    } else if (!codeRegex.test(studentCode.value.trim())) {
      showError(studentCode, "codeError", "شماره دانشجویی نامعتبر است.");
    } else {
      clearError(studentCode, "codeError");
    }

    if (phone.value.trim() === "") {
      showError(phone, "phoneError", "شماره موبایل اجباری است.");
    } else if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, "phoneError", "شماره موبایل باید 11 رقم بوده و با 09 شروع شود.");
    } else {
      clearError(phone, "phoneError");
    }

    if (email.value.trim() === "") {
      showError(email, "emailError", "آدرس ایمیل اجباری است.");
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, "emailError", "فرمت ایمیل وارد شده معتبر نیست.");
    } else {
      clearError(email, "emailError");
    }

    const yearVal = persianToEnglishDigits(birthYear.value.trim());

    if (yearVal === "") {
      showError(birthYear, "dateError", "وارد کردن سال تولد الزامی است.");
    } else if (!digitsOnlyRegex.test(yearVal)) {
      showError(birthYear, "dateError", "سال تولد فقط باید شامل اعداد باشد.");
    } else {
      const y = parseInt(yearVal, 10);
      if (y < 1370 || y > 1388) {
        showError(birthYear, "dateError", "سال تولد باید در بازه معتبر (1365 تا 1388) باشد.");
      } else {
        clearError(birthYear, "dateError");
      }
    }

    if (password.value === "") {
      showError(password, "passError", "کلمه عبور اجباری است.");
    } else if (password.value.length < 6) {
      showError(password, "passError", "کلمه عبور باید حداقل 6 کاراکتر داشته باشد.");
    } else {
      clearError(password, "passError");
    }

    if (confirmPassword.value === "") {
      showError(confirmPassword, "confirmPassError", "تکرار کلمه عبور اجباری است.");
    } else if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "confirmPassError", "تکرار کلمه عبور با کلمه عبور اولیه مطابقت ندارد.");
    } else {
      clearError(confirmPassword, "confirmPassError");
    }

    if (isValid) {
      formStatus.textContent = "ثبت نام شما با موفقیت انجام شد.";
      formStatus.style.color = "#16a34a";

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("studentName", fullName.value.trim());
      localStorage.setItem("studentBirthYear", yearVal);

      setTimeout(() => {
        window.location.href = "index.html#logged-in";
      }, 1500);
    } else {
      formStatus.textContent = "لطفاً خطاهای فرم را برطرف کنید.";
      formStatus.style.color = "#ef4444";
    }
  });
});
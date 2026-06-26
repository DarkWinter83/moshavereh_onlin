document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleCommentBtn");

  const commentForm = document.getElementById("commentForm");
  const commentsDynamicList = document.getElementById("commentsDynamicList");

  const consultantKey = "comments_dr_alavi";
  const clearBtn = document.getElementById("clearCommentsBtn");

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (confirm("آیا از حذف تمام نظرات ثبت‌شده‌ی خود اطمینان دارید؟")) {
        localStorage.removeItem(consultantKey);

        loadComments();
      }
    });
  }
  const defaultComments = [
    {
      name: "دانشجو",
      rating: "5.0",
      text: "من برای کاهش استرس شدید قبل از کنکور ارشد به ایشون مراجعه کردم. راهکارهای رفتاری که پیشنهاد دادن عالی بود و واقعاً تونستم شرایط رو کنترل کنم. برخوردشون بسیار صمیمی و آرامش‌بخش هست.",
    },
    {
      name: "دانشجو",
      rating: "4.5",
      text: "بسیار دقیق به حرفام گوش دادن و اصلاً قضاوت نکردن. فضای اتاق مشاوره هم خیلی خوب و آروم بود. حتماً پیشنهاد می‌کنم اگر مشکلی دارید وقت بگیرید.",
    },
  ];

  loadComments();

  toggleBtn.addEventListener("click", function () {
    if (commentForm.classList.contains("show")) {
      commentForm.classList.remove("show");
      toggleBtn.textContent = "ثبت نظر جدید +";
    } else {
      commentForm.classList.add("show");
      toggleBtn.textContent = "بستن فرم ثبت نظر ×";
    }
  });

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("commenterName");
    const ratingInput = document.getElementById("commentRating");
    const textInput = document.getElementById("commentText");

    let isFormValid = true;

    function setFieldStatus(inputElement, errorId, message, hasError) {
      const errorSpan = document.getElementById(errorId);
      if (hasError) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
        inputElement.style.borderColor = "#ef4444";
        isFormValid = false;
      } else {
        errorSpan.style.display = "none";
        inputElement.style.borderColor = "#cbd5e1";
      }
    }

    setFieldStatus(
      nameInput,
      "commentNameError",
      "وارد کردن نام الزامی است.",
      nameInput.value.trim() === "",
    );

    const ratingVal = parseFloat(ratingInput.value);
    if (ratingInput.value.trim() === "") {
      setFieldStatus(
        ratingInput,
        "commentRatingError",
        "وارد کردن امتیاز الزامی است.",
        true,
      );
    } else if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      setFieldStatus(
        ratingInput,
        "commentRatingError",
        "امتیاز وارد شده باید عددی بین 1 تا 5 باشد.",
        true,
      );
    } else {
      setFieldStatus(ratingInput, "commentRatingError", "", false);
    }

    setFieldStatus(
      textInput,
      "commentTextError",
      "متن نظر نمی‌تواند خالی باشد.",
      textInput.value.trim() === "",
    );

    if (isFormValid) {
      const newComment = {
        name: nameInput.value.trim(),
        rating: ratingVal.toFixed(1),
        text: textInput.value.trim(),
      };

      let localComments = JSON.parse(localStorage.getItem(consultantKey)) || [];
      localComments.unshift(newComment);
      localStorage.setItem(consultantKey, JSON.stringify(localComments));

      commentForm.reset();
      commentForm.classList.remove("show");
      toggleBtn.textContent = "ثبت نظر جدید +";

      loadComments();
    }
  });

  function loadComments() {
    commentsDynamicList.innerHTML = "";

    let userComments = JSON.parse(localStorage.getItem(consultantKey)) || [];
    let allComments = [...userComments, ...defaultComments];

    allComments.forEach(function (comment) {
      const commentDiv = document.createElement("div");
      commentDiv.className = "single-comment";

      commentDiv.innerHTML = `
        <div class="comment-meta">
          <span class="commenter-name">${comment.name}</span>
          <span class="comment-rating"><span class="icon-star"></span> ${comment.rating}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
      `;
      commentsDynamicList.appendChild(commentDiv);
    });

    updateAverageRating(allComments);
  }

  function updateAverageRating(allComments) {
    const avgRatingText = document.getElementById("averageRatingText");
    const totalCommentsCount = document.getElementById("totalCommentsCount");

    if (!avgRatingText || !totalCommentsCount) return;

    if (allComments.length === 0) {
      avgRatingText.textContent = "0.0";
      totalCommentsCount.textContent = "(0 نظر)";
      return;
    }

    let sum = 0;
    allComments.forEach((comment) => {
      sum += parseFloat(comment.rating);
    });

    let average = (sum / allComments.length).toFixed(1);
    avgRatingText.textContent = average;
    totalCommentsCount.textContent = `(${allComments.length} نظر)`;
  }
});

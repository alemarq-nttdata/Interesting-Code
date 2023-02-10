// Submit with ENTER key
$(document).keydown(function (e) {
    if (e.keyCode == 13) {
        if ($(".kaizen__login #login").val() !== "" && $(".kaizen__login #password").val() !== "") {
            loginSubmit();
        }
    }
});
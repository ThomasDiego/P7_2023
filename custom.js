//foreach .filterMenu listen for click event and log data-id in javascript.
document.querySelectorAll('.filterMenu').forEach(function (el) {
    el.addEventListener('click', function (e) {
        //set display none to all .filterContent
        document.querySelectorAll('.filterContent').forEach(function (el) {
            el.style.display = 'none';
        });
        //set display block to all .filterMenu
        document.querySelectorAll('.filterMenu').forEach(function (el) {
            el.style.display = 'block';
        });
        //display none the filterMenu that is clicked
        e.target.style.display = 'none';
        //set display block to .filterContent with data-id = data-id of clicked .filterMenu
        document.querySelectorAll('.filterContent[data-id="' + e.target.dataset.id + '"]').forEach(function (el) {
            el.style.display = 'block';
        });

    });
    });
//if i click outside the .filterContent it will close the .filterContent if it is open, only if one .filterContent is open.
document.addEventListener('click', function (e) {
    //count number of .filterContent with display block value
    var count = 0;
    document.querySelectorAll('.filterContent').forEach(function (el) {
        if (el.style.display == 'block') {
            count++;
        }
    });
    //if the click is outside .filterContent and not on the .filterMenu and the number of .filterContent with display block is 1
    if (!e.target.closest('.filterContent') && !e.target.closest('.filterMenu') && count == 1) {
        //set display none to all .filterContent
        document.querySelectorAll('.filterContent').forEach(function (el) {
            el.style.display = 'none';
        });
        //set display block to all .filterMenu
        document.querySelectorAll('.filterMenu').forEach(function (el) {
            el.style.display = 'block';
        });
    }
});
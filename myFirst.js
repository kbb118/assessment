(function () {
    'use strict';
    var a_column = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'];
        a_column.forEach(a_element => {
        a_column.forEach(a_element2 => {
            document.write(a_element + a_element2 + '<br>');
        });
    });
})();
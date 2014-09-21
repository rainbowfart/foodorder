$(function(){

    function inputInfo() {
        if ($.cookie('name') == undefined) {
            var name = prompt("請輸入您的姓名");
            $.cookie('name', name, {expires: 365, path: '/'});
        }
        if ($.cookie('depart') == undefined) {
            var depart = prompt("請輸入您的部門");
            $.cookie('depart', depart, {expires: 365, path: '/'});
        }
        $('.shoppingScript>span').eq(0).text($.cookie('name')+ $.cookie('depart'));

        $.get('order/userorder/cart', function(data) {
            var json = JSON.parse(data);
              if (json.result) {
                //  購物車即時新增已訂購品項
                $('#cart').html(json.html);
            }
        });
    };

    inputInfo();

    $(document).on('click', '.toDelete', function() {
        $.removeCookie('name');
        $.removeCookie('depart');
        $('ul.center').empty();
        inputInfo();
    });

});

var order = {
    success: function (data) {
        var json = JSON.parse(data),
            oid = $('h3[aria-selected=true]').next('div').find('div:last-child').find('input[name=oid]').val(),
            preQuantity = $('select[name=preQuantity]').val(),
            newOrderList = '<tr class="selectItem" data-select="'+json.uniqueId+'" data-type="newOrder"><td>'+json.name+'</td><td>'+json.sugar+json.ice+json.size+'</td><td>'+preQuantity+'</td></tr>',
            $orderList = $('table#orderList[data-id="'+ oid +'"]');

        if (json.result) {
            alert('點餐成功!');
            //  購物車即時新增已訂購品項
            $('#cart').html(json.html);
            //  即時新增已訂購清單
            if ($orderList.has('tr[data-select="'+json.uniqueId+'"]').size() > 0) {
                $orderList.find('tr[data-select="'+json.uniqueId+'"]').find('td').css('color','red').eq(2).html(json.totalQuantity);
            } else if ($orderList.has('tr[data-select="'+json.uniqueId+'"]').size() == 0) {
                $orderList.append(newOrderList).find('tr:last-child').find('td').addClass('number_center').css('color','red').eq(2).html(json.totalQuantity);
            }
        } else {
            alert(json.error);
        }
    }
};
$('form[id^="newOrder"]').ajaxForm(order);


var preQuantity = 1;
(function(){
    //已訂購清單單擊增加數量1
    $(document).on('click', '.selectItem', function() {
        var clickOrder  = $(this).attr('data-select');
        $.ajax({
            type: "POST",
            url: "order/userorder/add",
            data: { uoid: clickOrder },
            success: function(data){
                var json = JSON.parse(data);
                if (json.result) {
                    //  購物車即時新增已訂購品項
                    $('#cart').html(json.html);
                    //  總數量修改
                    ++preQuantity;
                    $('.selectItem[data-select='+ clickOrder +'][data-type=newOrder]:last-child').find('td').eq(2).html(preQuantity);
                    $('.selectItem[data-select='+ clickOrder +']').find('td').css('color','red').eq(2).html(json.totalQuantity);
                }
            }
        });
    });

    // 使用者更改購物車的數量
    $(document).on("change",'li[data-user-id]', function() {
        var liLocate = $(this),
            userInputQuantity = liLocate.find('input');
        $.ajax({
            type: "POST",
            url: "order/userorder/edit",
            data: { uoid: liLocate.attr('data-user-id'), quantity: userInputQuantity.val() },
            success: function(data){
                var json = JSON.parse(data);
                if (json.result && json.hasOwnProperty('uoid')) {
                    // 傳送更改的數量
                    userInputQuantity.val(json.quantity);
                    //  總數量修改
                    $('.selectItem[data-select='+ json.uniqueId +']').find('td').css('color','red').eq(2).html(json.totalQuantity);
                } else if (json.result) {
                    if (userInputQuantity.val() == 0) {
                        liLocate.remove();
                        $('.selectItem[data-select='+ json.uniqueId +']').find('td').css('color','red').eq(2).html(json.totalQuantity);
                    }
                    if (json.totalQuantity == 0) {
                        $('.selectItem[data-select='+ json.uniqueId +']').remove();
                    }
                } else if (json.result == false && json.error == '此項目已結帳，請置收銀處修改') {
                    alert(json.error);
                } else {
                    alert(json.error);
                }
            }
        });
    });
})();

// show menu with lightbox
function showMenu() {
    $('span.showMenu').click(function() {
        var _sid = $(this).attr('data-storeId'),
            _sname = $(this).prev('a').html();
        $('div#menuBox').html('<img src="/store/menu/'+ _sid +'" alt="'+ _sname +'">');
    }).fancybox({
        maxWidth    : '100%',
        maxHeight   : '100%',
        openEffect  : 'elastic',
        closeEffect : 'elastic'
    });
};
showMenu();

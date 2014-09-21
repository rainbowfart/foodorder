function sumTable(selector) {
    var total = 0;
    selector.find('.forCall tbody tr').each(function(){
        var price = parseInt($(this).find('.price').text()),
            quantity = parseInt($(this).find('.number_center').text()),
            amount = price * quantity;
        $(this).find('.number_right').text(amount);
        total += amount;
    });
    selector.find('.forCall span[data-id="amount"]').text(total);
}
// 叫餐資訊修改價錢
$(document).on('change','._price', function(){
    var editPrice = $(this);
    $.ajax({
        type: "POST",
        url: "/manage/price/edit",
        data: { pid: editPrice.attr('data-id'), price: editPrice.val()},
        success: function(data){
            var json = JSON.parse(data);
            if (json.result) {
                // 單價區塊顯示修改過後的價錢
                var unitPrice = $('div[data-id='+editPrice.attr('store-id')+'] td[data-unitPrice-id='+editPrice.attr('data-id')+']');
                unitPrice.text(json.price);
                sumTable($('div[data-id='+editPrice.attr('store-id')+']'));
            }
        }
    });
});
// 收銀 已繳錢
$(document).on('click', '.payment', function(){
    var paid = $(this),
        uid = paid.siblings('td').eq(1).attr('data-id'),
        oid = paid.attr('data-id');
    $.ajax({
        type: "POST",
        url: "manage/userorder/pay",
        data: { uid: uid ,oid: oid},
        success: function(data){
            $('table[data-id='+oid+'] span[data-user-id='+uid+']')
                .removeClass('ui-icon-closethick')
                .addClass('ui-icon-check')
                .parent()
                .addClass('is-paid');
        }
    });
});
// 刪除訂單
$(document).on('click', 'span[data-delete="deleteItem"]', function(){
    var deleteItem = $(this),
        uoid = deleteItem.attr('data-user-id');
    $.ajax({
        type: "POST",
        url: "manage/userorder/del",
        data: { uoid: uoid },
        success: function(data){
            $('tr[data-user-id='+uoid+']').remove();
        }
    });
});

var $cashList = $('table.cash-list');

$cashList.each(function(){
    var $dataTables_info = $('.dataTables_info'),
        $dataTables_paginate = $('.dataTables_paginate');

    $('th:not(".cln")').click(function(){
        fadeOut();
        setTimeout(function(){
        $('td').removeAttr('rowspan').show();
            $cashList.mergeCell({
                cols: [0, 1, 6, 7]
            });
            fadeIn();
        }, 50);
    });

    $(document).on('change', '.dataTables_length select', function(){
        fadeOut();
        setTimeout(function(){
        $('td').removeAttr('rowspan').show();
            $cashList.mergeCell({
                cols: [0, 1, 6, 7]
            });
            fadeIn();
        }, 50);
    })

    function fadeOut()
    {
        $cashList.css('opacity','0.1');
        $dataTables_info.css('opacity','0.1');
        $dataTables_paginate.css('opacity','0.1');
    }

    function fadeIn()
    {
        $cashList.animate({'opacity':'1'}, 100);
        $dataTables_info.css({'opacity':'1'}, 100);
        $dataTables_paginate.css({'opacity':'1'}, 100);
    }
});// 關單功能
$(document).on('click','.btn-open', function(){
    var stateButton = $(this),
        oid = $(this).attr('data-id');
    $.ajax({
        type: "POST",
        url: "manage/order/edit",
        data: { oid: oid, state: 'close' },
        success: function(data){
            var json = JSON.parse(data);
            if (json.result == true ) {
                stateButton.text('開單狀態：收單').removeClass('btn-open btn-close').addClass('btn-close');
            }
        }
    });
});
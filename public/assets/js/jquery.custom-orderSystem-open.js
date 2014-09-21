// ajax for add store list
var option = {
    success: function(data) {
        var json = JSON.parse(data);
        if (json.result) {
            var template = ' <h3 data-id="'+json.id+'"><a href="#">'+json.name+'</a></h3> \
                <div data-id="'+json.id+'" class="basic-grey"> \
                <form id="editStoreInf_'+json.id+'" action=" /store/edit" method="POST" enctype="multipart/form-data"> \
                    <a class="showMenu" href="#menuBox"><img src="/store/menu/'+json.id+'" alt="'+json.name+'"></a> \
                    <input type="hidden" name="sid" value="'+json.id+'"> \
                    <label><span>店家名稱</span><input type="text" value="'+json.name+'"/></label> \
                    <label><span>外送電話</span><input type="text" value="'+json.tel+'"/></label> \
                    <label><span>菜單</span><input type="file"/></label> \
                    <label><span>備註</span><input type="text" value="'+json.memo+'"/></label> \
                    <div class="submitBox"> \
                    <input type="submit" name="editStore" value="修改資料" class="button"> \
                    <input type="reset"  value="重設" class="button"> \
                    <button type="button" data-id="'+json.id+'" name="delete">整筆刪除</button> \
                    </div> \
                </form> \
                </div>';
            $('#storeList').append(template);
            alert('新增成功!');
            var newOption = '<option value="'+json.id+'">'+json.name+'</option>';
            $('#store').append(newOption);
            $("#storeList").accordion('refresh');
            $(".accordian").accordion({active: 1});
            showMenu();
        } else {
            alert(json.error);
        }
    }
};
$('#newStore').ajaxForm(option);

// delete store list
$(document).on('click', 'input[name="delete"]', function() {
    var storeId = $(this).attr('data-id');
    $.ajax({
        type: "POST",
        url: "/store/del",
        data: { sid: storeId },
        success: function(data) {
            var json = JSON.parse(data);
            if (json.result) {
                $('div[data-id='+ storeId +'], h3[data-id='+ storeId +']').remove();
            }
            $('option[value= '+storeId+']').remove();
        }
    });
});

// edit store info
var edit = {
    success: function(data) {
        var json = JSON.parse(data);

        if (json.result) {
            alert('修改成功');
            $('h3[data-id='+ json.id +']').text(json.name);
            showPic();
        } else {
            alert(json.error);
        }
    }
};
$('form[id^="edit"]').ajaxForm(edit);

// show menu
function showPic() {
    var $storeList = $('form[id^=editStoreInf]');
    $storeList.each(function() {
        var _value = $(this).find('input[name=sid]').attr('value'),
            _sname = $(this).find('input[name=name]').val();
        $(this).find('a.showMenu').html('<img src="/store/menu/'+ _value +'" alt="'+ _sname +'">');
    });
}
showPic();

// show menu with lightbox
function showMenu() {
    $('a.showMenu').click(function() {
        var _sid = $(this).next('input[name=sid]').val(),
            _sname = $(this).next().next().find('input[name=name]').val();
        $('div#menuBox').html('<img src="/store/menu/'+ _sid +'" alt="'+ _sname +'">');
    }).fancybox({
        maxWidth    : '100%',
        maxHeight   : '100%',
        openEffect  : 'elastic',
        closeEffect : 'elastic'
    });
};
showMenu();

// 收單時間使用選擇器
$('input[name=deadLine]').keydown(false).datetimepicker({
    dateFormat: 'yy-mm-dd',
    timeFormat: 'HH:mm'

});

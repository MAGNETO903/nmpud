var user_type;

var winW = 0;
var winH = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // код для мобильных устройств
    user_type = 'mobile';
  } else {
  	user_type = 'pc';
    // код для обычных устройств
}


var noPX = function(string) {
    return string.slice(0, string.length-2);
}

var num = function(variable) {
    return Number(variable);
}

var set_size = function(el_id, w='none', h='none') {
	if (w != 'none') {
		$(el_id).css('width', w);
	}
	if (h != 'none') {
		$(el_id).css('height', h);
	}
	
}

var set_pos = function(el_id, left, top) {
	$(el_id).css('left', left);
	$(el_id).css('top', top)
}

var set_rel_pos = function(el_id, left='none', top='none') {
	if (left != 'none') {
		$(el_id).css('margin-left', left);
	}
	if (top != 'none') {
		$(el_id).css('margin-top', top)
	}
}

var get_pos = function(id) {
	var el = $(id);

	return {"x": num(noPX(el.css('left'))), "y": num(noPX(el.css('top')))}
}

var get_size = function(id) {
	var el = $(id);

	return {"x": num(noPX(el.css('width'))), "y": num(noPX(el.css('height')))}
}

var resizeScreen = function() {
	winW = $(window).width();
    winH = $(window).height();

    var main_block_size = winH*0.8

    // верхний левый блок
    set_size('#top_left_block', (winW-main_block_size)/2, winH*0.15)


   	// верхний правый блок
   	set_size('#top_right_block', (winW-main_block_size)/2, winH*0.15)
   	set_pos('#top_right_block', winW - get_size('#top_right_block').x, 0);


    // левый блок информации
    set_size('#left_info_block', (winW-main_block_size)/2, winH*0.65)
    set_pos('#left_info_block', 0, winH*0.15)


    // главный блок
    set_size('#main_block', main_block_size, main_block_size)
    set_pos('#main_block', get_size('#left_info_block').x, 0)

    //$('#plotter').attr('width', get_size('#main_block_content').x)
    //$('#plotter').attr('height', get_size('#main_block_content').x)

    console.log(get_size('#main_block_content').y)


    // правый блок информации
    set_size('#right_info_block',  (winW-main_block_size)/2, winH*0.65)
    set_pos('#right_info_block', winW - get_size('#right_info_block').x, winH*0.15)


    // левый блок формулы
    set_size('#left_formula_block', winW/2, winH*0.2);
    set_pos('#left_formula_block', 0, winH*0.8);

    // левый блок ввода формулы
    set_size('#left_formula_input_block', winW*0.6, winH*0.8)
    set_pos('#left_formula_input_block', winW*0.2, winH*0.1)


    // левый редактор формулы
    set_size('#left_formula_editor', get_size('#left_formula_input_block').x*0.9, get_size('#left_formula_input_block').y*0.3);
    set_rel_pos('#left_formula_editor', get_size('#left_formula_input_block').x*0.05, get_size('#left_formula_input_block').x*0.05);

    // размер шрифта левого редактора формулы
    $('#left_formula_editor').css('font-size', get_size('#left_formula_editor').y/4)
    set_rel_pos('#inner_left_formula_editor', get_size('#left_formula_editor').x/2 - get_size('#inner_left_formula_editor').x/2, get_size('#left_formula_editor').y/2 - get_size('#inner_left_formula_editor').y/2)

    // настройки левой формулы
    set_size('#left_formula_options',  get_size('#left_formula_input_block').x*0.9,  get_size('#left_formula_input_block').x*0.4)
    set_rel_pos('#left_formula_options', get_size('#left_formula_input_block').x*0.05, get_size('#left_formula_input_block').x*0.05);

    $('#left_formula_options input').css('font-size', get_size('#left_formula_editor').y/4)
    set_size('#left_formula_options input', get_size('#left_formula_input_block').x*0.9/2-2)
    set_size('#left_formula_launch_btn', get_size('#left_formula_input_block').x*0.9)
    set_rel_pos('#left_formula_launch_btn', 'none',  get_size('#left_formula_input_block').x*0.05)

    

    set_rel_pos('#left_formula_label_2', get_pos('#left_formula_input_2').x)
    $('#left_formula_options button').css('font-size', get_size('#left_formula_editor').y/4)


     // правый блок формулы
    set_size('#right_formula_block', winW/2, winH*0.2);
    set_pos('#right_formula_block', winW*0.5, winH*0.8);

    // правый блок ввода формулы
    set_size('#right_formula_input_block', winW*0.6, winH*0.8)
    set_pos('#right_formula_input_block', winW*0.2, winH*0.1)



    // левый редактор формулы
    set_size('#right_formula_editor', get_size('#right_formula_input_block').x*0.9, get_size('#right_formula_input_block').y*0.3);
    set_rel_pos('#right_formula_editor', get_size('#right_formula_input_block').x*0.05, get_size('#right_formula_input_block').x*0.05);

    // размер шрифта левого редактора формулы
    $('#right_formula_editor').css('font-size', get_size('#right_formula_editor').y/4)
    set_rel_pos('#inner_right_formula_editor', get_size('#right_formula_editor').x/2 - get_size('#inner_right_formula_editor').x/2, get_size('#right_formula_editor').y/2 - get_size('#inner_right_formula_editor').y/2)

    // настройки левой формулы
    set_size('#right_formula_options',  get_size('#right_formula_input_block').x*0.9,  get_size('#right_formula_input_block').x*0.4)
    set_rel_pos('#right_formula_options', get_size('#right_formula_input_block').x*0.05, get_size('#right_formula_input_block').x*0.05);

    $('#right_formula_options input').css('font-size', get_size('#right_formula_editor').y/4)
    set_size('#right_formula_options input', get_size('#right_formula_input_block').x*0.9/2-2)
    set_size('#right_formula_launch_btn', get_size('#right_formula_input_block').x*0.9)
    set_rel_pos('#right_formula_launch_btn', 'none',  get_size('#right_formula_input_block').x*0.05)

    

    set_rel_pos('#right_formula_label_2', get_pos('#right_formula_input_2').x)
    $('#right_formula_options button').css('font-size', get_size('#right_formula_editor').y/4)
    margin = Math.min(winW*0.01, winH*0.01)
    $( ".content" ).each(function() {
  	var parent_id = $( this ).parent().get( 0 ).id;
  	//var margin = Math.min(get_size('#'+parent_id).x*0.05, get_size('#'+parent_id).y*0.05)
  	console.log(margin, get_size('#'+parent_id))
  	set_size(this, get_size('#'+parent_id).x-2*margin-4, get_size('#'+parent_id).y-2*margin-4)
  	set_rel_pos(this, margin, margin)

    set_size('#users_list_border', winW*0.75, winH)
    set_pos('#users_list_border', winW*0.125, 0)


    //set_size('#main_block_content2', get_size('#main_block').x*0.96, get_size('#main_block').x*0.96)
    //set_rel_pos('#main_block_content2', 0, 0)

    set_pos('bank', 0, 0);
    set_size('#bank', winW, winH);

    set_size('#auth_page', winW, winH)

});
}

window.addEventListener('resize', resizeScreen, false);

resizeScreen();


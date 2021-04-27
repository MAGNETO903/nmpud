var bank = [{
	"d_f": "3\\sin\\left(2u\\right)\\cos\\left(u\\right)^4",
	"m_f": "\\arccos\\left(\\sqrt[6]{a}\\right)",
	"min_x": 0.000,
	"max_x": 1.571,
	"time": "-",
},
{
	"d_f": "3\\sin\\left(2u\\right)\\sin\\left(u\\right)^4",
	"m_f": "\\arcsin\\left(\\sqrt[6]{a}\\right)",
	"min_x": 0.000,
	"max_x": 1.571,
	"time": "-",
},{
	// \frac{e^{\sqrt[5]{a}}}{5}
	"d_f": "\\frac{5\\ln\\left(5u\\right)^4}{u}",
	"m_f": "\\frac{e^{\\sqrt[5]{a}}}{5}",
	"min_x": 0.200,
	"max_x": 0.543,
	"time": "-",
}, {
	"d_f": "7u^6",
	"m_f": '\\sqrt[7]{a}',
	"min_x": 0,
	"max_x": 1,
	"time": "-"
}, {
	"d_f": "u^6+\\frac{24}{7}u^3",
	"m_f": 'm\\left(\\sqrt[7]{7a};\\frac{1}{7};\\sqrt[4]{\\frac{1}{6}\\left(7a-1\\right)}\\right)',
	"min_x": 0,
	"max_x": 1,
	"time": "-"
}, {
	"d_f": "u^7+\\frac{7}{2}u^3",
	"m_f": "\\sqrt[4]{\\frac{\\sqrt{32a+49}-7}{2}}",
	"min_x": 0,
	"max_x": 1,
	"time": "-"
}, {
	"d_f": "u^7+\\frac{7}{2}u^3",
	"m_f": "m\\left(\\sqrt[8]{8a};\\frac{1}{8};\\sqrt[4]{\\frac{1}{7}\\left(8a-1\\right)}\\right)",
	"min_x": 0,
	"max_x": 1,
	"time": "-"
}, {
	"d_f": "\\frac{3}{8}\\left(1+u^2\\right)",
	"m_f": "\\frac{\\left(\\sqrt{16a^2-16a+5}+4a-2\\right)^{\\frac{2}{3}}-1}{\\sqrt[3]{\\sqrt{16a^2-16a+5}+4a-2}}",
	"min_x": -1,
	"max_x": 1,
	"time": "-"
}, {
	"d_f": "\\frac{3}{8}\\left(1+u^2\\right)",
	"m_f": "m\\left(\\frac{8}{3}a-1;\\frac{3}{4};\\sqrt[3]{8a-7}\\right)",
	"min_x": -1,
	"max_x": 1,
	"time": "-"
}]

var step = function() {
	window.requestAnimationFrame(step)
	if (main_block.modeling == true && main_block.modeled_values < main_block.values_num) {
		//console.log('gg')

		main_block.step(main_block.speed)
		main_block.speed *= 1.05
	} else if (main_block.modeling == true) {
		console.log(main_block.hist_cols)
		main_block.modeling = false
		main_block.hist_cols = []
		iter = 0
		main_block.values_num = 0;
		main_block.speed = 10
		$('#status_2').text('завершено')
		//$('#stat')
		$('#total_time_2').text((performance.now() - main_block.mod_time).toFixed(2) + 'ms')
	}

	if (main_block.plotting == true && main_block.last_graph_x <= main_block.max_x) {
		main_block.g_step();
	} else if (main_block.plotting == true) {
		main_block.plotting = false;
		main_block.points = []
		main_block.x = []
		main_block.y1 = []
		main_block.graph_points = 0;
		$('#total_time_1').text((performance.now()-main_block.graph_start_time).toFixed(2)+'ms')
		$('#status_1').text('завершено')
	}
}


step();

// инизиализация измерителя 
for (var i=0; i < 5; i++) {
	calculator.measure_time(function(x) {return x})
}



/*

$(document).ready(function(){
    $("#plotter").on("mousemove", function(evt) {
        var element = $("#cursor"), 
				offsetLeft = element.offset().left,
				domElement = element.get(0),
				clientX = parseInt(evt.clientX - offsetLeft),
				ctx = element.get(0).getContext('2d');
		 
        ctx.clearRect(0, 0, domElement.width, domElement.height),
            ctx.beginPath(),
            ctx.moveTo(clientX, 0),
            ctx.lineTo(clientX, domElement.height),
            ctx.setLineDash([10, 10]),
            ctx.strokeStyle = "#333",
            ctx.stroke()
    });
});

*/


var shifted_power = function(node, options) {
	if (node.op != false) {
		if (node.op == '^') {
			//console.log("trigerred!")
			if (node.args[0].type == 'FunctionNode') {
				var arg_1 = node.args[0].fn.name;
				return node.args[0].toTex(options).replace(new RegExp(arg_1), arg_1+"^{"+node.args[1].toTex(options)+"}")
				//console.log(arg_1, node.args[0].value)
			}
		}
	}
}


for (var i in bank) {
	var rules = ["v*c -> c*v"];

	//var f = nerdamer(fast_densities[i].formula).buildFunction();
	var cur_val = 0;

	var d_f = bank[i].d_f;
	var m_f = bank[i].m_f;
	var time = bank[i].time;

	var expr_latex = bank[i].m_f;
	var func;

	
	console.log(expr_latex)
	if (expr_latex.includes('m\\') == true) {
		console.log('мод. метод суперпозиции')
		var first = (expr_latex.split(';\\')[0]).split('m\\left(')[1]
			var border = expr_latex.split(';\\')[1]
			var second = (expr_latex.split(';\\')[2]).slice(0, (expr_latex.split(';')[2]).length-7)

			first = first.replace(/\\right/g, "")
			second = second.replace(/\\right/g, "")
			first = first.replace(/\\left/g, "")
			second = second.replace(/\\left/g, "")
			first = first.replace(/\\/g, "")
			second = second.replace(/\\/g, "")

			console.log(first)
			console.log(border)
			console.log(second)

			var ex1 = nerdamer.convertFromLaTeX(first).toString()
			var bor = Number(nerdamer.convertFromLaTeX(border).evaluate())
			var ex2 = nerdamer.convertFromLaTeX(second).toString()

			console.log(ex1)
			console.log(bor)
			console.log(ex2)

			ex1 = ex1.replace(/\\/g, "")
			//ex1 = ex1.replace(/right/g, "")
			//ex1 = ex1.replace(/left/g, "")
			//bor = bor.replace(/\\/g, "")
			ex2 = ex2.replace(/\\/g, "")
			//ex2 = ex2.replace(/right/g, "")
			//ex2 = ex2.replace(/left/g, "")
			console.log(ex1)
			console.log(bor)
			console.log(ex2)

			var f1 = calculator.get_function(ex1, ['a'])
			var f2 = calculator.get_function(ex2, ['a'])

			console.log(f1)
			console.log(f2)

			console.log(calculator.measure_time(f1))
			console.log(calculator.measure_time(f2))

			var mmsp_func = function(x) {
				if (x < bor) {
					return f1(x)
				} else {
					return f2(x)
				}
			}	

			func = mmsp_func;
	} else {
		var expr = nerdamer.convertFromLaTeX(bank[i].m_f).toString();

		func = calculator.get_function(expr, ['a']);
	}

	


    

	//console.log(func)

	var time = calculator.measure_time(func).toFixed(2)

	var a = bank[i].min_x;
	var b = bank[i].max_x;

	var f1 = d_f;
	var f2 = m_f;

	//var f1 = nerdamer(d_f).toTeX();
	//var f2 = nerdamer(m_f).toTeX();
	
	//var f1=math.parse(process_formula(math.simplify(math.parse(d_f), rules).toString())).toTex({implicit: 'hide', handler:shifted_power});
	//var f2=math.parse(process_formula(math.simplify(math.parse(m_f), rules).toString())).toTex({implicit: 'hide', handler: shifted_power});

	$('#bank table').append('<tr><td>\\['+f1+'\\]</td><td>\\['+f2+'\\]</td><td>'+a+'</td><td>'+b+'</td><td id="time_' +i +'" >'+time+'ns</td><td><img onclick="test2('+i+')" class="test_icon" id="'+i+'" src="test_icon.png" ></td></tr>');
	//renderMathInElement(document.body, {})
}

var test2 = function(ind) {
	//$('.mathquill-editable').mathquill('latex', '');
	left_formula_input_block.editor.latex(bank[ind].d_f);
	document.getElementById('left_formula_input_1').value = bank[ind].min_x;
	document.getElementById('left_formula_input_2').value = bank[ind].max_x;

	right_formula_input_block.editor.latex(bank[ind].m_f);

	$('#bank').css('display', 'none');

	left_formula_input_block.start();
	right_formula_input_block.start()
}

socket.on('users', function(data) {
	available_users = data;
	console.log(data)
	for (var i=0; i < available_users.length; i++) {
		$('#users_list_table').append('<tr><td onclick="register(this.id)" id="'+available_users[i]+'" >'+available_users[i]+'</td></tr>')
	}
})
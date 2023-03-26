var p2_26 = Math.pow(2, 26);
var p2_14 = Math.pow(2, 14);

var arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length


var right_shift_26_v2 = function(num) {
	return Math.trunc(num / p2_26)
}

var right_shift_14_v2 = function(num) {
	return Math.trunc(num / p2_14)
}

var left_shift_26 = function(num) {
	return num * p2_26;
}

var left_shift_14 = function(num) {
	return num * p2_14;
}

var original_math_pow = Math.pow

function nthRoot(x, n) {
	if (x < 0 && n > 0) {
		if (n % 2 == 0) {
    		return original_math_pow(x, n)
    	} else {
    		return - original_math_pow(Math.abs(x), n)
    	}

	}    
    return original_math_pow(x, n)
}


Math.pow = nthRoot
var arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
//console.log(shift_26(2105632645931929))

//console.log(45887173 >> 26)
//console.log(right_shift(45887173, 26))

var p2_26 = Math.pow(2, 26);
var p2_14 = Math.pow(2, 14);

var right_shift_26_v2 = function(num) {
	return Math.trunc(num / p2_26)
}

var right_shift_14_v2 = function(num) {
	return Math.trunc(num / p2_14)
}

var left_shift_26 = function(num) {
	return num * p2_26;
}

var left_shift_14 = function(num) {
	return num * p2_14;
}
u = [3, 0];
m = [45887173, 11368];
x = [Math.pow(2.0, -40.0), Math.pow(2.0, -14.0)];
var rnd40_64 = function() {

	var c0 = m[0]*u[0]
	var c1 = m[0]*u[1] + m[1]*u[0]

	u[0] = c0 - left_shift_26(right_shift_26_v2(c0))
	var n = c1 + right_shift_26_v2(c0)
	u[1] = n - left_shift_14(right_shift_14_v2(n))

	return u[0]*x[0] + u[1]*x[1];
}

/*for (var i=0; i < 10; i++) {
	console.log(rnd40_64());
}*/

var MQ = MathQuill.getInterface(2);

// Darken a color
      function darkenColor(colorStr) {
        // Defined in dygraph-utils.js
        var color = Dygraph.toRGB_(colorStr);
        color.r = Math.floor((color.r));
        color.g = Math.floor((color.g));
        color.b = Math.floor((color.b));
        return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0.3)';
      }

function barChartPlotter(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    ctx.fillStyle = darkenColor(e.color);

    // Find the minimum separation between x-values.
    // This determines the bar width.
    var min_sep = Infinity;
    //console.log('p',points)
    var points2 = []

    for (var i=0; i < points.length; i++) {
    	
    	if (isNaN(points[i].y) == false) {
    		points2.push(points[i])
    	}
    }
    //console.log('p2',points2)
    for (var i = 1; i < points2.length; i++) {
      var sep = points2[i].canvasx - points2[i - 1].canvasx;
      if (sep < min_sep) min_sep = sep;
    }
    var bar_width = Math.floor(min_sep);

    // Do the actual plotting.
    for (var i = 0; i < points2.length; i++) {
      var p = points2[i];
      var center_x = p.canvasx;

      ctx.fillRect(center_x - bar_width / 2, p.canvasy,
          bar_width, y_bottom - p.canvasy);

      ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
          bar_width, y_bottom - p.canvasy);
    }
  }

var calculator = {
	validate_latex_expr: function(latex_expr) {
		console.log(latex_expr)
		var valid = true
		var expr = nerdamer.convertFromLaTeX(latex_expr)
		try {
			nerdamer(expr)
		} catch (Error) {
			console.log(Error)
			valid = false
		}

		return valid;
	},
	validate_expr: function(expr) {
		var valid = true
		try {
			nerdamer(expr)
		} catch (Error) {
			console.log(Error)
			valid = false
		}

		return valid;
	},
	get_function: function(expr, args=['x']) {
		if (this.validate_expr(expr)) {
			return nerdamer(expr).buildFunction(args)
		}
	},
	measure_time: function(func) {
		var times = []

		for (var i=0; i < 40; i++) {
			var s_time = performance.now()
			var s;
			for (var j=0; j < 10000; j++) {
				func(rnd40_64())

			}
			var dur = performance.now() - s_time;
			times.push(dur)
		}

		//console.log(times)

		var min_time = 100000
		for (var i=0; i < 40; i++) {
			if (times[i] < min_time && min_time != 0) {
				min_time = times[i]
			}
		}

		

		var filtered_times = []

		for (var i=0; i < 40; i++) {
			if (times[i] < min_time*3) {
				filtered_times.push(times[i])
			}
		}

		//console.log(filtered_times)
		return arrAvg(filtered_times)/2000*1000*1000
	}
}

MQ.config({
	autoCommands: 'pi theta sqrt sum nthroot',
})


var main_block = {
	block_id: 'main_block_content',
	/*
	plotter: new Dygraph(
        document.getElementById('main_block'),
        [[0, 0, 0]],
        {
          labels: ['Date', 'B', 'A'],
          includeZero: true,
          series: {
          	"B": {
              plotter: barChartPlotter,
              stepPlot: true,
              strokeWidth: 2,
              color: 'orange',
              connectSeparatedPoints: true,
            },
            "A": {
              strokeWidth: 5,
              color: 'white',
              connectSeparatedPoints: true
            },
            
          }
       	}),
	*/
	plotter: echarts.init(document.getElementById('main_block_content')),
	graph_func: 'none',
	hist_func: 'none',
	modeling: false,
	hist_cols: [],
	min_y: 100,
	max_y: -100,
	min_x: 0,
	max_x: Math.sqrt(2),
	modeled_values: 0,
	speed: 10,
	cols_num: 0,
	graph_start_time: 0,
	values_num: 0,
	mod_time: 0,
	last_graph_x: 0,
	graph_step: 0,
	graph_points: 0,
	points: [],
	plotting: false,
	last_point_ind: 0,
	x: [],
	y1: [],
	y2: [],
	step: function(steps) {

		if (steps > main_block.values_num - main_block.modeled_values) {
			steps =  main_block.values_num - main_block.modeled_values;
		}

		var cols_num = main_block.cols_num;
		var norm_cols = [];


		for (var i=0; i < steps; i++) {
			var y = main_block.hist_func(Math.random())

			var right_val = (y - main_block.min_x)/(main_block.max_x-main_block.min_x)
			var need_col = Math.floor(right_val*cols_num)
			if (need_col < cols_num) {
				main_block.hist_cols[need_col]++;
			}
		}

		var max_col = -10000;

		for (var i=0; i < cols_num; i++) {
			if (main_block.hist_cols[i] > max_col) {
				max_col = main_block.hist_cols[i]
			}
		}
		for (var i=0; i < cols_num; i++) {
			norm_cols.push(main_block.hist_cols[i] / (max_col/main_block.max_y))
		}
		
		main_block.plotter.setOption({
                
                series: [{
                    name: 'hist',

                    data: norm_cols,

                }
                ]
            })

		main_block.modeled_values += steps;
		$('#speed_2').text((main_block.speed*60).toFixed(0) + '\n знач/сек')
		$('#n_values_2').text(main_block.modeled_values.toFixed(0))
		$('#status_2').text('моделирование')
		$('#progress_2').text((main_block.modeled_values/main_block.values_num * 100).toFixed(1) + '%')
		$('#total_time_2').text((performance.now() - main_block.mod_time).toFixed(2) + 'ms')
	},
	g_step: function() {
		var limit = main_block.last_point_ind+50
		var new_y = []
		for (var i=0; i < 50; i++) {
			var x = main_block.min_x + main_block.graph_step*main_block.last_point_ind
			//console.log('x: ', i)
			var y = main_block.graph_func(x)

			if (main_block.min_y > y) {
				main_block.min_y = y
			}
			if (main_block.max_y < y) {
				main_block.max_y = y
			}
			//main_block.x.push(parseFloat(i.toFixed(4)));
			main_block.y1.push(parseFloat(y.toFixed(4)));
			new_y.push(parseFloat(y.toFixed(4)))
			main_block.last_point_ind++;
			main_block.last_graph_x = x;
			
		}

		main_block.plotter.setOption({
				
				xAxis: {
					id: 1,
					name: "graph",
					data: main_block.x,
				},
				yAxis: {
					min: main_block.min_y,
					max: main_block.max_y*1.2
				},
                series: [{
                    name: 'graph',
                    type: "line",
                    data: main_block.y1
                }]
            })

		main_block.graph_points += 50
		$('#status_1').text('построение')
		$('#progress_1').text(Math.min(main_block.graph_points/1000*100, 100).toFixed(1)+'%')
		$('#speed_1').text('600 знач/сек')
		$('#n_values_1').text(main_block.graph_points)
		$('#total_time_1').text((performance.now()-main_block.graph_start_time).toFixed(2)+'ms')
	}
	
}

// отображение информации о формулах
var left_info_block = {
	block_id: "left_info_block",

}

var right_info_block = {
	block_id: "right_info_block",

}


// рендер формул в KaTeX'е
var left_formula_block = {
	block_id: "left_formula_block",

}

var right_formula_block = {
	block_id: "right_formula_block"
}

// блоки ввода формул
var left_formula_input_block = {

	block_id: "left_formula_input_block",
	block_visible: false,
	fact_block_visible: false,
	mouse_over: false,
	open: function() {
		hide('right_formula_input_block')
		show(this.block_id)
		this.block_visible = true
		left_formula_input_block.editor.focus();
		set_rel_pos('#inner_left_formula_editor', get_size('#left_formula_editor').x/2 - get_size('#inner_left_formula_editor').x/2, get_size('#left_formula_editor').y/2 - get_size('#inner_left_formula_editor').y/2)
		left_formula_input_block.editor.latex(left_formula_input_block.editor.latex())

	},
	editor: MQ.MathField(document.getElementById('inner_left_formula_editor'), {
    	handlers: {
      		edit: function() {
      			set_rel_pos('#inner_left_formula_editor', get_size('#left_formula_editor').x/2 - get_size('#inner_left_formula_editor').x/2, get_size('#left_formula_editor').y/2 - get_size('#inner_left_formula_editor').y/2)
        		//console.log(left_formula_input_block.editor.latex())
        		$('#inner_left_formula_editor > span.mq-root-block > span.mq-cursor').css('color', 'white');
      			$('#inner_left_formula_editor > span.mq-root-block > span.mq-cursor').css('border-color', 'white');

      		}
    	}
	}),
	start: function() {
		hide(this.block_id);
		//var expr = nerdamer.convertFromLaTeX(left_formula_input_block.editor.latex()).toString()
			console.log(left_formula_input_block.editor.latex())
			console.log(nerdamer.convertFromLaTeX(left_formula_input_block.editor.latex()))
			console.log(expr)

		var latex_expr = left_formula_input_block.editor.latex()
		latex_expr = latex_expr.replace(/\\\s+/g, ' ');


		if (calculator.validate_latex_expr(latex_expr) == true) {
			var expr = nerdamer.convertFromLaTeX(latex_expr).toString()
			//console.log(left_formula_input_block.editor.latex())
			console.log(expr)
			main_block.graph_func = calculator.get_function(expr, ['u'])
			var tex_expr =latex_expr
			var time = calculator.measure_time(main_block.graph_func)
			//var time =  calculator.measure_time(expr, ['u'])
			$('#calc_time_1').text(time.toFixed(2)+'ns')


			
			
			var a = Number(document.getElementById('left_formula_input_1').value);
			if (isNaN(a) == true || a == '') {
				a = 0
			}
			var b = Number(document.getElementById('left_formula_input_2').value);

			if (isNaN(b) == true || b == '') {
				b = 1
			}
			main_block.min_x = a;
			main_block.max_x = b;
			console.log(a, b)

			socket.emit('generated_graph', {
				"name": my_name,
				"expr": expr,
				"tex_expr": tex_expr,
				"options": {
					"min_u": a,
					"max_u": b
				}
			})

			$('#left_formula_block_content').text('\\['+tex_expr+', \\atop '+a.toFixed(2)+' < u < '+b.toFixed(2)+'\\]')
			renderMathInElement(document.body, {})
			var n = 1000
			main_block.max_y = -100
			main_block.min_y = 0
			var step = (b-a)/n
			main_block.graph_step = step;
			main_block.graph_start_time = performance.now();
			main_block.plotting = true;
			var data_x = [];
			var data_y = [];

			for (var x=a; x <= b; x+=step) {
				main_block.x.push(parseFloat(x.toFixed(4)))
				//main_block.y1.push(0);
			}

			for (var i=0; i < 10; i++) {
				var x = main_block.min_x+i*step;
				var y = main_block.graph_func(x)

				if (main_block.min_y > y) {
					main_block.min_y = y
				}
				if (main_block.max_y < y) {
					main_block.max_y = y
				}
				//main_block.x.push(parseFloat(x.toFixed(4)));
				main_block.y1.push( parseFloat(y.toFixed(4)));
				//data_x.push(parseFloat(x.toFixed(4)))
				//data_y.push(parseFloat(y.toFixed(4)))
			}

			main_block.last_graph_x = a+step*10;

			main_block.last_point_ind = 9;
			console.log(main_block.min_x);
			console.log(main_block.max_x);
			console.log(main_block.y1);
			console.log(main_block.x);

			main_block.plotter.setOption({
				xAxis: [{
					id: 1,
					name: "graph",
				
					data: main_block.x,
					//min: main_block.min_x,
					//max: main_block.max_x,
				}],
				yAxis: {
					min: main_block.min_y,
					max: main_block.max_y*1.2
				},
                series: [{
                    name: 'graph',
                    data: main_block.y1
                }]
            })
			//main_block.plotter.updateOptions({"file":data})
		}
		return false;
	}
}

var right_formula_input_block = {
	block_id: "right_formula_input_block",
	block_visible: false,
	fact_block_visible: false,
	mouse_over: false,
	open: function() {
		hide('left_formula_input_block')
		show(this.block_id)
		this.block_visible = true
		set_rel_pos('#inner_right_formula_editor', get_size('#right_formula_editor').x/2 - get_size('#inner_right_formula_editor').x/2, get_size('#right_formula_editor').y/2 - get_size('#inner_right_formula_editor').y/2)
		right_formula_input_block.editor.latex(right_formula_input_block.editor.latex())

	},
	editor: MQ.MathField(document.getElementById('inner_right_formula_editor'), {
    	handlers: {
      		edit: function() {
      			set_rel_pos('#inner_right_formula_editor', get_size('#right_formula_editor').x/2 - get_size('#inner_right_formula_editor').x/2, get_size('#right_formula_editor').y/2 - get_size('#inner_right_formula_editor').y/2)
        		//console.log(left_formula_input_block.editor.latex())
        		$('#inner_right_formula_editor > span.mq-root-block > span.mq-cursor').css('color', 'white');
      			$('#inner_right_formula_editor > span.mq-root-block > span.mq-cursor').css('border-color', 'white');

      		}
    	}
	}),
	start: function() {
		hide(this.block_id)
		// latex m\left(\sqrt{\left(2a\right)};\frac{1}{2};2a\right)

		console.log('latex', right_formula_input_block.editor.latex())
		var expr_latex = String(right_formula_input_block.editor.latex())
		expr_latex = expr_latex.replace(/\\\s+/g, ' ');
		console.log(expr_latex.includes('latex m'))
		if (expr_latex.includes('m\\') == true) {
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

			main_block.hist_func = mmsp_func;

			
		} else {
			var expr_latex = String(right_formula_input_block.editor.latex())
			expr_latex = expr_latex.replace(/\\\s+/g, ' ');

			if (calculator.validate_latex_expr(expr_latex) == true) {
				console.log('latex', expr_latex)

				var expr = nerdamer.convertFromLaTeX(expr_latex).toString()
				
				console.log('expr->', expr);
				
				main_block.hist_func = calculator.get_function(expr, ['a'])

				
			}
		}

		

		main_block.modeling = true;

		var time = calculator.measure_time(main_block.hist_func)

		$('#calc_time_2').text(time.toFixed(2)+'ns')

		main_block.mod_tile = performance.now()
		//console.log(main_block.hist_func)

		var cols_num = Number(document.getElementById('right_formula_input_1').value);
		if (isNaN(cols_num) == true || cols_num == '') {
			cols_num = 40
		}
		var values_num = Number(document.getElementById('right_formula_input_2').value);

		if (isNaN(values_num) == true || values_num == '') {
			values_num = 1000000
		}
		//var cols_num = 40;
		//var values_num = 1000000;

		main_block.cols_num = cols_num;
		main_block.values_num = values_num;

		socket.emit('generated_hist', {
				"name": my_name,
				"expr": expr,
				"tex_expr": expr_latex,
				"options": {
					"cols_num": cols_num,
					"values_num": values_num
				}
			})

		var cols = [];
		var norm_cols = []
		var step = ( main_block.max_x - main_block.min_x ) / (cols_num-1);
		console.log(step)
		//console.log(cols, cols_num);
		for (var i=0; i < cols_num; i++) {
			
			cols.push(0)
		}
		var tex_expr = right_formula_input_block.editor.latex()
		$('#right_formula_block_content').text('\\['+tex_expr+'\\]')
		renderMathInElement(document.body, {strict: false})
		

		var bad_nums = 0
		for (var i=0; i < 10; i++) {
			var y = main_block.hist_func(Math.random())
			var need_col = Math.floor((y-main_block.min_x)/(main_block.max_x-main_block.min_x)*cols_num)
			if (need_col < cols_num) {
				cols[need_col]++;
			} else {
				bad_nums++;
			}
		}
		main_block.modeled_values = 10;
		//console.log(bad_nums)
		//console.log(cols)
		var max_col = 0
		var min_col = 100
		for (var i=0; i < cols_num; i++) {
			//console.log(cols[i])
			if (cols[i] > max_col) {
				max_col = cols[i]
			}

		}
		

		for (var i=0; i < cols_num; i++) {
			norm_cols.push(cols[i] / (max_col/main_block.max_y))
		}
		console.log(main_block.max_y)
		console.log(cols)
		var raw_data = []

		var new_x1 = []
		var new_y1 = []
		var new_y2 = []
		var last_col = -1;

		new_x1 = []
		
		for (var i=0; i < cols_num; i++) {
			new_x1.push(parseFloat((step*i).toFixed(3)))
			norm_cols[i] = parseFloat((norm_cols[i]).toFixed(3))
		}
		main_block.hist_cols = cols
		//new_x1.push(last_col*step)
		//console.log(raw_data)
		console.log("x1", new_x1)
		console.log(new_y2)
		main_block.plotter.setOption({
			
			xAxis: [{
				name: "hist",
                data: new_x1,
               
            }],
            
            series: [{
                name: 'hist',

                data: norm_cols,

            }
            ]
        })
				//main_block.plotter.updateOptions({"file": raw_data})
		return false;
	}
}




// базовые/абстрактные функции, которые не имеет смысла в внедрять как методы в объектам
var hide = function(id) {
	$('#'+id).css('display', 'none');
}

var show = function(id) {
	$('#'+id).css('display', 'block');
}
// specify chart configuration item and data
var option = {
    title: {
        text: ''
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    darkMode: false,
    //backgroundColor: "#100C2A",
    tooltip: {
    	trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            },
            animated: false,
            /*
            lineStyle: {
            		color: 'rgb(255, 140, 0)',
				    shadowColor: 'rgba(255, 140, 0, 0.5)',
				    shadowBlur: 10
				
            }
            */
        }
    },
    legend: {
        data:['comp']
    },
    xAxis: [{
    	//type: 'value',
    	id: 0,
    	type:"category",
    	name: "hist",
        data: [],
                animation: false,

    }, {
    	id: 1,
    	name: "graph",
    	//type:"value",
    	data: [],
    	animation: false,
    }] ,
    yAxis: {
    	
        type: 'value',
               animation: false,

    },
    series: [{
        name: 'hist',
        //type: 'bar',
        type: "bar",
        //step: 'middle',
        data: [],
        //connectNulls: true,
        xAxisIndex: 0,
        color: 'orange',
        isAnimationActive: false,
        animation: false,
        itemStyle: {
    		shadowColor: 'rgba(255, 140, 0, 0.5)',
    		shadowBlur: 10
    	}

    }, {
    	name: "graph",
    	type: 'line',
    	data: [],
    	showSymbol: false,
    	xAxisIndex: 1,
    	color: 'white',
    	isAnimationActive: false,
    	animation: false,
    	lineStyle: {
    		shadowColor: 'rgba(255, 255, 255, 0.5)',
    		shadowBlur: 10,
    		width: 5
    	}
    }]
};

// use configuration item and data specified to show chart
main_block.plotter.setOption(option);

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

var process_formula = function(formula) {
	formula = formula.replace(/root/g, "nthRoot")

	for (var i=1; i < formula.length-1; i++) {
		if (formula[i] == '*') {
			if (isNaN(formula[i+1]) || formula[i+1] == ' ') {
				formula = formula.slice(0, i) + formula.slice(i+1, formula.length);
			}
		}
	}

	formula = formula.replace(/acos/g, "arccos");
	formula = formula.replace(/asin/g, "arcsin");
	formula = formula.replace(/atan/g, "arctan");
	formula = formula.replace(/asec/g, "arcsec");
	formula = formula.replace(/acsc/g, "arcscs");
	formula = formula.replace(/acot/g, "arccot");

	formula = formula.replace(/acosh/g, "arccosh");
	formula = formula.replace(/asinh/g, "arcsinh");
	formula = formula.replace(/atanh/g, "arctanh");
	formula = formula.replace(/asech/g, "arcsech");
	formula = formula.replace(/acsch/g, "arcscsh");
	formula = formula.replace(/acoth/g, "arccoth");

	return String(formula);
}

var get_tex = function(expr, simplify = false) {
	var rules = ["v*c -> c*v", "sqrt(c) -> sqrt(c)"];

	//console.log(math.simplify(math.simplify(math.parse(expr), rules).toString()).toString())

	var simplified = math.parse(expr).toString();
	
	if (simplify) {
		simplified = math.simplify(math.parse(expr), rules).toString()
		simplified = math.simplify(simplified).toString();
	}

	//simplified = simplified.replace(/{pi/g, "{\\pi");
	//simplified = simplified.replace(/{e/g, "{\\e");

	return math.parse(math.format(math.parse(process_formula(simplified)), {precision: 3})).toTex({implicit: 'hide', handler:shifted_power}).replace(/{pi/g, "{\\pi").replace(/{e/g, "{\\e");
}

$('#left_formula_input_block').mouseout(function() {
	left_formula_input_block.mouse_over = false
})

$('#left_formula_input_block').mouseover(function() {
	left_formula_input_block.mouse_over = true
})

$('body').click(function() {
	if (left_formula_input_block.mouse_over == false) {
		if (left_formula_input_block.block_visible == true && left_formula_input_block.fact_block_visible == false) {
			left_formula_input_block.fact_block_visible = true
		} else {
			left_formula_input_block.fact_block_visible = false
			left_formula_input_block.block_visible = false
			$('#left_formula_input_block').css('display', 'none')
		}
		
		//
	}
})

$('#right_formula_input_block').mouseout(function() {
	right_formula_input_block.mouse_over = false
})

$('#right_formula_input_block').mouseover(function() {
	right_formula_input_block.mouse_over = true
})

$('body').click(function() {
	if (right_formula_input_block.mouse_over == false) {
		if (right_formula_input_block.block_visible == true && right_formula_input_block.fact_block_visible == false) {
			right_formula_input_block.fact_block_visible = true
		} else {
			right_formula_input_block.fact_block_visible = false
			right_formula_input_block.block_visible = false
			$('#right_formula_input_block').css('display', 'none')
		}
		
		//
	}

	if (real_opened_menu) {
		$('.sidenav').css('width', 0)
		opened_menu = false
		real_opened_menu = false
	}

	if (opened_menu) {
		
		real_opened_menu = true;
	}

})

var open_bank = function() {
	$('#bank').css('display', 'block');
	open_menu();
}


var setup_math_parser = function() {
		
	//Math.pow = nthroot;
	//nerdamer.setFunction('root', ['b', 'a'], '(b/abs(b))*(abs(b)^(1/a))');
	//nerdamer.setFunction('cbrt', ['a'], '(a/abs(a))*(abs(a)^(1/3))')
	nerdamer.setFunction('ln', ['a'], 'log(a)');
	//nerdamer.setFunction('logx', ['a', 'b'], 'log10(a)/log10(b)');
	//nerdamer.setFunction("log2", ["a"], "log10(a)/log10(2)")

    
	var core = nerdamer.getCore();
	var _ = core.PARSER;
	
	/*
	core.Math2.root = function(a, b) {
	    if (b % 2 == 0) {
    		return Math.pow(Math.abs(a), 1/Math.abs(b));
    	} else {
    		return (a/Math.abs(a))*Math.pow(Math.abs(a), 1/b)
    	}
	};
	*/

	/*

	core.Math2.h = function(a) {
		if (a >= 0) {
        	return 1;
        } else {
        	return 0;
        }
	}
	*/

	/*

	core.Math2.cbrt = function(a) {
		return (a/Math.abs(a))*(Math.pow(Math.abs(a), 1/3))
	}

	*/

	core.Math2.ln = function(a) {
		return Math.log(a);
	}

	/*
	core.Math2.m = function(expr_1, border, expr_2) {
		//expr_1 = String(expr_1).replace('x', 'y')
		//expr_2 = String(expr_2).replace('x', 'y')
		//var f1 = nerdamer(expr_1).buildFunction(['y'])
		//var f2 = nerdamer(expr_2).buildFunction(['y'])

		console.log(f1, f2)

		//var x = Math.random()
		var super_func = function(x) {
			if (x < border) {
				return f1(x);
			} else {
				return f2(x);
			}
		}

		return [f1, border, f2]
	}
	*/

	//_.functions.root = [,2];
	//_.functions.h = [, 1];
	//_.functions.cbrt = [, 1];
	_.functions.ln = [, 1];
	//_.functions.m = [, 3];
}

var opened_menu = false;
var real_opened_menu = false;

var open_menu = function() {
	if (opened_menu) {
		$('.sidenav').css('width', '0px');
		opened_menu = false
	} else {
		$('.sidenav').css('width', '200px');
		opened_menu = true
	}
}

var open_system = function() {
	open_menu();
}

var open_auth = function() {
	$('#auth_page').css('display', 'block')
}

var close_auth = function() {
	$('#auth_page').css('display', 'none')
}

var register = function(name) {
	socket.emit('register', name)
	close_auth();
	//close_users_list();
	/*
	if (my_name == '') {
		$('#register_btn').attr('value', 'сменить аккаунт')
	}
	my_name = name;
	*/
	my_name = name;
	$('#menu').attr('class', 'green_text');
	$('#menu').text(name)
	$('#menu').css('font-size', get_size('#menu').x/20)
}

setup_math_parser();

var socket = io();
var my_name = '';

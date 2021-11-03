function select(options) {
        function arrow(callback) {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.addEventListener('click', function (e) {
                e.preventDefault();
                callback();
                return false;
            });
            var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon_arrow');
            svg.appendChild(use);
            return svg;
        }

        function input(name, placeholder) {
            var input = document.createElement('input');
            input.type = 'text';
            input.name = name;
            input.placeholder = placeholder;
            return input;
        }

        function item(data, callback) {
            var item = document.createElement('item');
            item.addEventListener('click', function (e) {
                e.preventDefault();
                callback(data['value']);
                return false;
            });
            item.classList.add('select-item-list');
            item.innerText = data['title'];
            return item;
        }

        function list(array, callback) {
            var list = document.createElement('div');
            list.classList.add('select-list');
            for (var i = 0; i < array.length; i++) {
                list.appendChild(item(array[i], callback));
            }
            return list;
        }


        try {
            if(typeof options !== 'object') {
                throw new Error('Error options');
            }
            const el = options['el'];
            const array = options['array'];
            const name = options['name'];
            const placeholder = options['placeholder']?options['placeholder']:'sdds';

            const el_input = input(name, placeholder);

            const el_list = list(array, function (value) {
                el_input.value = value;
            });

            el.classList.add('select');

            el.appendChild(el_input);

            el.appendChild(arrow(function () {
                if(el_list.classList.contains('active')) {
                    el_list.classList.remove('active');
                } else {
                    el_list.classList.add('active');
                }
            }));

            el.appendChild(el_list);
        } catch (e) {
            console.log(e)
        }
    }

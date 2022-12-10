window.onload = function() {
  let keys         = document.getElementsByTagName('button'),
      operators    = ['/', '*', '-', '+', '%'],
      lastOperator = '',
      decimalAdded = false;
  for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = function() {
          let keyValue    = this.innerHTML,
              detail      = document.getElementById('detail'),
              detailValue = detail.innerHTML,
              lastChar    = detailValue[detailValue.length - 1],
              result      = document.getElementById('result-value');
          switch (keyValue) {
              case 'AC':
                  result.innerHTML = '0';
                  detail.innerHTML = '';
                  break;
              case '=':
                  if (detail.innerHTML != '') {
                      result.innerHTML = eval(detailValue);
                      decimalAdded = false;
                  }
                  break;
              case '/':
              case '*':
              case '-':
              case '+':
              case '%':
                  if (detailValue != '' && operators.indexOf(lastChar) == -1) {
                      detail.innerHTML += keyValue;
                  } else {
                      detail.innerHTML = detail.innerHTML.replace(/.$/, keyValue);
                  }
                  decimalAdded = false;
                  lastOperator = keyValue;
                  break;
              case 'del':
                  if (lastChar == '.') {
                      decimalAdded = false;   
                  }
                  detail.innerHTML = detail.innerHTML.replace(/.$/, '');
                  break;
              case '.':
                  if ( ! decimalAdded) {
                      detail.innerHTML += keyValue;
                      decimalAdded = true;
                  }
                  break;
              case '+/-':
                  if (detailValue != '' && operators.indexOf(lastChar) == -1) {
                      if (lastOperator == '') {
                          if (detailValue == Math.abs(detailValue)) {
                              detail.innerHTML = -(detailValue);
                          } else {
                              detail.innerHTML = Math.abs(eval(detailValue));
                          }
                      } else {
                          let array     = detail.innerHTML.split(lastOperator),
                              lastIndex = array.length - 1,
                              newDetail = '',
                              oldDetail = '';

                          if (array[lastIndex] == Math.abs(array[lastIndex])) {
                              newDetail = '(' + -(array[lastIndex]) + ')';
                          } else {
                              newDetail = Math.abs(eval(array[lastIndex]));
                          }

                          for (let i = 0; i < lastIndex; i++) {
                              oldDetail += array[i] + lastOperator;
                          }

                          detail.innerHTML = oldDetail + newDetail;
                      }
                  }
                  break;
              default:
                  detail.innerHTML += keyValue;
                  break;
          }
      }
  }
}
